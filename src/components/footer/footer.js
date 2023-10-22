import React from 'react';

import { TaskFilter } from '../task-filter/task-filter';
import './footer.css';

export const Footer = ({ todoCount, buttonClearCompleted, onFilterChange, filter }) => (
  <div className="footer">
    <span className="todo-count"
    >{todoCount} items left</span>
    <TaskFilter onFilterChange={onFilterChange}
    filter={filter} />
    <button className="clear-completed" onClick={buttonClearCompleted}>
      Clear completed
    </button>
  </div>
);
