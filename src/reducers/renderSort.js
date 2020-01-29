import * as types from '../constants/ActionTypes';
import { fromJS } from 'immutable';

var initialState = fromJS({
    by: 'name',
    value: 1,//1 tang, -1 giam
});

var myReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.SORT:
            return fromJS({
                by: action.sort.by,
                value: parseInt(action.sort.value, 10),
            });
        default: return state;
    }
}

export default myReducer;