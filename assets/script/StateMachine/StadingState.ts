import { fsm } from './fsm';
import { BaseState } from "./BaseState";

export class StadingState extends BaseState {
    constructor(fsm: fsm) {
        super(fsm);
    }

    begin() {

    }
}