const { ccclass, property } = cc._decorator;

@ccclass
export default class Helloworld extends cc.Component {
    @property(cc.Prefab)
    cardEffcPrefab: cc.Prefab = null;

    onLoad() {
        this.initEraserEffect();
    }
    start() {
    }



    initEraserEffect() {
        let eraserNode = cc.instantiate(this.cardEffcPrefab);
        eraserNode.parent = this.node;
    }


}