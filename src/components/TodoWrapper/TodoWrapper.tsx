import React, { useEffect, useState } from 'react';

import { Todo } from '../../types';
import TodoForm from '../TodoForm/TodoForm';
import TodoList from '../TodoList/TodoList';


type Status  = 'Active' | 'All' | 'Completed'
const  TodoWrapper = () => {

  const [filterBy, setFilterBy] = useState<Status>('All')
  const [todoList, setTodoList] = useState<Array<Todo>>([])
  const [filteredTodos, setFilteredTodos] = useState<Array<Todo>>([])

  const addTodo = (todo: Todo) => {
    setTodoList([...todoList, todo])
  }

  const deleteTodo = (id: number) => {
    setTodoList(todoList.filter((todo) => todo.id!==id))
  }

  const completeTodo = (id: number) => {
    const completedTodo: Todo = todoList.filter((todo) => todo.id===id)[0];
    completedTodo.isCompleted = true;
    const uncompletedTodo = todoList.filter((todo) => todo.id!==id)
    setTodoList([...uncompletedTodo, completedTodo])
  }

  useEffect(() => {
    filterBy === 'Active' ? 
      setFilteredTodos(todoList.filter((todo) => todo.isCompleted!==true))
      :
        filterBy === 'Completed' ?  
          setFilteredTodos(todoList.filter((todo) => todo.isCompleted===true))
          :
          setFilteredTodos(todoList)
  }, [filterBy, todoList])

  return (
      <div className='todo-wrapper' >      
        <TodoForm addTodo={(todo: Todo) => addTodo(todo)}/> 
        <div className='todo-status-wrapper'>       
          <button className={'todo-status-toggle'} onClick={() => setFilterBy('Active')}>Active</button>
          <button className={'todo-status-toggle'} onClick={() => setFilterBy('Completed')}>Completed</button>
          <button className={'todo-status-toggle'} onClick={() => setFilterBy('All')}>All</button>
        </div>
        <TodoList todos={filteredTodos} deleteTodo={deleteTodo} completeTodo={completeTodo}/>
      </div> 
  );
}

export default TodoWrapper;
