import React, { Component } from 'react';
import TastForm from './components/TaskForm';
import TaskControl from './components/TaskControl';
import TaskList from './components/TaskList';
import { fromJS, set } from 'immutable';
import './App.css';

// hỏi xem nó thay đổi vùng nhớ cũng thì tại sao phải load lại trang ms thay đổi giao diện
class App extends Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     tasks : [], //id: unit, name, status
  //     isDisplayForm: false,
  //     taskEditing: null,
  //     filter: {
  //       name: '',
  //       status: -1,
  //     },
  //     keyword : '',
  //     sortBy: 'name',
  //     sortValue: 1,
  //   }
  // }

  componentDidMount() {
    //một lifecyce react dc gán vào khi refets lại trang, nó chỉ dc gọi duy nhất 1 lần
    // if(localStorage && localStorage.getItem('tasks')) {
    //   var tasks = JSON.parse(localStorage.getItem('tasks'));
    //   this.setState({
    //     tasks: tasks //Lưu giá trị tasks vào state mỗi khi load lại trang tránh th mất data
    //   });
    // }
  }

  // onGeneraData = () => {
  //   var tasks = [
  //     {
  //       id : this.geberateID(),
  //       name: 'Hoc Lap Trinh',
  //       status : true,
  //     },
  //     {
  //       id : this.geberateID(),
  //       name: 'Di Boi',
  //       status : false,
  //     },
  //     {
  //       id : this.geberateID(),
  //       name: 'Ngu',
  //       status : true,
  //     }
  //   ]
  //   this.setState({
  //     tasks: tasks
  //   });
  //   localStorage.setItem('tasks', JSON.stringify(tasks));//localStorete là của html 5 giúp chúng ta lưu vào một vùng nhớ tương tự cookie.
  //   //Lên load lại trang k bị mất data, JSON.stringify chuyển tasks thành kiểu string để tiện lưu trữ. Trong dự án thực tế thì nó sẽ lưu và tải từ server suống
  // }

  onToggleForm = () => {
    // Fix lỗi chuyển từ sửa vào thêm
    if(this.state.isDisplayForm && this.state.taskEditing !== null)
    {
      this.setState({
        isDisplayForm: true,
        taskEditing: null,
      });
    }
    //Them task
    else {
      this.setState({
        isDisplayForm: !this.state.isDisplayForm,
        taskEditing: null,
      });
    }
  }

  onCloseForm = () => {
    // Sử dụng để đóng form
    this.setState({isDisplayForm: false});
  }

  onShowForm = () => {
    //Sử dụng để mở form
    this.setState({isDisplayForm: true});
  }

  onSubmit = (data) => {
    //Nhận dữ liệu từ thg con TastForm truyền qua props
    var { tasks } = this.state;
    if(data.id === '') {
      //Khi thêm thì ban dầu id nó = '' lên ta có thể bắt nó lại và phân biệt khi nào là form thêm và khi nào là form sửa
      data.id = (new Date).getTime();// id của dữ liệu vừa thêm
      tasks.push(data);
    }
    else{
      //Edit
      var index = this.findIndex(data.id);
      tasks[index] = data;
    }
    this.setState({
      tasks: tasks,
      // taskEditing: null,
    })
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  onUpdateStatus = (id) => {
    const { tasks } = this.state
    let newTasks = fromJS(tasks);
    const index = this.findIndex(id);
    if(index !== -1) {
      newTasks = newTasks.setIn([index, 'status'], !newTasks.getIn([index, 'status']));
      console.log(newTasks.toJS());
      this.setState({tasks: newTasks.toJS()})
      localStorage.setItem('tasks', JSON.stringify(newTasks.toJS()));
      setIn([index, 'name'], newValue);
      getIn([idnex, 'name']);
      task.get('id')
    }
  }

  onDelete = (id) => {
    var {tasks} = this.state;
    var index = this.findIndex(id);
    if(index !== -1) {
      tasks.splice(index, 1);//Nếu tìm thấy id của phần tử đang click thì, thự hiện xóa 1 phần tử bằng .splice(index, 1)
      this.setState({
        tasks: tasks,
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    this.onCloseForm();
  }

  onUpdate = (id) => {
    var {tasks} = this.state;
    var index = this.findIndex(id);
    var taskEditing = tasks[index];//Tại sao khi gán thẳng trực tiếp tasks[index] vào taskEditing trong setState mà lần đầu nó lại bị null
    this.setState({
      taskEditing: taskEditing,
    });
    this.onShowForm();
  }

  findIndex = (id) => {
    var { tasks } = this.state;
    var result = -1;
    tasks.forEach((task ,index) => {
      if(task.id === id) {
        result = index;
      }
    });
    return result;
  }

  onFilter = (filterName, filterStatus) => {
    filterStatus = parseInt(filterStatus, 10);//Chuyển sang kiểu int
    this.setState({
      filter: {
        name: filterName.toLowerCase(),
        status: filterStatus,
      }
    })

  }

  // onSearch = (keyword) => {
  //   this.setState({
  //     keyword: keyword,
  //   })
  // }

  // onSort= (sortBy, sortValue) => {
  //   this.setState({
  //     sortBy: sortBy,
  //     sortValue: sortValue,
  //   })
  // }

  render() {
    var { tasks, isDisplayForm, taskEditing ,filter , keyword, sortBy, sortValue} = this.state //Tương đương vs tasks = this.state.tasks
    // console.log(filter);//Filter
    if(filter) {
      if(filter.name) {
        tasks = tasks.filter((task) => {
          return task.name.toLowerCase().indexOf(filter.name) !== -1;
        });
      }
      tasks = tasks.filter((tasks) => {
        if(filter.status === -1) {
          return tasks;
        }else{
          return tasks.status === (filter.status === 1 ? true: false);
        }
      });
    }

    if(keyword) {
      tasks = tasks.filter((task) => {
        return task.name.toLowerCase().indexOf(keyword) !== -1;
      })
    }

    if(sortBy === 'name') {
      //Sắp xếp
      tasks.sort((a, b)=> {
        if(a.name > b.name) return sortValue;
        else if (a.name < b.name) return -sortValue;
        else return 0;
      })
    } else {
      tasks.sort((a, b)=> {
        if(a.status > b.status) return -sortValue;
        else if (a.status < b.status) return sortValue;
        else return 0;
      })
    }

    var elmTaskForm = isDisplayForm 
        ? <TastForm 
          onSubmit={this.onSubmit} 
          onCloseForm={this.onCloseForm}
          taskEditing={taskEditing}
        /> 
        : "";
    return (
      <div className="container">
        <div className="text-center">
          <h1>Quản Lý Công Việc</h1>
          <hr />
        </div>
        <div className="row">
          {/* Nếu click vào button thêm thì sẽ hiển thị <TastForm /> còn k sẽ ẩn nó đi */}
          <div className={ isDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : "" }>
            {elmTaskForm}
          </div>
          <div className={ isDisplayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12" }>
            <button
              type="button" 
              className="btn btn-primary"
              onClick={this.onToggleForm}
            >
              <span className="fa fa-plus mr-5" />
              Thêm Công Việc
            </button>
            {/* <button 
              type="button" 
              className="btn btn-danger" 
              onClick={this.onGeneraData}>
              Gebarate Data
            </button> */}
            <TaskControl 
              // onSearch={this.onSearch} 
              // // onSort={this.onSort}
              // sortBy={sortBy}
              // sortValue={sortValue}
            />
            <TaskList 
              tasks = { tasks } 
              onUpdateStatus={ this.onUpdateStatus }
              onDelete={this.onDelete}
              onUpdate={this.onUpdate}
              onFilter={this.onFilter}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
