import { MANAGETASK} from './actionTypes';


const init =
{
    pending: 0,
    completed: 0
}

// const init=0;

export const reducer = (state = init, { type, payload }) => {

    switch (type) {
        case MANAGETASK: 
        if(payload===1)
        return { ...state,pending:state.pending+1}
        if(payload===3)
        return { ...state,pending:state.pending-1,completed:state.completed+1}
        if(payload===4)
        return { ...state,pending:state.pending+1,completed:state.completed-1}
        break;
        
        default: {
            return state;
        }
    }

}