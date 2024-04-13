import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { castingVotes } from '../reducers/anecdoteReducer';



const AnecdoteList = () => {
  const dispatch = useDispatch();

  const anecdotes = useSelector(state => {
    const filteredAnecdotes = state.filters === '' ?
      state.anecdotes :
      state.anecdotes.filter(anecdote =>
        anecdote.content.toLowerCase().includes(state.filters.toLowerCase())
      );

    return filteredAnecdotes.slice().sort((x, y) => y.votes - x.votes);
  });

  const vote = (anecdote) => {
    
    dispatch(castingVotes(anecdote))
   
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnecdoteList;
