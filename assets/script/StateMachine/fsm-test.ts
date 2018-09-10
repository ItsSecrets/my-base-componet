import StateMachine = require("./state-machine")
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    onLoad() {
        let fsm = new StateMachine({
            init: 'gas',
            transitions: [
                { name: 'melt', from: 'solid', to: 'liquid' },
                { name: 'freeze', from: 'liquid', to: 'solid' },
                { name: 'vaporize', from: 'liquid', to: 'gas' },
                { name: 'condense', from: 'gas', to: 'liquid' }
            ],
            methods: {
                onMelt: function () {
                    console.log('11111 ' + '  current state ' + fsm.state)
                    setTimeout(() => {
                        fsm.vaporize();
                    }, 1);
                }.bind(this),
                onFreeze: function () {
                    console.log('22222 ' + '  current state ' + fsm.state)
                    setTimeout(() => {
                        fsm.melt();
                    }, 1);
                }.bind(this),
                onVaporize: function () {
                    console.log('3333 ' + '  current state ' + fsm.state)
                    setTimeout(() => {
                        fsm.condense();
                    }, 1);
                }.bind(this),
                onCondense: function () {
                    console.log('4444' + '  current state ' + fsm.state)
                    setTimeout(() => {
                        fsm.freeze();
                    }, 1);
                }.bind(this)
            }
        });
        console.log("==========", fsm.state);
        fsm.condense();


    }

    start() {

    }

    // update (dt) {}
}
