/**
 * 
 */
import { Md5 } from "./TsMd5";

export module LoadHelper {
    export interface LoadTextureParam {
        sp?: cc.Sprite;
        cb?: (a: string, b: cc.Texture2D, resUrl?: string) => void
        target?: Object;
    }

    var waitingLoadMap: Map<string, LoadTextureParam[]> = new Map<string, LoadTextureParam[]>();
    var hasLoadTextureUrl: Array<string> = new Array<string>(); //此保存的Url仅仅用来释放

    export function clearLoadHelper() {
        waitingLoadMap.clear();
    }

    //添加到回调列表
    function addToWaitingLoadMap(url: string, v: LoadTextureParam) {
        if (!waitingLoadMap.has(url)) {
            waitingLoadMap.set(url, [])
        }

        waitingLoadMap.get(url).push(v);
    }

    //是否已经有此url在等待加载
    function isInWaitingLoadMap(url: string) {
        return waitingLoadMap.has(url);
    }

    //加载完成的回调
    function callAndRemoveFromeWaitingLoadMap(url: string, err: any, tex: cc.Texture2D) {
        if (waitingLoadMap.has(url)) {
            let varr = waitingLoadMap.get(url);
            // console.log("callAndRemoveFromeWaitingLoadMap call url :", url, " length :", varr.length);
            for (let i = 0; i < varr.length; i++) {
                //检查错误
                if (err) {
                    console.log('callAndRemoveFromeWaitingLoadMap failed: ', "[" + err + "]");
                    if (varr[i].cb && varr[i].target) {
                        varr[i].cb.call(varr[i].target, err, null, url);
                    }
                    continue;
                }

                //检查格式
                if (!(tex instanceof cc.Texture2D)) {
                    if (varr[i].cb && varr[i].target) {
                        varr[i].cb.call(varr[i].target, err, null, url);

                    }
                    continue;
                }

                //有sprite对象则替换spriteFrame
                if (varr[i].sp && tex) {
                    if (!cc.isValid(varr[i].sp.node)) {
                        console.log("callAndRemoveFromeWaitingLoadMap success,but node is not Valid  " + url);
                        // return;
                        continue;
                    }
                    // varr[i].sp.spriteFrame = new cc.SpriteFrame(tex, new cc.Rect(0, 0, tex.pixelWidth, tex.pixelHeight));
                    varr[i].sp.spriteFrame = new cc.SpriteFrame(tex);
                }

                //有回调则回调
                if (varr[i].cb && varr[i].target) {
                    try {
                        varr[i].cb.call(varr[i].target, null, tex, url);
                    } catch (error) {
                        console.log("callAndRemoveFromeWaitingLoadMap call error", error);
                    }
                }


            }

            waitingLoadMap.delete(url);
        }
        else {
            console.log("loadFromUrl::result error, url has no call back", url);
        }
    }

    //包内加载
    function loadFromInnner(url: string) {
        let rurl = cc.url.raw(url);

        cc.loader.load({ url: rurl, type: 'png' }, function (err, tex) {
            if (err || !(tex instanceof cc.Texture2D)) {
                console.log('loadFromUrl::app::load::err', err);
            }
            else {
                // console.log('loadFromUrl::app::load::sucess', url);
            }
            callAndRemoveFromeWaitingLoadMap(url, err, tex)
            hasLoadTextureUrl.push(rurl);
        });
    }

    //获取本地保存时候的文件名字
    function getLocalFileName(tempUrl: string) {
        // let reg=/[a-z,A-Z,0-9]/g;//匹配任意字母
        // let fileName =tempUrl.match(reg);
        // console.log("url to local file, url =",tempUrl,", local file name =",fileName);
        let fileName = Md5.hashStr(tempUrl);
        fileName += ".png";
        console.log("url to local file, url =", tempUrl, ", local file name =", fileName);
        return fileName;
    }

    //native的远程加载，（同时保存到本地）
    function loadFromRemoteNative(url: string) {
        console.log("loadFromUrl::native");
        cc.gameName = cc.gameName || "wanba";
        let dirpath = jsb.fileUtils.getWritablePath() + cc.gameName + '/res/raw-assets/resources/download/';
        let filepath = dirpath + getLocalFileName(url);

        console.log("loadFromUrl::native::filepath", filepath);

        function loadEnd() {
            cc.loader.load({ url: filepath, type: 'png' }, function (err, tex) {
                if (err && filepath.includes("download")) {
                    //远端下载的图片加载失败
                    jsb.fileUtils.removeFile(filepath);
                }
                callAndRemoveFromeWaitingLoadMap(url, err, tex);
                hasLoadTextureUrl.push(filepath);
            });

        }

        if (jsb.fileUtils.isFileExist(filepath)) {
            console.log('loadFromUrl::native::Remote is find at local, ' + filepath);
            loadEnd();
            return;
        }

        function saveFile(data) {
            if (!jsb.fileUtils.isDirectoryExist(dirpath)) {
                jsb.fileUtils.createDirectory(dirpath);
            }

            if (jsb.fileUtils.writeDataToFile(new Uint8Array(data), filepath)) {
                console.log('loadFromUrl::native::Remote write file succeed.');
                loadEnd();
            } else {
                let err = 'loadFromUrl::native::Remote write file failed.';
                callAndRemoveFromeWaitingLoadMap(url, err, null);
                console.log(err);
            }
        };

        var xhr = new XMLHttpRequest();
        xhr.responseType = 'arraybuffer';

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    saveFile(xhr.response);
                } else {
                    let err = 'loadFromUrl::Remote download file failed.';
                    callAndRemoveFromeWaitingLoadMap(url, err, null);
                }
            }
        }.bind(this);
        xhr.open("GET", url, true);
        xhr.send();
    }

    //浏览器从web 加载

    function loadFromRemoteWeb(url: string) {
        cc.loader.load(url, function (err, tex) {
            if (err || !(tex instanceof cc.Texture2D)) {
                console.log('loadFromUrl::web::load::err', err);
            }
            else {
                console.log('loadFromUrl::web::load::sucess', url);
            }
            callAndRemoveFromeWaitingLoadMap(url, err, tex)
            hasLoadTextureUrl.push(url);
        });
    }

    function loadFromUrlImple(url: string, sp?: cc.Sprite, target?: Object, cb?: (a: string, b: cc.Texture2D, resUrl: string) => void): void {
        // console.log("loadFromUrl::url", url);
        if (!((target && cb) || !(target || cb))) {
            console.log("loadFromUrl::eror ,param error");
            return;
        }

        let v: LoadTextureParam = { sp: sp, cb: cb, target: target };
        //如果有已经发起请求的对应的url，则不需要请求了，等着前面的请求回复来直接创建
        let hasInMap = isInWaitingLoadMap(url);
        addToWaitingLoadMap(url, v);
        if (hasInMap) {
            return;
        }

        if (url.indexOf("http") >= 0) { //远程加载
            if (cc.sys.isNative) { //原生远程加载
                loadFromRemoteNative(url);
            }
            else { //浏览器远程加载
                loadFromRemoteWeb(url);
            }
        }
        else {  //包内加载
            loadFromInnner(url);
        }
    }

    //导出的通用的加载借口
    /**
     * 加载的辅助类，如果是已经加载过的，会保存到本地
     * @param url string
     * @param v LoadTextureParam
     */
    export function loadFromUrl(url: string, sp: cc.Sprite): void {
        if(url == void 0 || url == ""){
            return;
        }
        // console.log("loadFromUrl::url", url);
        loadFromUrlImple(url, sp)
    }

    export function loadFromUrlCb(url: string, target: Object, cb: (a: string, b: cc.Texture2D, resUrl: string) => void): void {
        if (!((target && cb) || !(target || cb))) {
            console.log("loadFromUrl::eror ,param error");
            return;
        }
        loadFromUrlImple(url, undefined, target, cb);
    }

    //释放所有由此加载的资源
    export function releaseLoadRes() {
        for (let j = 0, len = hasLoadTextureUrl.length; j < len; j++) {
            cc.loader.release(hasLoadTextureUrl[j]);
        }
        hasLoadTextureUrl = [];
    }

    export function releaseRes(url: string) {
        if(!url){
            return;
        }
        if (url.indexOf("http") >= 0) { //远程资源
            if(cc.sys.isNative){
                cc.gameName = cc.gameName || "wanba";
                let dirpath = jsb.fileUtils.getWritablePath() + cc.gameName + '/res/raw-assets/resources/download/';
                let filepath = dirpath + getLocalFileName(url);

                cc.loader.release(filepath);
            }
        }
        else {  //包内资源
            let rurl = cc.url.raw(url);
            cc.loader.release(rurl);
        }
    }

    /**
     *
     *
     * @export
     * @param {string} prefabUrl
     * @param {string[]} [excludeArr] 不需要释放的资源名
     * 
     */
    export function releasePrefabRes(prefabUrl: string, excludeArr?: string[]) {
        var deps = cc.loader.getDependsRecursively(prefabUrl);
        if (deps) {
            for (let i = 0; i < deps.length; i++) {
                let str: string = deps[i];
                for (let index = 0; index < excludeArr.length; index++) {
                    let excludeStr = excludeArr[index];
                    if (str.indexOf(excludeStr) !== -1) {
                        deps.splice(i, 1);
                    }
                }
            }
            cc.loader.release(deps);
        }
    }
    /**
     * 加载纹理的方法，不会保存到本地
     * @param url string exp:cc.raw("")/http:xxx.png
     * @param sprite cc.Sprite
     * @param callback Funcion
     */
    export function loadUrlImage(url: string, sprite: cc.Sprite, callback?: Function) {
        console.log("utils.loadUrlImage", url)
        if (!url) {
            return;
        }
        // if (cc.flag_download_fix || cc.path.extname(url)) {

        // } else {
        //     url = "http://wx.qlogo.cn/mmopen/ajNVdqHZLLDbia3DV1HyfiavnfQ93VmqYy3RBCa794HPicWWYVBLMwRbV21l38WGUgXcTxjGCyzJj1dAUDlN7UMMQ/132.png";
        // }
        cc.loader.load({ url: url, type: 'png' }, function (err, tex) {
            if (!cc.isValid(sprite.node)) {
                console.log("loadUrlImage success,but node is not Valid");
                return;
            }

            if (err || !(tex instanceof cc.Texture2D)) {
                console.log('loadUrlImage failed: ', url, "[" + err + "]");
            } else {
                console.log('loadUrlImage success: ', url, tex);
                sprite.spriteFrame = new cc.SpriteFrame(tex, new cc.Rect(0, 0, tex.pixelWidth, tex.pixelHeight));
            }
            if (callback) {
                callback(err, tex);
            }
        });
    }
    /**
     * 如果存在, 从WaitingLoadMap中删除指定的url
     * @param url string exp:cc.raw("")/http:xxx.png
     */
    export function deleteMapFromUrl(url: string) {

        if(isInWaitingLoadMap(url)){

            waitingLoadMap.delete(url);
        }

    }

}