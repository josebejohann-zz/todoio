import { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import { Todo } from './Todo';
import { ITodo } from '../types/Todo';

import '../styles/TodoList.scss'

function TodoList() {
  const [todos, setTodos] = useState<ITodo[]>([]);

  useEffect(() => {
    const storagedTodos = localStorage.getItem('todos')

    if (storagedTodos) {
      setTodos(JSON.parse(storagedTodos))
    }
  }, [])

  const createTodo = (todo: ITodo) => {
    if (!todo.value || /^\s*$/.test(todo.value)) {
      return;
    }

    const newTodo = [todo, ...todos];

    setTodos(newTodo);

    localStorage.setItem('todos', JSON.stringify(newTodo))
  };

  const updateTodo = (todoId: null | number, newValue: { id: null | number, value: string }) => {
    if (!newValue.value || /^\s*$/.test(newValue.value)) {
      return;
    }

    setTodos((previousTodos: ITodo[]) => {
      const updatedTodos = previousTodos.map((item: ITodo) => (item.id === todoId ? newValue : item))

      localStorage.setItem('todos', JSON.stringify(updatedTodos))

      return updatedTodos
    });
  };

  const removeTodo = (id: null | number) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);

    setTodos(updatedTodos);

    localStorage.setItem('todos', JSON.stringify(updatedTodos))
  };

  const completeTodo = (id: null | number) => {
    let updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      
      return todo;
    });

    setTodos(updatedTodos);
  };

  return (
    <main>
      <h1>What is in your focus today?</h1>
      <TodoForm onSubmit={createTodo} />

      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </main>
  );
}

export default TodoList;