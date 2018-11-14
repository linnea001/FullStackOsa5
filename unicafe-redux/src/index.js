import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import counterReducer from './reducer'


const Statistiikka = ({ handleZero }) => {
  let arvot = store.getState()
  let palautteita = arvot.good + arvot.ok + arvot.bad

  if (palautteita === 0) {
    return (
      <div>
        <h2>statistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    )
  }

  return (
    <div>
      <h2>statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{arvot.good}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{arvot.ok}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{arvot.bad}</td>
          </tr>
          <tr>
            <td>keskiarvo</td>
            <td>{((arvot.good-arvot.bad)/(arvot.good+arvot.ok+arvot.bad)).toFixed(1)}</td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td>{((arvot.good)/(arvot.good+arvot.ok+arvot.bad)*100).toFixed(1)} {'%'}</td>
          </tr>
        </tbody>
      </table>
      <button onClick={handleZero('ZERO')}>nollaa tilasto</button>
    </div >
  )
}

const store = createStore(counterReducer)

class App extends React.Component {
  klik = (feedback) => () => {
    store.dispatch({ type: feedback })
  }

  render() {
    return (
      <div>
        <h2>anna palautetta</h2>
        <button onClick={this.klik('GOOD')}>hyvä</button>
        <button onClick={this.klik('OK')}>neutraali</button>
        <button onClick={this.klik('BAD')}>huono</button>
        <Statistiikka handleZero={this.klik}/>

      </div>
    )
  }
}

const render = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

render()
store.subscribe(render)

//ReactDOM.render(<App />, document.getElementById('root'));
