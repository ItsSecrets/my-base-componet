/**
 * 增加简单状态机
 */
import { DivingState } from './DivingState';
import { DuckingState } from './DuckingState';
import { JumpingState } from './JumpingState';
import { StadingState } from './StadingState';
import { BaseState } from "./BaseState";

export class fsm {
    stateMap: Map<number, BaseState> = null;
    currentState: BaseState = null;
    constructor(parameters) {
        this.stateMap = new Map();
    }

    initState() {
        this.stateMap.set(IState.STATE_STANDING, new StadingState(this));
        this.stateMap.set(IState.STATE_JUMPING, new JumpingState(this));
        this.stateMap.set(IState.STATE_DUCKING, new DuckingState(this));
        this.stateMap.set(IState.STATE_DIVING, new DivingState(this));
    }

    changeState(state: IState) {
        if (this.currentState) {
            this.currentState.end();
        }
        this.currentState = this.stateMap.get(state);
        if (this.currentState) {
            this.currentState.begin();
        }
    }

    update(dt: number) {
        if (this.currentState) {
            this.currentState.update(dt);
        }
    }
}

export enum IState {
    STATE_STANDING,
    STATE_JUMPING,
    STATE_DUCKING,
    STATE_DIVING
}