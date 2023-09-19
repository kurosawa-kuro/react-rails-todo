import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    fetch("http://localhost:3001/todos")
      .then(response => response.json())
      .then(data => setTodos(data));
  }, []);

  const handleAddTodo = () => {
    fetch("http://localhost:3001/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        todo: {
          title: title
        }
      })
    })
      .then(response => response.json())
      .then(data => setTodos(prevTodos => [...prevTodos, data]));

    setTitle('');
  };

  return (
    <div className="App">
      <div className="input">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Todo title"
        />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
