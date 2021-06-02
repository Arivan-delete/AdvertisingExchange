import { AlertTypes } from './contracts/actionTypes'

interface stateAlert {
    message: string
}

const reducerAlert = (state = {message: ''}, action: any): stateAlert => {
    switch (action.type) {
        case AlertTypes.SET_MESSAGE:
            return action.message
        default:
            return state;
    }
}

export { reducerAlert }