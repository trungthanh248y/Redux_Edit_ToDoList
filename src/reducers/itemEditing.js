import * as types from '../constants/ActionTypes';

var initialState = null;

var myReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.EDIT_TASK:
            return action.task.toJS();
        case types.ONFOCUS:
            return action.state;
        default: return state;
    }
}

export default myReducer;