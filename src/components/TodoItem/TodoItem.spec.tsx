import React from 'react';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import TodoItem from './TodoItem';
import { Todo } from '../../types';

const completeTodo = jest.fn();
const deleteTodo = jest.fn();

const todo: Todo = {
    id: Math.random(),
    title: 'Task1',
    isCompleted: false
}

it('renders todo item', () => {
  render(<TodoItem completeTodo={completeTodo} deleteTodo={deleteTodo} todo={todo}/>);

  expect(screen.getByText(todo.title)).toBeInTheDocument();

  expect(screen.getByTestId('todo-item-delete')).toBeInTheDocument()
  expect(screen.getByTestId('todo-item-complete')).toBeInTheDocument()

});

it('executes delete todo item', async () => {
    render(<TodoItem completeTodo={completeTodo} deleteTodo={deleteTodo} todo={todo}/>);
  
    expect(screen.getByText(todo.title)).toBeInTheDocument();
  
    const deleteIcon = screen.getByTestId('todo-item-delete');
    userEvent.click(deleteIcon)

    await waitFor(() => {
        expect(deleteTodo).toBeCalledTimes(1);
    })
  
});

it('executes complete todo item', async () => {
    render(<TodoItem completeTodo={completeTodo} deleteTodo={deleteTodo} todo={todo}/>);
  
    expect(screen.getByText(todo.title)).toBeInTheDocument();
  
    const deleteIcon = screen.getByTestId('todo-item-complete');
    userEvent.click(deleteIcon)

    await waitFor(() => {
        expect(completeTodo).toBeCalledTimes(1);
    })
  
});
