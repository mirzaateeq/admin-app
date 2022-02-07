import * as types from './action.types';
import { AppState } from './app.state';
import * as userActions from './user.actions';

export const initialState: AppState =
{
    users: []
}

export function UserReducer(state = initialState, action: userActions.MyActions)
{
    switch(action.type)
    {
        case types.LOAD_USERS_SUCCESS:
            {
                return {...state, users: action.payload}
            }
            default:
                return state;
    }
}