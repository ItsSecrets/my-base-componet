import { fsm } from './fsm';
import { BaseState } from "./BaseState";

export class DivingState extends BaseState {
    constructor(fsm: fsm) {
        super(fsm);
    }

    begin() {

    }
}