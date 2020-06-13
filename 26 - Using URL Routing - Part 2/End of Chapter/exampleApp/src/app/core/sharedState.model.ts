import { InjectionToken } from "@angular/core";

export enum MODES {
    CREATE, EDIT
}

export const SHARED_STATE = new InjectionToken("shared_state");

export class SharedState {
    constructor(public mode: MODES, public id?: number) { }
}
