import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { NewTaskForm } from './components/new-task-form/new-task-form';
import { TaskList } from './components/task-list/task-list';
import { Footer } from './components/footer/footer';
import './index.css';

export class App extends Component {
  maxId = 100;

  state = {
    todoData: [],
    filter: 'all',
  };

  createTodoItem(label, minValue, secValue) {
    let minValueNumber = +minValue;
    let secValueNumber = +secValue;
    if (secValueNumber > 59) {
      minValueNumber += Math.trunk(secValueNumber / 60);
      secValueNumber += Math.trunk(secValueNumber / 60) * 60;
    }
    return {
      label,
      done: false,
      id: this.maxId++,
      createdAt: new Date(),
      minValue: minValueNumber,
      secValue: secValueNumber,
      isCounting: false,
      timerId: null,
    };
  }

  setDecrement = (id) => {
    const currentTask = this.state.todoData.find((item) => item.id === id);
    if (currentTask.secValue === 0 && currentTask.minValue !== 0) {
      currentTask.minValue -= 1;
      currentTask.secValue = 59;
      const newTodoData = this.state.todoData.map((item) => (item.id === id ? currentTask : item));
      this.setState({
        todoData: newTodoData,
      });
      return;
    }

    if (currentTask.secValue === 0 && currentTask.minValue === 0) {
      this.handleStop(id);
      this.onToggleDone(id);
      return;
    }

    currentTask.secValue -= 1;
    const newTodoData = this.state.todoData.map((item) => (item.id === id ? currentTask : item));
    this.setState({
      todoData: newTodoData,
    });
  };

  handleStart = (id) => {
    const timerId = setInterval(() => this.setDecrement(id), 1000);
    const newTodoData = this.state.todoData.map((item) => (item.id === id ? { ...item, isCounting: true, timerId } : item));
    this.setState({
      todoData: newTodoData,
    });
  };

  handleStop = (id) => {
    const currentTask = this.state.todoData.find((item) => item.id === id);
    clearInterval(currentTask.timerId);
    const newTodoData = this.state.todoData.map((item) => (item.id === id ? { ...item, isCounting: false, timerId: null } : item));
    this.setState({
      todoData: newTodoData,
    });
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const index = todoData.findIndex((el) => el.id === id);
      const newArray = [...todoData.slice(0, index), ...todoData.slice(index + 1)];
      return {
        todoData: newArray,
      };
    });
  };

  changeItem = (id, newLabel) => {
    this.setState(({ todoData }) => {
      const currentTaskArray = todoData.filter((item) => item.id === id);
      const currentTask = currentTaskArray[0];
      const newTask = { ...currentTask, label: newLabel };
      const newTaskArray = todoData.map((item) => (item.id === id ? newTask : item));
      return {
        todoData: newTaskArray,
      };
    });
  };

  addItem = (text, minValue, secValue) => {
    const newItem = this.createTodoItem(text, minValue, secValue);
    this.setState(({ todoData }) => {
      const newArr = [...todoData, newItem];
      return {
        todoData: newArr,
      };
    });
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      const index = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[index];
      const newItem = { ...oldItem, done: !oldItem.done };

      const newArray = [...todoData.slice(0, index), newItem, ...todoData.slice(index + 1)];

      return {
        todoData: newArray,
      };
    });
  };

  buttonClearCompleted = () => {
    this.setState(({ todoData }) => {
      const doneList = todoData.filter((el) => !el.done);
      return {
        todoData: doneList,
      };
    });
  };

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  filter(items, filter) {
    switch (filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.done);
      case 'done':
        return items.filter((item) => item.done);
      default:
        return items;
    }
  }

  render() {
    const { todoData, filter } = this.state;

    const visibleItems = this.filter(todoData, filter);
    const doneCount = todoData.filter((el) => el.done).length;

    const todoCount = todoData.length - doneCount;

    return (
      <div className="todo-app">
        <NewTaskForm addItem={this.addItem} />
        <TaskList
          todos={visibleItems}
          onDeleted={this.deleteItem}
          onToggleDone={this.onToggleDone}
          changeItem={this.changeItem}
          handleStart={this.handleStart}
          handleStop={this.handleStop}
        />
        <Footer
          todoCount={todoCount}
          filter={filter}
          onFilterChange={this.onFilterChange}
          buttonClearCompleted={this.buttonClearCompleted}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
