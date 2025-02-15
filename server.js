import React, { useState } from "react";

// TodoItem component
function TodoItem({ todo, index, onDelete, onToggleComplete }) {
  return (
    <div style={{ marginBottom: "10px" }}>
      <input
        type="checkbox"
        checked={todo.complete}
        onChange={() => onToggleComplete(index)}
      />
      <span style={{ textDecoration: todo.complete ? "line-through" : "none" }}>
        {todo.text}
      </span>
      <button
        onClick={() => onDelete(index)}
        disabled={!todo.complete}
        style={{ marginLeft: "10px" }}
      >
        Delete
      </button>
    </div>
  );
}

// App component
function App() {
  const [todos, setTodos] = useState([
    { text: "Find that missing sock", complete: false },
    { text: "Finish homework", complete: false },
    { text: "Go grocery shopping", complete: false },
  ]);

  // Function to toggle completeness of the todo
  const handleToggleComplete = (index) => {
    const newTodos = [...todos];
    newTodos[index].complete = !newTodos[index].complete;
    setTodos(newTodos);
  };

  // Function to delete a todo
  const handleDelete = (index) => {
    const newTodos = todos.filter((todo, i) => i !== index);
    setTodos(newTodos);
  };

  return (
    <div>
      <h1>Todo List</h1>
      {todos.map((todo, index) => (
        <TodoItem
          key={index}
          index={index}
          todo={todo}
          onDelete={handleDelete}
          onToggleComplete={handleToggleComplete}
        />
      ))}
    </div>
  );
}

export default App;
