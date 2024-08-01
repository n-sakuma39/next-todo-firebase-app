import { Task } from "@/app/types";

const STORAGE_KEY = "todos";
const USER_STORAGE_KEY = "users";

export const getTodos = (): Task[] => {
  if (typeof window !== "undefined") {
    const todos = localStorage.getItem(STORAGE_KEY);
    return todos ? JSON.parse(todos) : [];
  }
  return [];
};

export const saveTodos = (todos: Task[]): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }
};

export const addTodo = (todo: Task): Task => {
  const todos = getTodos();
  const newTodo = { ...todo, createdAt: Date.now() };
  todos.push(newTodo);
  saveTodos(todos);
  return newTodo;
};

export const updateTodo = (updatedTodo: Task): Task => {
  const todos = getTodos();
  const index = todos.findIndex((todo) => todo.id === updatedTodo.id);
  if (index !== -1) {
    todos[index] = updatedTodo;
    saveTodos(todos);
  }
  return updatedTodo;
};

export const deleteTodo = (id: string): void => {
  const todos = getTodos();
  const filteredTodos = todos.filter((todo) => todo.id !== id);
  saveTodos(filteredTodos);
};

export const getUsers = (): any[] => {
  if (typeof window !== 'undefined') {
    const users = localStorage.getItem(USER_STORAGE_KEY);
    const parsedUsers = users ? JSON.parse(users) : [];
    console.log("All users from localStorage:", parsedUsers);
    return parsedUsers;
  }
  return [];
};

export const addUser = (user: any): void => {
  const users = getUsers();
  users.push(user);
  if (typeof window !== "undefined") {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(users));
  }
};

export const getUser = (email: string): any | undefined => {
  const users = getUsers();
  console.log("Searching for user with email:", email);
  const user = users.find(user => user.email === email);
  console.log("Found user:", user);
  return user;
};