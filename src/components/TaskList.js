import React, { Component } from 'react';
import TaskItem from './TaskItem';
import { connect } from 'react-redux';
import * as action from '../actions/index';

class TaskList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filterName : '',
            filterStatus : -1
        };
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        // this.props.onFilter(name === 'filterName' ? value : this.state.filterName, name === 'filterStatus' ? value : this.state.filterStatus);
        var filter = {
            name: name === 'filterName' ? value : this.state.filterName,
            status: name === 'filterStatus' ? value : this.state.filterStatus
        };
        this.props.onFilterTable(filter);
        this.setState({
            [name] : value
        });
    }

    elmTasks = (tasks) => {
        return (
        tasks.map((task, index) => (
            <TaskItem
                key={task.get('id')}
                task={task}
                index={index}
                // onUpdateStatus={ this.props.onUpdateStatus }
                // onDeleteTask={ this.props.onDeleteTask }
                // onSelectedItem = { this.props.onSelectedItem }
            />
        )
    ))};

    // sortAndReverse = (tasks) => {
    //     if (sort.get('by') === 'name') {
    //         if(sort.get('value') === 1) {
    //             sortAndReverse(tasks);
    //         }
            
    //     //     tasks.sort((a, b) => {
    //     //         if(a.get('name') > b.get('name')) return this.props.sortAndReverse(sorted);
    //     //         else if(a.get('name') < b.get('name')) return sorted.reverse();
    //     //         else return 0;
    //     //     });
    //     } 
    //     // else {
    //     //     tasks.sort((a, b) => {
    //     //         if(a.get('status') > b.get('status')) return sorted;
    //     //         else if(a.get('status') < b.get('status')) return sorted.reverse();
    //     //         else return 0;
    //     //     });
    //     //     console.log(sorted.toJS())
    //     // }
    // }

    render() {
        var { tasks, filterTable, keyword, sort, sortAndReverse } = this.props;

        if (filterTable.get('name')) {
            tasks = tasks.filter((task) => {
                return task.get('name').toLowerCase().indexOf(filterTable.get('name').toLowerCase()) !== -1
            });
        }

        tasks = tasks.filter((task) => {
            if(filterTable.get('status') === '-1' || filterTable.get('status') === -1){
                return task;
            } else {
                return task.get('status') === (filterTable.get('status') === 1 ? true : false);
            }
        });

        tasks = tasks.filter((task) => {//Tìm kiếm 
            return task.get('name').toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
        });

        if(sort.get('by') === 'name')
        {
            if(sort.get('value') === 1) 
            { 
                this.props.onSortValueIncrease(tasks);
                this.props.onSort({by: 'name', value: 0,});
            }
            else if (sort.get('value') === -1) {
                this.props.onSortvalueReduction(tasks);
                this.props.onSort({by: 'name', value: 0,});
            } 
        }

        if(sort.get('by') === 'status')
        {
            tasks = tasks.filter((task) => {
                console.log(task.toJS());
                if(task.get('status') === true && sort.get('value') === 1){
                    return task;
                } else {
                    return task.get('status') === (sort.get('value') === -1 ? false : true);
                }
            });
        }
        
        return (
            <div className="row mt-15">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th className="text-center">STT</th>
                                <th className="text-center">Tên</th>
                                <th className="text-center">Trạng Thái</th>
                                <th className="text-center">Hành Động</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="filterName"
                                        onChange={ this.onChange }
                                        value={ this.state.filerName }
                                    />
                                </td>
                                <td>
                                    <select
                                        className="form-control"
                                        name="filterStatus"
                                        onChange={ this.onChange }
                                        value={ this.state.filterStatus }
                                    >
                                        <option value={-1}>Tất Cả</option>
                                        <option value={0}>Ẩn</option>
                                        <option value={1}>Kích Hoạt</option>
                                    </select>
                                </td>
                                <td></td>
                            </tr>
                            { this.elmTasks(tasks) }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    // console.log(state);
    return {
        tasks: state.tasks,//state này tương tự nó gọi file index trong reducers, .tasks này tương đương vs tasks:tasks và đc xử lý trong file tasks
        // Và để gọi nó ta vẫn dùng this.props.tasks như bt
        filterTable : state.filterTable,
        keyword: state.search,
        sort : state.sort,
    }
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        onFilterTable : (filter) => {
            dispatch(action.filterTask(filter));
        },
        onSortValueIncrease : (tasks) => {
            dispatch(action.onSortValueIncrease(tasks));
        },
        onSortvalueReduction : (tasks) => {
            dispatch(action.onSortvalueReduction(tasks));
        },
        onSort: (sort) => {//sort.by sort.value
            dispatch(action.sortTask(sort));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
