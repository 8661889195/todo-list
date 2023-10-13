import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import SearchPanel from './components/new-task-form';
import TodoList from './components/task-list';
import FooterData from './components/footer';
import './index.css';

export default class App extends Component {
  maxId = 100;

  state = {
    todoData: [],
    filter: 'all',
  };

  createTodoItem(label) {
    return {
      label,
      done: false,
      id: this.maxId++,
      createdAt: new Date(),
    };
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const index = todoData.findIndex((el) => el.id === id);
      const newArray = [...todoData.slice(0, index), ...todoData.slice(index + 1)];
      return {
        todoData: newArray,
        // currentList: newArray
      };
    });
  };

  changeItem = (id, newLabel) => {
    const currentTaskArray = this.state.todoData.filter((item) => item.id === id);
    const currentTask = currentTaskArray[0];
    const newTask = { ...currentTask, label: newLabel };
    const newTaskArray = this.state.todoData.map((item) => (item.id === id ? newTask : item));
    this.setState({ todoData: newTaskArray });
  };

  addItem = (text) => {
    const newItem = this.createTodoItem(text);
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
    const doneList = this.state.todoData.filter((el) => !el.done);
    this.setState({
      todoData: doneList,
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
        <SearchPanel addItem={this.addItem} />
        <TodoList
          todos={visibleItems}
          onDeleted={this.deleteItem}
          onToggleDone={this.onToggleDone}
          changeItem={this.changeItem}
        />
        <FooterData
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
