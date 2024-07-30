import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import { Task } from "@/app/types";

const collectionName = "tasks";

// Get all todos
export const getAllTodos = async (): Promise<Task[]> => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    text: doc.data().text,
    progress: doc.data().progress,
    dueDate: doc.data().dueDate,
  }));
};

// Add todo
export const addTodo = async (todo: Task): Promise<Task> => {
  const docRef = await addDoc(collection(db, collectionName), todo);
  return { ...todo, id: docRef.id };
};

// Edit todo
export const editTodo = async (
  id: string,
  newText: string,
  newProgress: number,
  newDueDate: Date
): Promise<Task> => {
  const todoRef = doc(db, collectionName, id);
  const updateData = {
    text: newText,
    progress: newProgress,
    dueDate: newDueDate.toISOString(),
  };
  await updateDoc(todoRef, updateData);
  return { id, text: newText, progress: newProgress, dueDate: newDueDate.toISOString() };
};

// Delete todo
export const deleteTodo = async (id: string): Promise<void> => {
  const todoRef = doc(db, collectionName, id);
  await deleteDoc(todoRef);
};