import React, { useState } from 'react';

import { Todo } from '../../types';
import  './TodoForm.module.scss';

type TodoFormProps = {
  addTodo: (todo: Todo) => void
}

const TodoForm: React.FC<TodoFormProps> = ({ addTodo }: TodoFormProps) => {
  
  const [task, setTask] = useState<string>('')

  const toDoHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTask(event.target.value)
  }

  const addTodoItem = (event: React.FormEvent<HTMLFormElement>) => { 
    event.preventDefault()
    const trimmedTask = task.trim()
    const todoItem: Todo = {
      id: Math.random(),
      title: trimmedTask,
      isCompleted: false,
    }
    if(trimmedTask!==''){
      addTodo(todoItem)
      setTask('')
    }
  }

  return (
    <form onSubmit={addTodoItem} className={'todo-form'}>
        <input type='text' placeholder='Add a new task' onChange={toDoHandler} value={task} data-testid="text-input"/>
        <button type='submit'>Add task</button>
    </form>
  );
}

export default TodoForm;