import { MANAGETASK} from './actionTypes';

export const managetask = (id) => {
    return {
        "type": MANAGETASK,
        "payload": id
    }
}
