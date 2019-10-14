/**
 * 背景循环滚动
 * 对应 resources/shader/gray.glsl 
 */

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    shaderReader = null;
    time = 0.0;
    onLoad () {
        this.shaderReader = this.node.getComponent("ShaderReader");
    }
    update (dt) {
        this.time = this.time + dt > 1.0 ? this.time + dt - 1 : this.time + dt;
        this.shaderReader.initCustomUniform({
            dt: {
                type: "float",
                value: this.time
            }
        });
    }
}
