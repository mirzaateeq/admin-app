import { Action, createAction } from "@ngrx/store";
import { User } from "../models/user";
import * as types from './action.types';

export class loadUsersAction implements Action
{
    readonly type = types.LOAD_USERS;
    constructor(){}
}
export class loadUsersSuccessAction implements Action
{
    readonly type = types.LOAD_USERS_SUCCESS;
    constructor(public payload: User[]){
    }
}

export type MyActions = loadUsersAction | loadUsersSuccessAction