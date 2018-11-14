import React from 'react'

const BlogForm = ({ handleSubmit, handleNewBlogChange, newTitle, newAuthor, newUrl }) => {
  return (
    <div>
    <form onSubmit={handleSubmit}>
      <table><tbody>
        <tr><td>Title</td><td><input
          type="text"
          name="newTitle"
          value={newTitle}
          onChange={handleNewBlogChange}
        /></td></tr>
        <tr><td>Author</td><td><input
          type="text"
          name="newAuthor"
          value={newAuthor}
          onChange={handleNewBlogChange}
        /></td></tr>
        <tr><td>url</td><td><input
          type="text"
          name="newUrl"
          value={newUrl}
          onChange={handleNewBlogChange}
        /></td></tr>
        <tr><td>
          <button type="submit">Create</button>
        </td></tr>
      </tbody></table>
    </form>
  </div>
  )
}

export default BlogForm