import React from 'react';
//import actionFor from './actionCreators'

class App extends React.Component {


 sortItems = (itemsToSort) => {
  let iList = itemsToSort.sort((a, b) => parseInt(b.votes, 10) - parseInt(a.votes, 10));
  return iList
 }

  voteAnecdote = (id) => () => {
    this.props.store.dispatch({
      type: 'VOTE',
      data: {id}
    })
  }

  addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.text.value
    this.props.store.dispatch({
      type: 'ADD',
      data: {content}
    })
    event.target.text.value = ''
  }

  render() {
    const anecdotes = this.props.store.getState()
    return (
      <div>
        <h2>Anecdotes</h2>
        {this.sortItems(anecdotes).map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content} 
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.voteAnecdote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={this.addAnecdote}>
          <div><input name="text"/></div>
          <button type="submit">create</button> 
        </form>
      </div>
    )
  }
}

export default App