import { Action } from 'redux';

export enum AlertTypes {
    SET_MESSAGE = 'alert/SET_MESSAGE',
    CLEAR_MESSAGE = 'alert/CLEAR_MESSAGE',
}

export interface SetAlertMessage extends Action<AlertTypes> {
    type: AlertTypes.SET_MESSAGE;
}

export interface ClearAlertMessage extends Action<AlertTypes> {
    type: AlertTypes.CLEAR_MESSAGE;
}
