import * as types from '../constants/ActionTypes';
import { fromJS, set, getIn, Map } from 'immutable';

var s4 = () => {
    return  Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}

var randomID = () =>{
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

var findIndex = (tasks, id) => {
    var result = -1;
    tasks.forEach((task, index) => {
        if(task.get('id') === id){
            result = index;
        }
    });
    return result;
}

var data = JSON.parse(localStorage.getItem('tasks'));
var initialState = (data ? fromJS(data) : fromJS([]));

var myReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.LIST_ALL:
            return state;
        case types.SAVE_TASK:
            // if(action.task.id) {
            //     const index = findIndex(state, action.task.id)
            //     state[index] = action.task;
            //     const addState = Map(state);
            // } else {
            const newTask = Map({
                id: randomID(),
                name: action.task.name,
                status: (action.task.status === 'true' || action.task.status === false) ? true : false,
            });
            const addTask = state.push(newTask);
            // }
            // console.log(state);
            localStorage.setItem('tasks', JSON.stringify(addTask));
            return addTask;//Sử dụng [...] để tránh trường hợp tham chiếu vùng nhớ(copy ra một vùng nhớ ms)
        case types.UPDATE_STATUS_TASK://Sử dụng thư viện immutable
            var index = action.id;
            // state[index].status = !state[index].status; //Nếu cập nhập kiểu này thì ra ngoài view k cập nhập dc, 
            // vì đây là ta mới cập nhập 1 thuộc tình trong object, để nó có thể cập lại ta cần cập nhập lại cả object này
            
            const newState = state.setIn([index, 'status'], !state.getIn([index, 'status']));

            // var cloneTask = {...state[index]};
            // cloneTask.status = !cloneTask.status;
            // state[index] = cloneTask;
            localStorage.setItem('tasks', JSON.stringify(newState));
            return newState;

        case types.DELETE_TASK:
            // const id = action.id;
            const index = action.id;
            const stateDelete = state.delete(index);
            localStorage.setItem('tasks', JSON.stringify(stateDelete));
            return stateDelete;
        case types.ONSORTVALUEINCREASE:
            const a = action.task.sortBy(
                (f) => f.get('name')
            );
            localStorage.setItem('tasks', JSON.stringify(a));
            return a;
        case types.ONSORTVALUEREDUCTION:
            const b = action.task.sortBy(
                (f) => f.get('name')
            );
            localStorage.setItem('tasks', JSON.stringify(b.reverse()));
            return b.reverse();
        case types.UPDATETASK:
            const id = findIndex(state, action.task.id)
            console.log(id);
            const editTask = state.set(id, fromJS(action.task));
            localStorage.setItem('tasks', JSON.stringify(editTask));
            return editTask;

        default: return state;
    }
}

export default myReducer;