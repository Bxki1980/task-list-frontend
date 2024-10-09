// src/components/TaskList.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken, removeToken } from '../utils/auth';
import '../styles/taskList.css';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedIds, setSelectedIds] = useState([]);
    const [editingTask, setEditingTask] = useState(null);
    const [newTask, setNewTask] = useState({ task: '', startDate: '', deadline: '', status: '' });
    const [showCreateForm, setShowCreateForm] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        fetchTasks();
    }, [searchTerm]);

    const fetchTasks = async () => {
        const token = getToken();
        console.log('Retrieved token:', token);

        if (!token) {
            navigate('/login');
            return;
        }
    
        try {
            let url = 'https://localhost:7071/api/Task/GetAll';
            if (searchTerm) {
                url = `https://localhost:7071/api/Task/Search?query=${encodeURIComponent(searchTerm)}`;
            }
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setTasks(data);
            } else if (response.status === 401) {
                // Token might be invalid or expired
                removeToken();
                navigate('/login');
            } else {
                setError('Failed to fetch tasks.');
            }
        } catch (err) {
            setError('An error occurred while fetching tasks.');
            console.error('Error fetching tasks:', err);
        }
    };
      

    const handleDelete = async () => {
        const token = getToken();
        if (!token) {
            navigate('/login');
            return;
        }

        try {
            for (let id of selectedIds) {
                const response = await fetch(`https://localhost:7071/api/Task/Delete/${id}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error(`Failed to delete task with ID: ${id}`);
                }
            }
            fetchTasks();
            setSelectedIds([]);
        } catch (error) {
            setError('Error deleting tasks. Please try again.');
            console.error('Error deleting tasks:', error);
        }
    };

    const handleCheckboxChange = (id) => {
        setSelectedIds((prevSelectedIds) =>
            prevSelectedIds.includes(id)
                ? prevSelectedIds.filter((selectedId) => selectedId !== id)
                : [...prevSelectedIds, id]
        );
    };

    const handleEditClick = () => {
        if (selectedIds.length === 1) {
            const taskToEdit = tasks.find((task) => task.id === selectedIds[0]);
            setEditingTask(taskToEdit);
        } else {
            alert('Please select exactly one task to edit.');
        }
    };

    const handleUpdateTask = async (e) => {
        e.preventDefault();
        const token = getToken();
        if (!token) {
            navigate('/login');
            return;
        }

        try {
            const { id, task, startDate, deadline, status } = editingTask;

            const response = await fetch(`https://localhost:7071/api/Task/UpdateTask/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ task, startDate, deadline, status }),
            });

            if (response.ok) {
                fetchTasks();
                setEditingTask(null);
                setSelectedIds([]);
            } else if (response.status === 401) {
                removeToken();
                navigate('/login');
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Failed to update task.');
            }
        } catch (error) {
            setError('Error updating task. Please try again.');
            console.error('Error updating task:', error);
        }
    };

    const handleCreateTask = async (e) => {
        e.preventDefault();
        const token = getToken();
        if (!token) {
            navigate('/login');
            return;
        }
    
        try {
            const { task, startDate, deadline, status } = newTask;
    
            // Include the parameters as query strings in the URL
            const response = await fetch(`https://localhost:7071/api/Task/CreateNewTask?task=${encodeURIComponent(task)}&startDate=${encodeURIComponent(startDate)}&deadline=${encodeURIComponent(deadline)}&status=${encodeURIComponent(status)}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            if (response.ok) {
                fetchTasks();
                setNewTask({ task: '', startDate: '', deadline: '', status: '' });
                setShowCreateForm(false);
            } else if (response.status === 401) {
                removeToken();
                navigate('/login');
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Failed to create task.');
            }
        } catch (error) {
            setError('An error occurred while creating the task.');
            console.error('Error creating task:', error);
        }
    };
    

    return (
        <div className="task-list-container">
            <div className="tools">
                <div className="searchbox">
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="actions">
                    <button onClick={() => setShowCreateForm(!showCreateForm)}>
                        {showCreateForm ? 'Cancel' : 'Create New Task'}
                    </button>
                    <button onClick={handleDelete} disabled={selectedIds.length === 0}>
                        Delete Selected
                    </button>
                    <button onClick={handleEditClick} disabled={selectedIds.length !== 1}>
                        Edit Selected
                    </button>
                </div>
            </div>

            {error && <p className="error">{error}</p>}

            <div className="tasks">
                <table className="task-table">
                    <thead>
                        <tr>
                            <th>Select</th>
                            <th>Task</th>
                            <th>Start Date</th>
                            <th>Deadline</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task) => (
                            <tr key={task.id}>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={selectedIds.includes(task.id)}
                                        onChange={() => handleCheckboxChange(task.id)}
                                    />
                                </td>
                                <td>{task.task}</td>
                                <td>{new Date(task.startDate).toLocaleDateString()}</td>
                                <td>{new Date(task.deadline).toLocaleDateString()}</td>
                                <td>{task.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {editingTask && (
                <div className="edit-form">
                    <h3>Edit Task</h3>
                    <form onSubmit={handleUpdateTask}>
                        <label>
                            Task:
                            <input
                                type="text"
                                value={editingTask.task}
                                onChange={(e) =>
                                    setEditingTask({ ...editingTask, task: e.target.value })
                                }
                                required
                            />
                        </label>
                        <label>
                            Start Date:
                            <input
                                type="date"
                                value={editingTask.startDate}
                                onChange={(e) =>
                                    setEditingTask({ ...editingTask, startDate: e.target.value })
                                }
                                required
                            />
                        </label>
                        <label>
                            Deadline:
                            <input
                                type="date"
                                value={editingTask.deadline}
                                onChange={(e) =>
                                    setEditingTask({ ...editingTask, deadline: e.target.value })
                                }
                                required
                            />
                        </label>
                        <label>
                            Status:
                            <input
                                type="text"
                                value={editingTask.status}
                                onChange={(e) =>
                                    setEditingTask({ ...editingTask, status: e.target.value })
                                }
                                required
                            />
                        </label>
                        <button type="submit">Update Task</button>
                        <button type="button" onClick={() => setEditingTask(null)}>
                            Cancel
                        </button>
                    </form>
                </div>
            )}

            {showCreateForm && (
                <div className="create-form">
                    <h3>Create New Task</h3>
                    <form onSubmit={handleCreateTask}>
                        <label>
                            Task:
                            <input
                                type="text"
                                value={newTask.task}
                                onChange={(e) => setNewTask({ ...newTask, task: e.target.value })}
                                required
                            />
                        </label>
                        <label>
                            Start Date:
                            <input
                                type="date"
                                value={newTask.startDate}
                                onChange={(e) =>
                                    setNewTask({ ...newTask, startDate: e.target.value })
                                }
                                required
                            />
                        </label>
                        <label>
                            Deadline:
                            <input
                                type="date"
                                value={newTask.deadline}
                                onChange={(e) =>
                                    setNewTask({ ...newTask, deadline: e.target.value })
                                }
                                required
                            />
                        </label>
                        <label>
                            Status:
                            <input
                                type="text"
                                value={newTask.status}
                                onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                                required
                            />
                        </label>
                        <button type="submit">Create Task</button>
                        <button type="button" onClick={() => setShowCreateForm(false)}>
                            Cancel
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default TaskList;