import React from 'react';

import TodoListItem from './task';
import './task-list.css';

const TodoList = ({
  todos, onDeleted, onToggleDone, changeItem,
}) => {
  const elements = todos.map((item) => {
    const { id } = item;

    return (
      <li key={id}>
        <TodoListItem
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

export default TodoList;
