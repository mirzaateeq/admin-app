import { User } from "../models/user";

export interface AppState
{
    readonly users: User[];
}