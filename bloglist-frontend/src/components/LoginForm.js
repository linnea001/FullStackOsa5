import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleSubmit, handleLoginFieldChange, username, password }) => {
  return (
    <div>
    <form onSubmit={handleSubmit}>
      <table><tbody>
        <tr><td>username</td>
        <td><input
          type="text"
          name="username"
          value={username}
          onChange={handleLoginFieldChange}
        /></td></tr>
        <tr><td>password</td>
        <td><input
          type="password"
          name="password"
          value={password}
          onChange={handleLoginFieldChange}
          /></td></tr>
        <tr><td>
          <button type="submit">login</button>
        </td></tr>
      </tbody></table>
    </form>
</div>
  )
  
}
LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleLoginFieldChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm