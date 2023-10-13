import React from 'react';

import ItemStatusFilter from './task-filter';
import './footer.css';

const FooterData = ({ todoCount, buttonClearCompleted, onFilterChange }) => (
    <div className="footer"
    >
      <span className="todo-count"
      >{todoCount} items left</span>
      <ItemStatusFilter onFilterChange={onFilterChange} />
      <button className="clear-completed" onClick={buttonClearCompleted}>
        Clear completed
      </button>
    </div>
);

export default FooterData;
