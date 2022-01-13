export const getTodos = async (token) => {
  try {
    const response = fetch(`https://mvn-task-manager.work/api/tasks?limit=10&page=1`,{
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return error.message;
  }
};

export const getTodoById = async (id, token) => {
  try {
    const response = fetch(`https://mvn-task-manager.work/api/tasks/${id}`,{
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return error.message;
  }
};

export const addTodo = async (data, token) => {
  try {
    const url = "https://mvn-task-manager.work/api/tasks";
    const response = fetch(url, data, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response;
  } catch (error) {
    return error.message;
  }
};

export const updateTodo = async (id, data, token) => {
  try {
    const url = `https://mvn-task-manager.work/api/tasks/${id}`;
    const response = fetch(url, data, {
        method: "PATCH",
        headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return error.message;
  }
};

export const deleteTodo = async (id, token) => {
  try {
    const url = `https://mvn-task-manager.work/api/tasks/${id}`;
    const response = fetch(url, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response;
  } catch (error) {
    return error.message;
  }
};
