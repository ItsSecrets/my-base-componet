import { fsm } from './fsm';
export abstract class BaseState {
    fsm: fsm = null;
    constructor(fsm: fsm) {

    }
    abstract begin(): void;
    end() {

    }
    update(dt: number): void {

    }
}