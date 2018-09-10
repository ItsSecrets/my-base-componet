import { fsm } from './fsm';
import { BaseState } from "./BaseState";

export class DuckingState extends BaseState {
    constructor(fsm: fsm) {
        super(fsm);
    }

    begin() {

    }
}