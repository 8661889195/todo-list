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
        todoData: newTaskArray
      }
    });
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
    this.setState(({ todoData }) => {
      const doneList = todoData.filter((el) => !el.done);
      return {
        todoData: doneList
      }
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

