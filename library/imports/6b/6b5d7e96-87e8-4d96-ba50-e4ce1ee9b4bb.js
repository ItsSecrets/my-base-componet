"use strict";
cc._RF.push(module, '6b5d76Wh+hNlrpQ5M4e6bS7', 'ScreenShot');
// script/ScreenShot/ScreenShot.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.cutNode = null;
        return _this;
    }
    NewClass.prototype.start = function () {
    };
    NewClass.prototype.cutBtnClick = function () {
        var width = 2500;
        var height = 2500;
        this.cocosBuildImg(width, height, this.cutNode, "photo/battle_result.png", false, cc.rect(0, 0, width / 10, height / 10));
    };
    NewClass.prototype.cocosBuildImg = function (imgWidth, imgHeight, buildNode, imgPathAndName, bFormat, rect, fullScreen) {
        if (bFormat === void 0) { bFormat = true; }
        if (fullScreen === void 0) { fullScreen = true; }
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
        var imgPath = "";
        var imgName = "";
        var index = imgPathAndName.lastIndexOf("/");
        if (index > 0) {
            imgPath = imgPathAndName.substring(0, index + 1);
            imgName = imgPathAndName.substring(index + 1, imgPathAndName.length);
        }
        else {
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
        var path = jsb.fileUtils.getWritablePath() + imgPath; //2
        //防止文件路径乱码
        if (jsb.fileUtils.isFileExist(path)) {
            jsb.fileUtils.removeFile(path);
        }
        var isSuccess = jsb.fileUtils.createDirectory(jsb.fileUtils.getWritablePath() + imgPath);
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
        var renderTexture = cc.RenderTexture.create(imgWidth, imgHeight, cc.Texture2D.PIXEL_FORMAT_RGBA8888, gl.DEPTH24_STENCIL8_OES); //1334
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
        var buildScuess = false;
        if (rect) {
            var renderTexture1 = cc.RenderTexture.create(rect.width, rect.height, cc.Texture2D.PIXEL_FORMAT_RGBA8888, gl.DEPTH24_STENCIL8_OES);
            renderTexture.setPosition(rect.width / 2, rect.height / 2);
            renderTexture.scale = 0.1;
            renderTexture1.begin();
            renderTexture.visit();
            renderTexture1.end();
            buildScuess = renderTexture1.saveToFile(imgPath + imgName, cc.ImageFormat.PNG, bFormat, function () {
                console.log("build image by rect successfully!");
                var shareImgPath = jsb.fileUtils.getWritablePath() + imgPath + imgName;
            });
        }
        else {
            buildScuess = renderTexture.saveToFile(imgPath + imgName, cc.ImageFormat.PNG, bFormat, function () {
                console.log("build image successfully!");
                cc.director.setCullingEnabled(true);
                var shareImgPath = jsb.fileUtils.getWritablePath() + imgPath + imgName;
            });
        }
        if (!buildScuess) {
            console.log("save image fail!");
            return "";
        }
        console.log("###imgPath = ", jsb.fileUtils.getWritablePath() + imgPath + imgName);
        return jsb.fileUtils.getWritablePath() + imgPath + imgName;
    };
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "cutNode", void 0);
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

cc._RF.pop();