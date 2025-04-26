// src/App.tsx
import React, { useState } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import './App.scss'; // переименуйте в .scss, если хотите

const GET_TASKS = gql`
    query GetTasks {
        tasks {
            id
            title
            completed
        }
    }
`;

const CREATE_TASK = gql`
    mutation CreateTask($title: String!) {
        createTask(data: { title: $title }) {
            id
            title
            completed
        }
    }
`;

const TOGGLE_TASK = gql`
    mutation ToggleTask($id: Int!) {
        toggleTask(id: $id) {
            id
            completed
        }
    }
`;

export default function App() {
    const { data, loading, error, refetch } = useQuery(GET_TASKS);
    const [createTask] = useMutation(CREATE_TASK);
    const [toggleTask] = useMutation(TOGGLE_TASK);
    const [title, setTitle] = useState('');

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>Ошибка: {error.message}</p>;

    return (
        <div className="app">
            <h1>Список задач</h1>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    if (!title.trim()) return;
                    createTask({ variables: { title } }).then(() => {
                        setTitle('');
                        refetch();
                    });
                }}
            >
                <input
                    type="text"
                    placeholder="Новая задача..."
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <button type="submit">Добавить</button>
            </form>
            <ul>
                {data.tasks.map((t: any) => (
                    <li key={t.id} className={t.completed ? 'done' : ''}>
                        <label>
                            <input
                                type="checkbox"
                                checked={t.completed}
                                onChange={() =>
                                    toggleTask({ variables: { id: t.id } }).then(() => refetch())
                                }
                            />
                            {t.title}
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
}
