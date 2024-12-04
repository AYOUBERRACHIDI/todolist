    import React, { useState } from 'react';
    import { useSelector, useDispatch } from 'react-redux';
    import { addTask, updateTask, deleteTask, moveTask } from './reducer';
    import './Affichage.css';

    const Affichage = () => {
    const columns = useSelector((state) => state.tasks.columns);
    const dispatch = useDispatch();

    const [newTask, setNewTask] = useState({ title: '', description: '', duration: '' });
    const [selectedColumn, setSelectedColumn] = useState('Preparation');
    const [editingTask, setEditingTask] = useState(null);

    
    const handleAddTask = () => {
        if (!newTask.title.trim() || !newTask.description.trim() || !newTask.duration.trim()) return;
        const task = { id: Date.now(), ...newTask };
        dispatch(addTask({ column: selectedColumn, task }));
        setNewTask({ title: '', description: '', duration: '' });
    };

    
    const handleUpdateTask = (column, taskId) => {
        dispatch(updateTask({ column, taskId, updatedTask: editingTask }));
        setEditingTask(null);
    };

    
    const handleDeleteTask = (column, taskId) => {
        dispatch(deleteTask({ column, taskId }));
    };

    
    const handleMoveTask = (fromColumn, toColumn, taskId) => {
        dispatch(moveTask({ fromColumn, toColumn, taskId }));
    };

    return (
        <div className="affichage">
        <h1>Board</h1>
        
        <div className="add-task">
            <input
            type="text"
            placeholder="Task Title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            />
            <input
            type="text"
            placeholder="Task Description"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            />
            <input
            type="number"
            placeholder="Duration"
            value={newTask.duration}
            onChange={(e) => setNewTask({ ...newTask, duration: e.target.value })}
            />
            <select value={selectedColumn} onChange={(e) => setSelectedColumn(e.target.value)}>
            {Object.keys(columns).map((column) => (
                <option key={column} value={column}>
                {column}
                </option>
            ))}
            </select>
            <button onClick={handleAddTask}>Add Task</button>
        </div>

        <div className="kanban-board">
            {Object.keys(columns).map((column) => (
            <div key={column} className="kanban-column">
                <h3>{column}</h3>
                {columns[column].map((task) => (
                <div key={task.id} className="kanban-task">
                    {editingTask?.id === task.id ? (
                    <>
                        <input
                        type="text"
                        value={editingTask.title}
                        onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                        />
                        <textarea
                        value={editingTask.description}
                        onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                        />
                        <input
                        type="number"
                        value={editingTask.duration}
                        onChange={(e) => setEditingTask({ ...editingTask, duration: e.target.value })}
                        />
                        <button onClick={() => handleUpdateTask(column, task.id)}>Save</button>
                    </>
                    ) : (
                    <>
                        <h4>{task.title}</h4>
                        <p>{task.description}</p>
                        <p>Duration: {task.duration} hours</p>
                        <button onClick={() => setEditingTask(task)}>Edit</button>
                        <button onClick={() => handleDeleteTask(column, task.id)}>Delete</button>
                        {Object.keys(columns)
                        .filter((col) => col !== column)
                        .map((targetColumn) => (
                            <button
                            key={targetColumn}
                            onClick={() => handleMoveTask(column, targetColumn, task.id)}
                            >
                            Move to {targetColumn}
                            </button>
                        ))}
                    </>
                    )}
                </div>
                ))}
            </div>
            ))}
        </div>
        </div>
    );
    };

    export default Affichage;
