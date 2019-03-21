const { ccclass, property } = cc._decorator;

@ccclass
export default class Helloworld extends cc.Component {
    @property(cc.Prefab)
    cardEffcPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    mohuPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    machinePrefab: cc.Prefab = null;

    @property(cc.Prefab)
    listViewPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    screenCutPrefab:cc.Prefab = null;


    onLoad() {
        // this.initEraserEffect();
        // this.initMohuPrefab();
        // this.initStateMachine();
        // this.initListVViewDemo();
        this.initScreenCutDemo();
    }
    start() {
    }


    // 橡皮擦效果
    initEraserEffect() {
        let eraserNode = cc.instantiate(this.cardEffcPrefab);
        eraserNode.parent = this.node;
    }

    initMohuPrefab() {
        let mohuNode = cc.instantiate(this.mohuPrefab);
        mohuNode.parent = this.node;
    }

    initStateMachine() {
        let machineNode = cc.instantiate(this.machinePrefab);
        machineNode.parent = this.node;
    }

    initListVViewDemo() {
        let listViewNode = cc.instantiate(this.listViewPrefab);
        listViewNode.parent = this.node;
    }

    initScreenCutDemo(){
        let screenCutNode = cc.instantiate(this.screenCutPrefab);
        screenCutNode.parent = this.node;
    }

}