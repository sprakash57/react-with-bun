import React, { useState } from "react";

type Todo = {
  id: number;
  text: string;
  done: boolean;
};

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoInput, setTodoInput] = useState("");
  const [selectedTodo, setSelectedTodo] = useState<Todo | undefined>();
  const [noInputError, setNoInputError] = useState(false);

  const handleSave = () => {
    if (selectedTodo) {
      setTodos((prev) =>
        prev.map((item) => {
          if (item.id === selectedTodo.id)
            return { ...item, text: todoInput, done: false };
          return item;
        })
      );
      setSelectedTodo(undefined);
    } else {
      if (todoInput) {
        setNoInputError(false);
        setTodos((prev) => [
          { id: new Date().getTime(), text: todoInput, done: false },
          ...prev,
        ]);
      } else {
        setNoInputError(true);
      }
    }
    setTodoInput("");
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    handleSave();
  };

  const handleDone = (id: number) => {
    setTodos((prev) =>
      prev.map((item) => {
        if (item.id === id) return { ...item, done: !item.done };
        return item;
      }));
  };

  const handleDelete = (id: number) => {
    setTodos((prev) =>
      prev.reduce((allTodos, current) => {
        if (current.id !== id) allTodos.push(current);
        return allTodos;
      }, [] as Todo[])
    );
    setTodoInput('');
    setSelectedTodo(undefined)
  };

  const handleUpdate = (id: number) => {
    const selectedTodo = todos.find((item) => item.id === id);
    setTodoInput(selectedTodo?.text as string);
    setSelectedTodo(selectedTodo);
  };
  console.log({ todos, selectedTodo })
  return (
    <main style={{ display: "flex", flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form onSubmit={handleSubmit} style={{ display: "flex", placeItems: 'center', gap: '1rem' }}>
        <div style={{ display: "flex", flexDirection: 'column', width: '300px' }}>
          <input
            type="text"
            placeholder="Add todo"
            name="todo"
            value={todoInput}
            onChange={(e) => setTodoInput(e.target.value)}
          />
          {noInputError && <small style={{ color: 'red' }}>Invalid input</small>}
        </div>
        <button style={{ alignSelf: 'flex-start' }} type="submit">{selectedTodo ? "Update" : "Add"}</button>
      </form>
      <ul>
        {todos.map(({ id, text, done }) => (
          <div key={String(id)} style={{ display: "flex", gap: "2rem" }}>
            {selectedTodo?.id === id && !selectedTodo.done ? (
              <>
                <input
                  type="text"
                  value={todoInput || selectedTodo.text}
                  onChange={(e) => setTodoInput(e.target.value)}
                />
                <button type="button" onClick={() => setSelectedTodo(undefined)}>Cancel</button>
                <button type="button" onClick={handleSave}>Save</button>
              </>
            ) : (
              <>
                <li
                  style={{
                    textDecoration: done
                      ? "line-through solid red 2px"
                      : "initial",
                    cursor: "pointer",
                  }}
                  onClick={() => handleDone(id)}
                >
                  {text}
                </li>
              </>
            )}
            <button onClick={() => handleDelete(id)}>X</button>
            {!selectedTodo && !done && <button onClick={() => handleUpdate(id)}>/</button>}
          </div>
        ))}
      </ul>
    </main>
  );
}

export default App;
