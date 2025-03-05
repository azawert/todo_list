import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

interface ITodo {
  isDone: boolean;
  description: string;
  id: string;
}

export default function TodoList() {
  const [text, setText] = useState<string>(() => '');
  const [items, setItems] = useState<ITodo[]>([]);

  const handleAddTodo = (event: React.FormEvent<HTMLFormElement>, text: string): void => {
    event.preventDefault();
    const toDo: ITodo = {
      isDone: false,
      description: text,
      id: uuidv4(),
    };
    setItems((prev) => [...prev, toDo]);
    setText('');
  };

  const handleChangeText = (text: string) => {
    setText(text);
  };

  const handleDeleteTodo = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleIsDoneToggle = (id: string) => {
    setItems(
      items
        .map((item) => (item.id === id ? { ...item, isDone: !item.isDone } : item))
        .sort((a, b) => (a.isDone === b.isDone ? 0 : a.isDone === true ? 1 : -1)),
    );
  };
  console.log(items);

  return (
    <div className='todo-list'>
      <h1 className='title'>Todo app</h1>
      <form className='form' onSubmit={(e) => handleAddTodo(e, text)}>
        <input
          type='text'
          placeholder='What needs to be done?'
          className='input'
          onChange={(e) => handleChangeText(e.target.value)}
          value={text}
        />
        <button type='submit' className='add-button'>
          <span className='plus-icon'>+</span> Add Task
        </button>
      </form>

      <div className='todos-container'>
        {items.map((item) => (
          <div key={item.id} className={`todo-item ${item.isDone === true ? 'completed' : ''}`}>
            <div className='checkbox-wrapper' onClick={() => handleIsDoneToggle(item.id)}>
              <input type='checkbox' />
              <div className={`checkbox ${item.isDone ? 'checked' : ''}`}>
                {item.isDone && (
                  <svg className='checkmark' viewBox='0 0 12 10'>
                    <polyline points='1.5 6 4.5 9 10.5 1' />
                  </svg>
                )}
              </div>
            </div>
            <span className='todo-text'>{item.description}</span>
            <button className='delete-button' onClick={() => handleDeleteTodo(item.id)}>
              ×
            </button>

            <button className='edit-button'>Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
}
