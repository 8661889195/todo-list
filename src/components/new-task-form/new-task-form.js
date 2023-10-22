import React, { Component } from 'react';

import './new-task-form.css';

export class NewTaskForm extends Component {
  state = {
    label: '',
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.label.trim() === '') {
      return;
    }
    this.props.addItem(this.state.label);
    this.setState({
      label: '',
    });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          className="search-panel"
          onChange={this.onLabelChange}
          placeholder="What needs to be done?"
          value={this.state.label}
        />
      </form>
    );
  }
}
