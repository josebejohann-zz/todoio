import { useState } from 'react'
import { ITodo } from '../types/Todo'
import TodoForm from './TodoForm'
import { RiCloseCircleLine } from 'react-icons/ri'
import { TiEdit } from 'react-icons/ti'

import '../styles/Todo.scss'

interface TodoProps {
  todos: ITodo[];
  completeTodo: (id: null | number) => void;
  removeTodo: (id: null | number) => void;
  updateTodo: (id: null | number, value: { id: null | number, value: string }) => void;
}

export const Todo = ({ todos, completeTodo, removeTodo, updateTodo }: TodoProps) => {
  const [edit, setEdit] = useState<ITodo>({
    id: null,
    value: ''
  })

  const submitUpdate = (value: ITodo) => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: ''
    })
  }

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />
  }

  return (
    <>
      {todos.map((todo, index) => (
        <div
          className={todo.isComplete ? 'todo complete' : 'todo'}
          key={index}
        >
          <div key={todo.id} onClick={() => completeTodo(todo.id)}>
            {todo.value}
          </div>

          <div className='icons'>
            <RiCloseCircleLine
              onClick={() => removeTodo(todo.id)}
            />
            <TiEdit
              onClick={() => setEdit({ id: todo.id, value: todo.value })}
            />
          </div>
        </div>
      ))}
    </>
  )
}