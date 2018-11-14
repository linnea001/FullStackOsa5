import React from 'react'
import PropTypes from 'prop-types'

class ToggleDetails extends React.Component { 
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

    
  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible })
  }

  setDeletable = () => {
    this.setState({ deletable: true })
  }
  
  render() {
  const hideDetails = { display: this.state.visible ? 'none' : '' }
  const showDetails = { display: this.state.visible ? '' : 'none' }
  
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
       

       
    return (
      <div style={blogStyle}>
        <div style={hideDetails}>
          <div onClick={this.toggleVisibility} className="title">{this.props.label}</div>
        </div>
        <div style={showDetails} className="togglableContent">
           <div onClick={this.toggleVisibility}>{this.props.label}</div>
              {this.props.children}
        </div>
      </div>
     ) 
      
  }
}

ToggleDetails.propTypes = {
  label: PropTypes.string.isRequired
}
export default ToggleDetails