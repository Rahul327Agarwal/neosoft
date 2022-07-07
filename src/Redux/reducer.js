import { MANAGETASK } from "./actionTypes";

const init = {
  pending: 0,
  completed: 0,
};

export const reducer = (state = init, { type, payload }) => {
  switch (type) {
    case MANAGETASK:
      return {
        ...state,
        pending: payload.pending_count,
        completed: payload.completed_count,
      };

    default: {
      return state;
    }
  }
};
