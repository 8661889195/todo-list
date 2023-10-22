import React, { Component } from 'react';
import './task-filter.css';

export class TaskFilter extends Component {
  buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'done', label: 'Done' },
  ];

  render() {
    const { filter, onFilterChange } = this.props;

    const buttons = this.buttons.map(({ name, label }) => {
      const isActive = filter === name;
      const buttonFilter = isActive ? 'btn-info' : 'btn-outline';
      return (
        <button type="button" className={`btn ${buttonFilter}`} key={name} onClick={() => onFilterChange(name)}>
          {label}
        </button>
      );
    });

    return <ul className="filters">{buttons}</ul>;
  }
}
