import { useEffect, useState } from 'react';
import axios from 'axios';

/* eslint-disable-next-line */
export interface ITodo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

export function TodosIndex() {
    const [todos, setTodos] = useState<ITodo[]>([]);

    useEffect(() => {
        getTodos();
    }, []);

    function getTodos() {
        axios
            .get('https://jsonplaceholder.typicode.com/todos', {params: {
                _limit: 10
            }})
            .then((res) => setTodos(res.data));
    }

    return (
        <ul className="list-group">
            {todos.map((item) => (
                <li key={item.id} className="list-group-item">{item.title} {item.id}</li>
            ))}
        </ul>
    );
}

export default TodosIndex;
