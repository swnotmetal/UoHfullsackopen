import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/esm/Table';

const UsersToShow = () => {
    const currentUsers = useSelector(state => state.users);

    console.log('all users from the server', currentUsers);
    const padding = {
        padding : 5
      }

    return (
        <div>
            <h4>All Users</h4>
            <Table striped>
                <tbody>
                    {currentUsers.map(user => (
                        <tr key={user.id}>
                            <td>
                                <Link style={padding} to={`/users/${user.id}`}>{user.username}</Link>
                            </td>
                            <td>{user.blogs.length}</td>
                        </tr>
                    ))}
                </tbody>
                </Table>
        </div>
    );
};

export default UsersToShow;
