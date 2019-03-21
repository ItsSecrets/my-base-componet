import { Utils } from "../utils";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Node)
    cutNode: cc.Node = null;

    start () {

    }
    cutBtnClick(){
        let width = this.cutNode.width;
        let height = this.cutNode.height;
        this.cocosBuildImg(width, height, this.cutNode, "photo/battle_result.png", false, cc.rect(0,0, width, height));
    }

    /**
     * 1. 可以普通截图
     * 2. 截取屏幕中的某一个位置
     * 3. 截取屏幕缩略图
     * 
     * @param imgWidth  
     * @param imgHeight 
     * @param buildNode   这个节点的锚点需要设置成(0,0)
     * @param imgPathAndName 
     * @param bFormat 
     * @param rect  如果有这个参数，则是按这个区域截图
     * @param fullScreen  是否全屏截图，包括viewport窗口之外的图
     */
    cocosBuildImg(imgWidth, imgHeight, buildNode, imgPathAndName, bFormat: boolean = true, rect?: cc.Rect, fullScreen: boolean = true): string {
        if (imgWidth <= 0 || imgHeight <= 0) {
            console.log("imgWidth or imgHeight <= 0");
            return "";
        }

        if (!buildNode) {
            console.log("buildNode is null");
            return "";
        }

        if (!imgPathAndName) {
            console.log("imgPathAndName is null");
            return "";
        }

        //解析文件名字和路径
        let imgPath = "";
        let imgName = "";
        let index = imgPathAndName.lastIndexOf("/");
        if (index > 0) {
            imgPath = imgPathAndName.substring(0, index + 1);
            imgName = imgPathAndName.substring(index + 1, imgPathAndName.length);
        } else {
            imgName = imgPathAndName;
            imgPath = cc.gameName ? cc.gameName + "/" : imgPath;
        }

        if (imgName.length > 3 && imgName.substring(imgName.length - 3, imgName.length) != "png") {
            imgName = imgName + ".png";
        }

        if (imgName.length <= 3) {
            imgName = imgName + ".png";
        }

        //如果没有文件需要创建文件
        let path = jsb.fileUtils.getWritablePath() + imgPath; //2
        //防止文件路径乱码
        if (jsb.fileUtils.isFileExist(path)) {
            jsb.fileUtils.removeFile(path);
        }
        let isSuccess = jsb.fileUtils.createDirectory(jsb.fileUtils.getWritablePath() + imgPath);
        if (!isSuccess) {
            console.log("create path is fail");
            return "";
        }

        //全屏截图时，把自动裁剪功能关闭，保证屏幕外的内容也能截到！！！
        if (fullScreen) {
            cc.director.setCullingEnabled(false);
        }

        //如果待截图的场景中含有 mask，请开启下面注释的语句
        // var renderTexture = cc.RenderTexture.create(1280,640, cc.Texture2D.PIXEL_FORMAT_RGBA8888, gl.DEPTH24_STENCIL8_OES);
        let renderTexture = cc.RenderTexture.create(imgWidth, imgHeight, cc.Texture2D.PIXEL_FORMAT_RGBA8888, gl.DEPTH24_STENCIL8_OES); //1334
        if (!renderTexture) {
            console.log("create RenderTexture is null");
            return "";
        }

        //把 renderTexture 添加到场景中去，否则生成的时候，场景中的元素会移动


        //这行代码会导致有些内容渲染不出来 此项目中不用这种方式，采用把渲染节点的锚点改成（0，0）的方式



        // buildNode._sgNode.addChild(renderTexture);
        //把 renderTexture 设置为不可见，可以避免生成图片成功后，移除 renderTexture 造成的闪烁
        renderTexture.active = false;
        //实际的代码
        renderTexture.begin();
        //buildNode.node 是我们要生成的节点
        buildNode._sgNode.visit(); //_sgNode.visit();
        renderTexture.end();

        let buildScuess = false;

        if (rect) {
            let renderTexture1 = cc.RenderTexture.create(rect.width, rect.height, cc.Texture2D.PIXEL_FORMAT_RGBA8888, gl.DEPTH24_STENCIL8_OES);
            renderTexture.setPosition(rect.width / 2, rect.height / 2);
            
            ///////////////////这里设置renderTexture的scale可以实现缩略图截屏//////////////////////////
            // renderTexture.scale = 0.1; 
            renderTexture1.begin();
            renderTexture.visit();
            renderTexture1.end();
            buildScuess = renderTexture1.saveToFile(imgPath + imgName, cc.ImageFormat.PNG, bFormat, function () {
                console.log("build image by rect successfully!");
                let shareImgPath = jsb.fileUtils.getWritablePath() + imgPath + imgName;
            });
        } else {
            buildScuess = renderTexture.saveToFile(imgPath + imgName, cc.ImageFormat.PNG, bFormat, function () {
                console.log("build image successfully!");
                cc.director.setCullingEnabled(true);
                let shareImgPath = jsb.fileUtils.getWritablePath() + imgPath + imgName;
            })
        }


        if (!buildScuess) {
            console.log("save image fail!");
            return "";
        }

        console.log("###imgPath = ", jsb.fileUtils.getWritablePath() + imgPath + imgName);


        return jsb.fileUtils.getWritablePath() + imgPath + imgName;
    }
}
