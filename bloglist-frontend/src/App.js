import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import ErrorNotification from './components/ErrorNotification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import BlogDetails from './components/BlogDetails'
import Togglable from './components/Togglable'
import ToggleDetails from './components/ToggleDetails'



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      newBlog: '',
      newTitle: '',
      newAuthor: '',
      newUrl: '',
      newLikes: '',
      idTo: '',
      username: '',
      password: '',
      user: null,
      message: null,
      error: null
    }
  }


  componentDidMount() {
    blogService.getAll().then(blogs => {
      this.setState({ blogs })
    })

  const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  } 

  
  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user })
    } catch (exception) {
      this.setState({
        error: 'username or login wrong',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleNewBlogChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }



  addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: this.state.newTitle,
      author: this.state.newAuthor,
      url: this.state.newUrl
    }
    blogService
      .create(blogObject)
      .then(newBlog => {
        this.setState({
          blogs: this.state.blogs.concat(newBlog),
          newBlog: '',
          newAuthor: '',
          newTitle: '',
          newUrl: '',
          message: `blog '${this.state.newTitle}' created successfully`
        })
        setTimeout(() => {
          this.setState({ message: null })
        }, 5000)
      })
      .catch(error => {
        this.setState({
          error: `blog '${this.state.newTitle}' could not be created`
        })
        setTimeout(() => {
          this.setState({ error: null })
        }, 5000)
      })
  }
  

  updateBlog = (id) => {
    return () => {
      const blog = this.state.blogs.find(n => n.id === id)
      const more= blog.likes +1
      const changedBlog = { ...blog, likes:more }
  
      blogService
        .update(id, changedBlog)
        .then(someBlog => {
          //blogService.getAll()
          //.then(blogs => {
          //  this.setState({ blogs })
          //})
          this.setState({
          blogs: this.state.blogs.map(blog => blog.id !== id? blog : changedBlog),
          message: `you like was added to '${blog.title}'`
          })
          setTimeout(() => {
            this.setState({ message: null })
          }, 5000)
        })
        .catch(error => {
          blogService.getAll()
          this.setState({
            error: `like of '${blog.title}' failed`
          })
          setTimeout(() => {
            this.setState({ error: null })
          }, 5000)
        })
    }
  }


  deleteBlog = (id) => {
    return () => {
      const ok = window.confirm(`Delete blog?`)
      if (!ok) {
         return
       }
        blogService
          .deletion(id)
          .then(response => {
            this.setState({
             blogs: this.state.blogs.filter(n => n.id !== id),
             message: 'blogi poistettu' })
          })
        .catch(error => {
          blogService.getAll()
           .then(response => {
            this.setState({ blogs: response })
            this.setState({ error:`blog was not deleted`})
           })
        })
      setTimeout(() => {
        this.setState({message: null})
      }, 5000)
    }
  }


  userLogOut = () => {
    //window.localStorage.removeItem('loggedNoteappUser')
    window.localStorage.clear()
    this.setState({username:''})
    this.setState({user: null})
    this.setState({
      message: 'Logout successful',
    })
    setTimeout(() => {
      this.setState({ message: null })
    }, 5000)
  }


  sortBlogs = (blogsToSort) => {
    let bList = blogsToSort.sort((a, b) => parseInt(b.likes, 10) - parseInt(a.likes, 10));
    return bList
  }


  // blogin on käyttäjän oma tai ilman omistajaa
  userCanDelete = (blogToCheck) => {   
      const currentUser = this.state.user["username"]
      const blogUser = blogToCheck.user
      if (typeof blogUser !== "undefined" && blogUser !== null) {
        const blogUser = blogToCheck.user["username"]
        return (currentUser === blogUser)
      }
      else {
        return true
      }
  }


  render() {
    const blogForm = () => (
      <Togglable buttonLabel= "Create a new blog">
      <BlogForm
        newTitle={this.state.newTitle}
        newAuthor={this.state.newAuthor}
        newUrl={this.state.newUrl}
        handleNewBlogChange={this.handleNewBlogChange}
        handleSubmit={this.addBlog} 
      />
      </Togglable>
    )

    const loginForm = () => (
      <LoginForm
        username={this.state.username}
        password={this.state.password}
        handleLoginFieldChange={this.handleLoginFieldChange}
        handleSubmit={this.login} 
      />
    )


    const blogItem = (blogToList) => (
      <div>
      <ToggleDetails label={blogToList.title}>
      <BlogDetails
        blog = {blogToList}
        deletable = {this.userCanDelete(blogToList)}
        handleLike = {this.updateBlog(blogToList.id)}
        handleDelete = {this.deleteBlog(blogToList.id)}
      />
      </ToggleDetails>
      </div>
    ) 


    if (this.state.user === null) {
      return (
        <div className="loginArea">
          <h2>Login to blogs</h2>
          <Notification message={this.state.message}/>
          <ErrorNotification error={this.state.error}/>
            {loginForm()}
        </div>
      )
    }
  
    return (
      <div className="contentDisplay">
        <div>
        <Notification message={this.state.message}/>
        <ErrorNotification error={this.state.error}/>

          <table><tbody><tr>
            <td><b>{this.state.user.name}</b> logged in</td>
            <td><button onClick={this.userLogOut}>
              log out
            </button></td> 
          </tr></tbody></table>
        </div>

        <div className="blogForm">
          <h2>Create a new blog</h2>
          {blogForm()}
        </div>
        
        <div className="blogList">
          <h2>blogs</h2>
          {this.sortBlogs(this.state.blogs).map(blog =>
          <div key= {blog.id}> {blogItem(blog)}</div>
          )}
        </div>
      </div>
    )
  }

}
//<Blog key={blog._id} blog={blog} />

export default App;
