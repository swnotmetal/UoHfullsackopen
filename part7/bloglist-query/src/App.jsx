import React, { useState, useEffect, useContext } from 'react';
import Blog from './components/BlogMuta';
import loginService from './services/login';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
import BlogForm from './components/BlogFormMuta';
import { useNotificationDispatch } from './contexts/notificationContext';
import Notification from './components/Notification';
import { getAll, setToken } from './request/request';
import { useQuery } from '@tanstack/react-query';
import UserContext, { useUserDispatch, useUserValue } from './contexts/userContext';

const App = () => {
  const dispatch = useNotificationDispatch();
  const [user, userDispatch] = useContext(UserContext)

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  //const [sortedBlogs, setSortedBlogs] = useState([]); the sorting function seem to be messing with the rendering, so it had to be taken off for now.
  const [loginVisible, setLoginVisible] = useState(false);




  /*const sortByLikes = (blogs) => {
    return blogs.slice().sort((x, y) => x.likes - y.likes);
  } */

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      userDispatch({ type: 'LOGIN', payload: user });
      setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user));
      setToken(user.token);
      userDispatch({ type: 'LOGIN', payload: user });
      setUsername('');
      setPassword('');
    } catch (exception) {
      dispatch({ type: 'ERROR', payload: 'Wrong username or password' });
      setTimeout(() => {
        dispatch({ type: 'TIMEOUT' });
      }, 4444);
    }
  };


  const handleLogout = async (event) => {
    event.preventDefault();
    window.localStorage.removeItem('loggedBlogUser');
    await userDispatch({ type: 'LOGOUT' });
  };

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: getAll,
    retry: 1,
    refetchOnWindowFocus: false
  });

  console.log(JSON.parse(JSON.stringify(result)))
  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' };
    const showWhenVisible = { display: loginVisible ? '' : 'none' };

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}> log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) =>
              setUsername(target.value)
            }
            handlePasswordChange={({ target }) =>
              setPassword(target.value)
            }
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}> cancel</button>
        </div>
      </div>
    );
  };

  const newBlogForm = () => (
    <Togglable buttonLabel='new blog'>
      <BlogForm />
    </Togglable>
  );

  if ( result.isLoading ) {
    return <div>loading data...</div>
  } else if (result. isError)
 {
    return <div>server error</div>
 }  
 const blogs = result.data
  return (
    <div>
      <div>
        <h2>Log into application</h2>
        {user === null && loginForm()}
        {user !== null && newBlogForm()}
        {user !== null && (
          <div>
            <p>
              <span style={{ color: 'crimson', fontWeight: 'bold' }}>
                {user.name}
              </span>{' '}
              logged in
            </p>
            <button onClick={handleLogout}>log out</button>
          </div>
        )}
      </div>
      <div>
        <Notification />
      </div>
      <h2>blogs</h2>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} user={user} />
      ))}
    </div>
  );
};

export default App;

