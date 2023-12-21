import React, { Component } from 'react';

import './new-task-form.css';

export class NewTaskForm extends Component {
  state = {
    label: '',
    minValue: '',
    secValue: '',
  };

  onValueChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    if (e.keyCode === 13) {
      if (this.state.label.trim() === '') {
        return;
      }
      this.props.addItem(this.state.label, this.state.minValue, this.state.secValue);
      this.setState({
        label: '',
        secValue: '',
        minValue: '',
      });
    }
  };

  render() {
    const { label, secValue, minValue } = this.state;
    return (
      <form className="new-todo-form" onKeyDown={this.onSubmit}>
        <input
          className="new-todo"
          name="label"
          onChange={this.onValueChange}
          placeholder="What needs to be done?"
          value={label}
        />
        <input
          className="new-todo-form__timer"
          name="minValue"
          onChange={this.onValueChange}
          placeholder="min"
          value={minValue}
        />
        <input
          className="new-todo-form__timer"
          name="secValue"
          onChange={this.onValueChange}
          placeholder="sec"
          value={secValue}
        />
      </form>
    );
  }
}
