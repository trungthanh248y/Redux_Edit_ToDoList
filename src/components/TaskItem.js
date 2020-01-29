import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../actions/index';

class TaskItem extends Component {

    showStatusElement(){
        return (
            <span
                className={ this.props.task.get('status') ? 'label label-danger' : 'label label-info' }
                onClick={ this.onUpdateStatus }
            >{ this.props.task.get('status') === true ? 'Kích Hoạt' : 'Ẩn' }</span>
        );
    }

    onUpdateStatus = () => {
        this.props.onUpdateStatus(this.props.index);
    }

    onDeleteItem = () => {
        const notification = window.confirm('Ban co chac muon xoa khong');
        if(notification === true) {
            this.props.onDeleteTask(this.props.index);
        }
    }

    onEditTask = () => {
        this.props.onOpenForm();
        // console.log(this.props.task);
        this.props.onEditTask(this.props.task);
    }

    render() {
        return (
            <tr>
                <td>{ this.props.index + 1 }</td>
                <td>{ this.props.task.get('name') }</td>
                <td className="text-center">
                    { this.showStatusElement() }
                </td>
                <td className="text-center">
                    <button type="button" className="btn btn-warning" onClick={ this.onEditTask }>
                        <span className="fa fa-pencil mr-5"></span>Sửa
                    </button>
                    &nbsp;
                    <button type="button" className="btn btn-danger" onClick={ this.onDeleteItem }>
                        <span className="fa fa-trash mr-5"></span>Xóa
                    </button>
                </td>
            </tr>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onUpdateStatus: (id) => {
            dispatch(action.updateStatus(id));
        },
        onDeleteTask: (id) => {
            dispatch(action.deleteTask(id));
        },
        onOpenForm: () => {
            dispatch(action.openForm());
        },
        onEditTask : (task) => {
            dispatch(action.editTask(task))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);
