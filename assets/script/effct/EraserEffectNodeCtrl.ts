// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class EraserEffectNodeCtrl extends cc.Component {

    @property(cc.Label)
    rsultLabel: cc.Label;

    @property(cc.Mask)
    mask: cc.Mask;

    @property(cc.Label)
    promptLabel: cc.Label;

    // LIFE-CYCLE CALLBACKS:
    //多边形点数组，可以利用PolygonCollider生成
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
        this.node.on(cc.Node.EventType.TOUCH_START, this._onTouchBegin, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this._onTouchMoved, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancel, this);
    }

    onDestroy() {
        this.node.off(cc.Node.EventType.TOUCH_START, this._onTouchBegin, this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this._onTouchMoved, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this._onTouchEnd, this);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancel, this);
    }
    _onTouchBegin(event: cc.Event.EventTouch) {
        cc.log('touchBegin');
        var point = event.touch.getLocation();
        point = this.node.convertToNodeSpaceAR(point);
        this._addCircle(point);
    }

    _onTouchMoved(event: cc.Event.EventTouch) {
        var point = event.touch.getLocation();
        point = this.node.convertToNodeSpaceAR(point);
        this._addCircle(point);
    }

    _onTouchEnd(event: cc.Event.EventTouch) {
        var point = event.touch.getLocation();
        point = this.node.convertToNodeSpaceAR(point);
        this._addCircle(point);
    }

    _onTouchCancel(event: cc.Event.EventTouch) {

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

