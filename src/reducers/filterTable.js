import * as types from '../constants/ActionTypes';
import { fromJS, set, getIn, Map } from 'immutable';

var initialState = Map({
    name: '',
    status: -1,
});

var myReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.FILTER_TABLE:
            return Map({
                name: action.filter.name,
                status: parseInt(action.filter.status, 10),
            });
        default: return state;
    }
}

export default myReducer;