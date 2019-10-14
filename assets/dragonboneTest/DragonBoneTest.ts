import { LoadHelper } from "../script/LoadHelper";

const {ccclass, property} = cc._decorator;

@ccclass
export default class DragonBoneTest extends cc.Component {
    @property(dragonBones.ArmatureDisplay)
    currentDisplay: dragonBones.ArmatureDisplay = null;
    
    curUrlIndex:number = 0;


    onLoad(){


        console.log(this.currentDisplay);
        this.currentDisplay = this.node.getChildByName("AWT2_ske").getComponent(dragonBones.ArmatureDisplay);
    }
    /**
     * 可以切换带mesh的图
     */
    changeSkin() {
        return new Promise((resolve, reject) => {
            let skinUrl = [
                "/resources/dragonboneTest/skin/female.png",
                "/resources/dragonboneTest/skin/male.png",
            ];
            this.curUrlIndex++;
            let url = skinUrl[this.curUrlIndex%2];
            LoadHelper.loadFromUrlCb(url, this, (err, tex) => {
                if (err) {
                    resolve();
                    return;
                }
                if (tex && cc.sys.isNative && (cc.sys.os == cc.sys.OS_ANDROID || cc.sys.os == cc.sys.OS_IOS)) {
                    if (this.currentDisplay) {
                        this.currentDisplay.armature().replaceTexture(tex);
                    }
                } else {
                    console.log("tex = null or changeSkin only suport native");
                }
                console.log("restoreSkin success");
                console.log("AvatarModelBase changeSkin: change skin end");
                // console.log("=========>>>>AvatarModelBase changeSkin: change skin end");

                resolve();
            });
        });
    }

    /**
     * 不可以切换带mesh的图
     * @param skinKey 
     * @param resUrl 
     * @param slotName 
     */
    chengeSlotTex(skinKey: string, resUrl: string, slotName: string) {
        let slotResArr = [
            "/resources/dragonboneTest/make_up/woman01x_coat4.png",
            "/resources/dragonboneTest/make_up/man03_coat4.png",
            
        ]
        this.curUrlIndex++;
        resUrl = slotResArr[this.curUrlIndex % 2];
        slotName = "coat3"
        //load 
        LoadHelper.loadFromUrlCb(resUrl, this, (err, makeupTex) => {
            if (makeupTex) {
                if (this.currentDisplay) {
                    let armature = this.currentDisplay.armature();
                    if (armature == null) {
                        console.log("[restoreMakeup animation] not exist");
                        return;
                    }
                    let slot = armature.getSlot(slotName);
                    if (slot && slot.display && slot.display.setSpriteFrame) {
                        let spriteFrame = new cc.SpriteFrame(makeupTex, new cc.Rect(0, 0, makeupTex.pixelWidth, makeupTex.pixelHeight));
                        slot.display.setSpriteFrame(spriteFrame);
                        // console.log("slot display change spriteFrame success, slotName =", slotName, "imgUrl =", imgUrl);
                    }
                    else {
                        cc.error("can not find slot or display, slotName =", slotName);
                    }
                }
                // console.log("restoreMakeup success");
            }
            else {
                cc.error("restoreMakeup faild, skinTex :", makeupTex);
            }
        });
    }
    
}
