import React from 'react';

import { Task } from '../task/task';
import './task-list.css';

export const TaskList = ({
  todos, onDeleted, onToggleDone, changeItem,
}) => {
  const elements = todos.map((item) => {
    const { id } = item;

    return (
      <li key={id}>
        <Task
          {...item}
          onDeleted={() => onDeleted(id)}
          changeItem={changeItem}
          onToggleDone={() => onToggleDone(id)}
        />
      </li>
    );
  });

  return <ul className="task-list">{elements}</ul>;
};
