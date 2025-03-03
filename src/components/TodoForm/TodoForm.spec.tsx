import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import TodoForm from './TodoForm';

const addTodo = jest.fn()

it('renders input and button', () => {
  render(<TodoForm addTodo={addTodo}/>);

    const inputEl = screen.getByTestId("text-input");
    expect(inputEl).toBeInTheDocument();
    expect(inputEl).toHaveAttribute("type", "text");

    const buttonB1 = screen.getByRole('button', { name: /Add task/i })
    expect(buttonB1).toBeInTheDocument();
});

it('execute add task button with task text', async () => {
    render(<TodoForm addTodo={addTodo}/>);
  
      const inputEl = screen.getByTestId("text-input");
      expect(inputEl).toBeInTheDocument();
      expect(inputEl).toHaveAttribute("type", "text");

      const buttonB1 = screen.getByRole('button', { name: /Add task/i })
      expect(buttonB1).toBeInTheDocument();
      
      userEvent.type(inputEl, 'Task1')
      userEvent.click(buttonB1)

      await waitFor(() => {
        expect(addTodo).toBeCalledTimes(1)
      })
});

it('does not execute add task button without task text', async () => {
    render(<TodoForm addTodo={addTodo}/>);
  
      const inputEl = screen.getByTestId("text-input");
      expect(inputEl).toBeInTheDocument();
      expect(inputEl).toHaveAttribute("type", "text");

      const buttonB1 = screen.getByRole('button', { name: /Add task/i });
      expect(buttonB1).toBeInTheDocument();
      
      userEvent.type(inputEl, '');
      userEvent.click(buttonB1);

      await waitFor(() => {
        expect(addTodo).not.toBeCalled();
      })
});