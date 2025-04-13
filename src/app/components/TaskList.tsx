import { useState, useEffect, FC } from 'react';
import { Task } from '../types/task';

interface TaskListProps {
  Tasks: Task[];
}

const TaskList: FC<TaskListProps> = ({ Tasks }) => {
  const [tasks, setTasks] = useState<Task[]>(Tasks);

  // Сохраняем задачи в localStorage при изменении
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, done: !task.done } : task
    ));
  };

  return (
    <div className="max-w-md mx-auto bg-gray-400 rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Список задач</h2>
        <ul className="space-y-4">
          {tasks.map(task => (
            <li key={task.id} className="flex items-center">
              <input type="checkbox" checked={task.done}
                     onChange={() => toggleTask(task.id)}
                     className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className={`ml-3 text-lg ${task.done ? 'line-through text-gray-700' : 'text-white'}`}>
                {task.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskList;