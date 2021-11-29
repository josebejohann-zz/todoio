import {
  useState, useEffect, useRef, ChangeEvent, FormEvent,
} from 'react';
import { ITodo } from '../types/Todo'

import '../styles/TodoForm.scss'

interface TodoFormProps {
  edit?: {
    id: null | number;
    value: string;
  };
  onSubmit: ({ id, value }: ITodo) => void;
}

const TodoForm = function ({ edit, onSubmit }: TodoFormProps) {
  const [input, setInput] = useState(edit ? edit.value : '');

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current!.focus();
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    onSubmit({
      id: Math.floor(Math.random() * 10000),
      value: input,
    });

    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      {edit ? (
        <>
          <input
            placeholder="Update your item"
            value={input}
            onChange={handleChange}
            name="text"
            ref={inputRef}
            className="todo-input edit"
          />
          <button onClick={handleSubmit} className="todo-button edit">
            Update
          </button>
        </>
      ) : (
        <>
          <input
            placeholder="Add a todo"
            value={input}
            onChange={handleChange}
            name="text"
            className="todo-input"
            ref={inputRef}
          />
          <button onClick={handleSubmit} className="todo-button">
            Add todo
          </button>
        </>
      )}
    </form>
  );
};

export default TodoForm;
