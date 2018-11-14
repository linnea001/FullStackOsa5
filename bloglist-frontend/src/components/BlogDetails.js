import React from 'react'
import PropTypes from 'prop-types'



const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}


const BlogDetails = ({blog, deletable, handleLike, handleDelete}) => {

  return (
    <div style={blogStyle}>
      {blog.title}
        <table><tbody>
          <tr><td>{blog.author}</td></tr>
          <tr><td>{blog.url}</td></tr>
          <tr><td>likes: {blog.likes}
          <button onClick={handleLike}> like  </button></td></tr>
          <tr><td>added by  {JSON.stringify(blog.user, ['name'])}</td></tr>
        </tbody></table>
        {deletable !== false ?
        <div>
          <button onClick={handleDelete}> Delete  </button>
        </div> : <p></p>
      }   
    </div>
  )
}

BlogDetails.propTypes = {
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired
}

export default BlogDetails

