import React from 'react';

import TodoItem from '../TodoItem/TodoItem'; 
import { Todo } from '../../types';
import './TodoList.module.scss'


type TodoListProps = {
  todos: Array<Todo>,
  deleteTodo: (id: number) => void,
  completeTodo: (id: number) => void
}
const TodoList: React.FC<TodoListProps> = ({ todos, deleteTodo, completeTodo }: TodoListProps) => {

  return (
    <ul className={"todo-list"}>
      {todos.map((todo)=> <TodoItem todo={todo} deleteTodo={deleteTodo} completeTodo={completeTodo} key={todo.id}/>)} 
    </ul>
  );
}

export default TodoList;