import React, { Component } from 'react';
import './task.css';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

export class Task extends Component {
  state = {
    isEdit: false,
    currentValue: this.props.label,
  };

  componentWillUnmount() {
    clearInterval(this.props.timerId);
  }

  handleEdit = () => {
    if (this.state.isEdit) {
      this.props.changeItem(this.props.id, this.state.currentValue);
    }
    this.setState({ isEdit: !this.state.isEdit });
  };

  handleChange = (e) => {
    this.setState({ currentValue: e.target.value });
  };

  handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      this.props.changeItem(this.props.id, this.state.currentValue);
      console.log(this.props.id);
      this.setState({ isEdit: !this.state.isEdit });
    }
  };

  render() {
    const {
      label, onDeleted, onToggleDone, done, createdAt,
    } = this.props;
    let classNames = 'todo-list-item';
    if (done) {
      classNames += ' done';
    }

    const changeElement = this.state.isEdit ? (
      <input onChange={this.handleChange} onKeyDown={this.handleKeyPress} value={this.state.currentValue} />
    ) : (
      <span className="todo-list-item-label">{label}</span>
    );

    return (
      <span className={classNames}>
        <input className="toggle" type="checkbox" onClick={onToggleDone}></input>
        <label>
          {changeElement}
          <span className="message-date">{formatDistanceToNow(createdAt, { includeSeconds: true })}</span>
        </label>
        <span className="icon icon-edit" onClick={this.handleEdit}></span>
        <span className="icon icon-destroy" onClick={onDeleted}></span>
      </span>
    );
  }
}
