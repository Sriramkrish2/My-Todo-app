import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faCheck } from '@fortawesome/free-solid-svg-icons'

import { Todo } from '../../types';
import './TodoItem.module.scss'

type TodoItemProps = {
  todo: Todo,
  deleteTodo: (id: number) => void,
  completeTodo: (id: number) => void,
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, deleteTodo, completeTodo }: TodoItemProps) => {

const deleteTodoItem = () => {
    deleteTodo(todo.id)
}

const completeTodoItem = () => {
  completeTodo(todo.id)
}

  return (
    <>
      {
      <li >
        <div className="todo-item">
          <span className='todo-item-title'>{todo.title}</span>
          {!todo.isCompleted && <FontAwesomeIcon icon={faCheck} className='todo-item-complete' onClick={completeTodoItem} data-testid={'todo-item-complete'}/>}        
          <FontAwesomeIcon icon={faTrash} className='todo-item-delete' onClick={deleteTodoItem} data-testid={'todo-item-delete'}/>
        </div>
      </li>}
    </>
  );
}

export default TodoItem;