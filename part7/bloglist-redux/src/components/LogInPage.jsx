import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logIn } from '../reducers/authenReducer'
import { Form, Button } from 'react-bootstrap'

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    dispatch(logIn(username, password));
    setUsername('');
    setPassword('');
  };

  return (
    <div>
      <h2>Log into application</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username</Form.Label>
          <Form.Control
            type='text'
            name='username'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </Form.Group>
        <Button variant='primary' type="submit">login</Button>
      </Form>
    </div>
  );
};

export default LoginPage;

