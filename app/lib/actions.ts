import { Action } from 'redux';

export interface StandardAction<Payload> extends Action {
    payload: Payload;
}
