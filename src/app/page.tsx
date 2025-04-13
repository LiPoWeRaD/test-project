"use client";

import TaskList from "./components/TaskList";
import { useEffect, useState } from "react";
import { Task } from "./types/task";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const savedTasks = localStorage.getItem('tasks');
        
        if (savedTasks) {
          setTasks(JSON.parse(savedTasks));
        } else {
          const response = await fetch('/tasks.json');
          const data = await response.json();
          setTasks(data);
        }
      } catch (error) {
        setError(true);
        console.error('Ошибка при загрузке задач:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Произошла ошибка при загрузке задач.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-600 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <TaskList Tasks={tasks} />
      </div>
    </div>
  );
}
