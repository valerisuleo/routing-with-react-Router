import axios from 'axios';
import { useState, useEffect } from 'react';
import { IUser } from '../interfaces';
import { Outlet, useNavigate } from 'react-router-dom';

export function UsersIndex() {
    const [todos, setTodos] = useState<IUser[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        getUsers();
    }, []);

    function getUsers() {
        axios
            .get('https://jsonplaceholder.typicode.com/users')
            .then((res) => setTodos(res.data));
    }

    const handleNavigation = (current: IUser) => {
        console.log(current);
        navigate(`${current.id}`);
    };

    return (
        <div className="row">
            <div className="col-6">
                <ul className="list-group">
                    {todos.map((item) => (
                        <li
                            onClick={() => handleNavigation(item)}
                            key={item.id}
                            className="list-group-item"
                        >
                            {item.name}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="col-6">
                <Outlet></Outlet>
            </div>
        </div>
    );
}

export default UsersIndex;
