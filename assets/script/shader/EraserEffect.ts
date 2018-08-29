
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    shaderReader: any;
    uMap = {
        pos: {
            type: "vec2",
            value: { x: 0.0, y: 0.0 },
        }
    };
    onLoad() {
        console.log("========onLoad========");
        this.node.on(cc.Node.EventType.TOUCH_START, this.touchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);

        this.shaderReader = this.node.getComponent("ShaderReaderCom");
        this.shaderReader.initCustomUniform(this.uMap);
        this.shaderReader.startShader();
    }
    onDestroy() {
        this.node.off(cc.Node.EventType.TOUCH_START, this.touchStart, this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
    }
    start() {

    }

    // update (dt) {}
    touchStart(event: cc.Event.EventTouch) {
        console.log("111");
        console.log(event);

    }

    touchMove(event: cc.Event.EventTouch) {
        let touchPos = this.node.convertToNodeSpaceAR(event.getLocation());
        var x = (touchPos.x + this.node.width / 2) / this.node.width;
        this.uMap.pos.value.x = (touchPos.x + this.node.width / 2) / this.node.width;
        this.uMap.pos.value.y = (touchPos.y + this.node.height / 2) / this.node.height;
        this.shaderReader.updateCustomUniform(this.uMap);
    }
    touchEnd(event: cc.Event.EventTouch) {
        console.log("333");

    }
}
