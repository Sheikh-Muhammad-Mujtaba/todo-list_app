"use client";

import { useState, useEffect, ChangeEvent, KeyboardEvent } from "react";
import { Plus, Pencil, Trash2, Check, X } from 'lucide-react'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";


interface Task {
    id: number;
    text: string;
    completed: boolean;
}


export default function TaskList() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState<string>("");
    const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
    const [editedTaskText, setEditedTaskText] = useState<string>("");
    const [isMounted, setIsMounted] = useState<boolean>(false);

    useEffect(() => {
        setIsMounted(true);
        const savedTasks = localStorage.getItem("tasks");
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks) as Task[]);
        }
    }, []);

    useEffect(() => {
        if (isMounted) {
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
    }, [tasks, isMounted]);



    const addTask = (): void => {
        if (newTask.trim() !== "") {
            setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
            setNewTask("");
        }
    };


    const toggleTaskCompletion = (id: number): void => {
        setTasks(
            tasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };



    const startEditingTask = (id: number, text: string): void => {
        setEditingTaskId(id);
        setEditedTaskText(text);
    }


    const updateTask = (): void => {
        if (editedTaskText.trim() !== "") {
            setTasks(
                tasks.map((task) =>
                    task.id === editingTaskId ? { ...task, text: editedTaskText } : task
                )
            );
            setEditingTaskId(null);
            setEditedTaskText("");
        }
    };


    const deleteTask = (id: number): void => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 p-4">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200 text-center">
                    Todo List
                </h1>
                <div className="flex items-center mb-4">
                    <Input
                        type="text"
                        placeholder="Add a new task"
                        value={newTask}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setNewTask(e.target.value)}
                        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                            if (e.key === "Enter") addTask()
                        }}
                        className="flex-1 mr-2 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                    />
                    <div className="relative group">

                        <Button
                            onClick={addTask}
                            size="icon"
                            className="bg-black hover:bg-slate-800 text-white font-medium py-2 px-4 rounded-md shrink-0"
                        >
                            <Plus className="h-4 w-4" />
                        </Button>
                        <div className="absolute left-1/2 transform -translate-x-1/2 top-[-40px] w-max bg-gray-800 text-white text-sm py-1 px-3 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                            Add task
                        </div>
                    </div>
                </div>
                <div className="space-y-2">
                    {tasks.map((task) => (
                        <div
                            key={task.id}
                            className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 rounded-lg p-2 transition-all duration-200 ease-in-out hover:shadow-md"
                        >
                            <div className="flex items-center space-x-2 flex-1">
                                <div className="relative group">
                                    <Checkbox
                                        checked={task.completed}
                                        className="shrink-0"
                                        onCheckedChange={() => toggleTaskCompletion(task.id)}
                                    />
                                    <div className="absolute left-1/2 transform -translate-x-1/2 top-[-40px] w-max bg-gray-800 text-white text-sm py-1 px-3 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                                        {task.completed ? "Uncheck" : "Check"}
                                    </div>
                                </div>
                                {editingTaskId === task.id ? (
                                    <Input
                                        type="text"
                                        value={editedTaskText}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => setEditedTaskText(e.target.value)}
                                        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                                            if (e.key === "Enter") {
                                                updateTask();
                                            }
                                            if (e.key === "Escape") setEditingTaskId(null)

                                        }}
                                        className="flex-1 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
                                    />
                                ) : (
                                    <span
                                        className={`flex-1 transition-all duration-200  ${task.completed
                                            ? "line-through text-gray-500 dark:text-gray-400"
                                            : "text-gray-800 dark:text-gray-200"
                                            }`}
                                    >
                                        {task.text}
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center space-x-1">
                                {editingTaskId === task.id ? (
                                    <>
                                        <div className="relative group">
                                            <Button
                                                onClick={updateTask}
                                                size="icon" variant="ghost"
                                                className=" bg-black hover:bg-slate-800 text-white font-medium py-1 px-2 rounded-md mx-2"
                                            >
                                                <Check className="h-4 w-4" />
                                            </Button>
                                            <div className="absolute left-1/2 transform -translate-x-1/2 top-[-40px] w-max bg-gray-800 text-white text-sm py-1 px-3 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                                                Save
                                            </div>
                                        </div>
                                        <div className="relative group">
                                            <Button onClick={() => setEditingTaskId(null)} size="icon" variant="ghost">
                                                <X className="h-4 w-4" />
                                            </Button>
                                            <div className="absolute left-1/2 transform -translate-x-1/2 top-[-40px] w-max bg-gray-800 text-white text-sm py-1 px-3 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                                                Cancel
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="relative group">

                                        <Button
                                            onClick={() => startEditingTask(task.id, task.text)}
                                            size="icon" variant="ghost"
                                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-gray-200 font-medium py-1 px-2 rounded-md mr-2"
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <div className="absolute left-1/2 transform -translate-x-1/2 top-[-40px] w-max bg-gray-800 text-white text-sm py-1 px-3 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                                            Edit
                                        </div>
                                    </div>
                                )}
                                <div className="relative group">
                                    <Button
                                        onClick={() => deleteTask(task.id)}
                                        size="icon" variant="ghost"
                                        className="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-2 rounded-md"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                    <div className="absolute left-1/2 transform -translate-x-1/2 top-[-40px] w-max bg-gray-800 text-white text-sm py-1 px-3 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                                        Delete
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}