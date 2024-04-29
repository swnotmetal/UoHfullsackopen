import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

const UsersToShow = () => {
    const currentUsers = useSelector(state => state.users);

    console.log('all users from the server', currentUsers);

    return (
        <div>
            <h2>All Users</h2>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Blogs Created</th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsers.map(user => (
                        <tr key={user.id}>
                            <td>
                                <Link to={`/users/${user.id}`}>{user.username}</Link>
                            </td>
                            <td>{user.blogs.length}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersToShow;
