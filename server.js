import React, { useState } from "react";

// TodoItem component
function TodoItem({
  todo,
  index,
  onDelete,
  onToggleComplete,
  onEdit,
  isEditing,
  onSaveEdit,
}) {
  const [newText, setNewText] = useState(todo.text);

  const handleChange = (e) => {
    setNewText(e.target.value);
  };

  return (
    <div style={{ marginBottom: "10px" }}>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={newText}
            onChange={handleChange}
            style={{ marginRight: "10px" }}
          />
          <button
            onClick={() => onSaveEdit(index, newText)}
            style={{ marginRight: "10px" }}
          >
            Save
          </button>
        </div>
      ) : (
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type="checkbox"
            checked={todo.complete}
            onChange={() => onToggleComplete(index)}
          />
          <span
            style={{ textDecoration: todo.complete ? "line-through" : "none" }}
          >
            {todo.text}
          </span>
          <button
            onClick={() => onDelete(index)}
            disabled={!todo.complete}
            style={{ marginLeft: "10px" }}
          >
            Delete
          </button>
          <button onClick={() => onEdit(index)} style={{ marginLeft: "10px" }}>
            Edit
          </button>
        </div>
      )}
    </div>
  );
}

// App component
function App() {
  const [todos, setTodos] = useState([
    { text: "Find that missing sock", complete: false, isEditing: false },
    { text: "Finish homework", complete: false, isEditing: false },
    { text: "Go grocery shopping", complete: false, isEditing: false },
  ]);

  const [newTodoText, setNewTodoText] = useState("");

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

  // Function to start editing a todo
  const handleEdit = (index) => {
    const newTodos = [...todos];
    newTodos[index].isEditing = true;
    setTodos(newTodos);
  };

  // Function to save edited todo
  const handleSaveEdit = (index, newText) => {
    const newTodos = [...todos];
    newTodos[index].text = newText;
    newTodos[index].isEditing = false;
    setTodos(newTodos);
  };

  // Function to add a new todo
  const handleAddTodo = () => {
    if (newTodoText.trim() !== "") {
      const newTodo = {
        text: newTodoText,
        complete: false,
        isEditing: false,
      };
      setTodos([newTodo, ...todos]); // Add to the top of the list
      setNewTodoText(""); // Clear the input field
    }
  };

  return (
    <div>
      <h1>Todo List</h1>

      {/* Input for adding new todo */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="Add new todo"
        />
        <button onClick={handleAddTodo} style={{ marginLeft: "10px" }}>
          Add Todo
        </button>
      </div>

      {/* Display todos */}
      {todos.map((todo, index) => (
        <TodoItem
          key={index}
          index={index}
          todo={todo}
          onDelete={handleDelete}
          onToggleComplete={handleToggleComplete}
          onEdit={handleEdit}
          isEditing={todo.isEditing}
          onSaveEdit={handleSaveEdit}
        />
      ))}
    </div>
  );
}

export default App;
