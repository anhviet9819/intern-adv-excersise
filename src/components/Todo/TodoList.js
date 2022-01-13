import React, { useState, useEffect } from "react";
import Todo from "./Todo";
import TodoForm from "./TodoForm";
import * as todoApi from "../../service/todoApi";

const token = localStorage.getItem('token');

function TodoList() {
  const [todos, setTodos] = useState([]);

//   useEffect(() => {
//       const getTodos = async() => {
//         try{
//             const todoData = await todoApi.getTodos(token);
//             setTodos(todoData);
//         }catch(error){
//             console.log(error);
//         }
//       }
//       getTodos();
//   }, [todos]);

  const addTodo = async (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }
        try{
            await todoApi.addTodo(todo, token);
            const newTodos = [todo, ...todos];

            setTodos(newTodos);
            console.log(todo, ...todos); // todos o day chua cap nhat lai sau buoc setState o tren
        }catch(error){
            console.log(error);
        }
    }

  const completeTodo = (id) => {
    let updateTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updateTodos);
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    setTodos((prev) =>
      prev.map((item) => (item.id === todoId ? newValue : item))
    );
  };

  const removeTodo = (id) => {
    const removeArr = [...todos].filter((todo) => {
      return todo.id !== id; // Nhung todo.id nao khac id duoc chon thi duoc giu lai, khong thi se bi xoa
    });

    setTodos(removeArr);
  };

  return (
    <div>
      <h1>What's the Plan for Today?</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </div>
  );
}

export default TodoList;
