import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable } from "rxjs";
import { map, mergeMap } from "rxjs/operators";
import { UserService } from "../services/user.service";
import * as types from './action.types';
import * as userActions from './user.actions';

//Ideally Effects should interact with service and components should not directly interact with services
export class UserEffects
{
    constructor(private userService: UserService, 
        private actions$: Actions){}
    
        @Effect() 
        loadUsers$: Observable<Action> = this.actions$.pipe(
            ofType<userActions.loadUsersAction>(types.LOAD_USERS),
            mergeMap(()=> this.userService.getUsers()
            .pipe(map(users => new userActions.loadUsersSuccessAction(users))))
        )
}