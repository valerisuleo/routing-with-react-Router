import { useParams } from 'react-router-dom';

/* eslint-disable-next-line */
export interface UserShowProps {}

export function UserShow() {
    const { id } = useParams();

    return (
        <div>
            <h1>Welcome to UserShow!</h1>
            <p>
                User id: {id}
            </p>
            
        </div>
    );
}

export default UserShow;
