import React, { useState } from "react";

function TodoForm({ addTask }) {
  const [userInput, setUserInput] = useState<string>("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addTask(userInput);
    setUserInput("");
  };
  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        className="todo-input"
        type="text"
        placeholder="Add a new task..."
        onChange={handleChange}
        value={userInput}
      />
      <button className="todo-button">Save</button>
    </form>
  );
}

export default TodoForm;
