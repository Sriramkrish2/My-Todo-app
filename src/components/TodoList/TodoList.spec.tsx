import React from 'react';

import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import TodoList from './TodoList';
import { Todo } from '../../types';

const completeTodo = jest.fn();
const deleteTodo = jest.fn();

const todos: Array<Todo> = [
    {
        id: Math.random(),
        title: 'Task1',
        isCompleted: false
    },
    {
        id: Math.random(),
        title: 'Task2',
        isCompleted: true
    }
]

it('renders list and list items', () => {
  render(<TodoList completeTodo={completeTodo} deleteTodo={deleteTodo} todos={todos}/>);

    const todoList = screen.getByRole('list')

    const { getAllByRole } = within(todoList)
    const items = getAllByRole("listitem")
    expect(items.length).toBe(2)
});
