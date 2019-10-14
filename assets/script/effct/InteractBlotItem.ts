// import { BlotDataManager } from './../../../../../work/nurture/nurture/assets/script/BlotDataManager';
// import { TriggerType } from './../../../../../work/nurture/nurture/assets/script/CommonDef';
// import { EventType } from './../../../../../work/nurture/nurture/creator.d';
// import { EventCenter } from './../../../../../work/nurture/nurture/assets/script/EventCenter';

// import { EventType } from './EventType';

const { ccclass, property } = cc._decorator;

@ccclass
export default class InteractBlotItem extends cc.Component {

    @property(cc.Mask)
    mask: cc.Mask;

    @property(cc.Sprite)
    blotSprite: cc.Sprite = null;

    @property(cc.Node)
    touchNode: cc.Node = null;

    eraserPoints: any[] = [
        { x: -11.5, y: 74.5 },
        { x: -30.5, y: 64.5 },
        { x: -41.5, y: 53.5 },
        { x: -59.5, y: 44.5 },
        { x: -67.5, y: 34.5 },
        { x: -66.5, y: 11.5 },
        { x: -63.5, y: 5.5 },
        { x: -55.5, y: -3.5 },
        { x: -51.5, y: -11.5 },
        { x: -44.5, y: -36.5 },
        { x: -38.5, y: -47.5 },
        { x: -33.5, y: -52.5 },
        { x: -20.5, y: -58.5 },
        { x: -17.5, y: -62.5 },
        { x: -15.5, y: -62.5 },
        { x: -3.5, y: -73.5 },
        { x: 5.5, y: -74.5 },
        { x: 11.5, y: -71.5 },
        { x: 17.5, y: -65.5 },
        { x: 22.5, y: -56.5 },
        { x: 36.5, y: -57.5 },
        { x: 43.5, y: -55.5 },
        { x: 51.5, y: -49.5 },
        { x: 53.5, y: -49.5 },
        { x: 60.5, y: -40.5 },
        { x: 59.5, y: -34.5 },
        { x: 57.5, y: -32.5 },
        { x: 58.5, y: -16.5 },
        { x: 60.5, y: -13.5 },
        { x: 61.5, y: -0.5 },
        { x: 65.5, y: 7.5 },
        { x: 67.5, y: 16.5 },
        { x: 67.5, y: 34.5 },
        { x: 63.5, y: 42.5 },
        { x: 59.5, y: 44.5 },
        { x: 49.5, y: 45.5 },
        { x: 36.5, y: 50.5 },
        { x: 35.5, y: 52.5 },
        { x: 27.5, y: 56.5 },
        { x: 18.5, y: 66.5 },
        { x: 16.5, y: 66.5 },
        { x: 9.5, y: 72.5 },
        { x: 3.5, y: 74.5 }
    ];
    onLoad() {
        this.touchNode.on(cc.Node.EventType.TOUCH_START, this.touchStart, this);
        this.touchNode.on(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
        this.touchNode.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
        this.touchNode.on(cc.Node.EventType.TOUCH_CANCEL, this.touchCancel, this);
        EventCenter.onEvent(EventType.CHECK_TRIGGER_STATE, this.onRcvBlotState, this);
    }
    onDestroy() {
        this.touchNode.off(cc.Node.EventType.TOUCH_START, this.touchStart, this);
        this.touchNode.off(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
        this.touchNode.off(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
        this.touchNode.off(cc.Node.EventType.TOUCH_CANCEL, this.touchCancel, this);
        EventCenter.offEvent(EventType.CHECK_TRIGGER_STATE, this.onRcvBlotState, this);

    }
    onRcvBlotState(triggerResult) {
        if (triggerResult.triggerType === TriggerType.Clean) {
            let blotList = BlotDataManager.getInstance().getBlotList();
            if (blotList.length > 0) {
                //拉近场景
                EventCenter.post(EventType.CHANGE_SCENE_SHOT, this.node.position);
            } else {
                //这个污渍已经被清理过了

            }
        }
    }

    // update (dt) {}
    touchStart(e: cc.Event.EventTouch) {
        e.stopPropagation();
        //阻止多点触摸
        if (e.getID() > 0) {
            return;
        }
        var point = e.touch.getLocation();
        point = this.node.convertToNodeSpaceAR(point);
        this._addCircle(point);
    }

    touchMove(e: cc.Event.EventTouch) {
        e.stopPropagation();
        if (e.getID() > 0) {
            return;
        }
        let delta_x = e.getDelta().x;
        let delta_y = e.getDelta().y;
        let delta = Math.sqrt((delta_x * delta_x) + (delta_y * delta_y));
        console.log("=============touch move: ", delta);
        var point = e.touch.getLocation();
        point = this.node.convertToNodeSpaceAR(point);
        this._addCircle(point);
    }

    touchEnd(e: cc.Event.EventTouch) {
        e.stopPropagation();
        if (e.getID() > 0) {
            return;
        }
        var point = e.touch.getLocation();
        point = this.node.convertToNodeSpaceAR(point);
        this._addCircle(point);
    }

    touchCancel(e: cc.Event.EventTouch) {
        e.stopPropagation();
        if (e.getID() > 0) {
            return;
        }

    }

    _addCircle(point) {
        var stencil = this.mask._clippingStencil;
        var color = cc.color(255, 255, 255, 0);
        let p = this.dealPoints(point);
        stencil.drawPoly(p, color, 0, color);
        if (!CC_JSB) {
            cc.renderer.childrenOrderDirty = true;
        }
    }

    dealPoints(point: cc.Vec2): cc.Vec2[] {
        const curPoints = JSON.parse(JSON.stringify(this.eraserPoints));
        for (let index = 0; index < curPoints.length; index++) {
            const element = curPoints[index];
            curPoints[index].x = curPoints[index].x + point.x;
            curPoints[index].y = curPoints[index].y + point.y;
        }
        return curPoints;
    }
}
