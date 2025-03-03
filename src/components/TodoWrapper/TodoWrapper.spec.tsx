import React from 'react';

import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import TodoWrapper from './TodoWrapper';
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

it('execute add task button with multiple tasks and filters the active todo', async () => {
    render(<TodoWrapper />);
  
      const inputEl = screen.getByTestId("text-input");
      expect(inputEl).toBeInTheDocument();
      expect(inputEl).toHaveAttribute("type", "text");

      const buttonB1 = screen.getByRole('button', { name: /Add task/i })
      expect(buttonB1).toBeInTheDocument();
      
      //adds task 1
      userEvent.type(inputEl, 'Task1')
      userEvent.click(buttonB1)
    
      //adds task 2
      userEvent.type(inputEl, 'Task2')
      userEvent.click(buttonB1)

      //adds task 3
      userEvent.type(inputEl, 'Task3')
      userEvent.click(buttonB1)

      expect(screen.getByText('Task1')).toBeInTheDocument();
      expect(screen.getByText('Task2')).toBeInTheDocument();
      expect(screen.getByText('Task3')).toBeInTheDocument();
      expect(screen.getAllByTestId('todo-item-delete').length).toBe(3)
      expect(screen.getAllByTestId('todo-item-complete').length).toBe(3)

      //completes task 1
      userEvent.click(screen.getAllByTestId('todo-item-complete')[0])

      //filterby active todos
      userEvent.click(screen.getByText('Active'))

      //displaying only active todos
      await waitFor(() => {
        expect(screen.getAllByTestId('todo-item-delete').length).toBe(2)
      })

      userEvent.click(screen.getByText('Completed'))

      //displaying only completed todos
      await waitFor(() => {
        expect(screen.getAllByTestId('todo-item-delete').length).toBe(1)
      })

      userEvent.click(screen.getByText('All'))

      //displaying all todos
      await waitFor(() => {
        expect(screen.getAllByTestId('todo-item-delete').length).toBe(3)
      })

      //delete Todo
      userEvent.click(screen.getAllByTestId('todo-item-delete')[0])

      //displaying todos
      await waitFor(() => {
        expect(screen.getAllByTestId('todo-item-delete').length).toBe(2)
      })
});
