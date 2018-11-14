const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  let change
  let newState
  switch (action.type) {
    case 'GOOD':
      change = state.good+1
      newState = { ...state, good: change }
      console.log(newState)
      return { ...state, good: change } 
    case 'OK':
      change = state.ok+1
      newState = { ...state, ok: change }
      console.log(newState)
      return { ...state, ok: change }
    case 'BAD':
      change = state.bad+1
      newState = { ...state, bad: change }
      console.log(newState)
      return { ...state, bad: change }
    case 'ZERO':
      return initialState
    default:
      return state
  }
}

export default counterReducer