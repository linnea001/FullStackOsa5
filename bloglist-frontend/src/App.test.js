import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
import BlogDetails from './components/BlogDetails'
jest.mock('./services/blogs')
import blogService from './services/blogs'
jest.mock('./setupTests')


describe('<App />', () => {
  let app

  describe('when user is not logged', () => {
    beforeEach(() => {
      app = mount(<App />)
    })

    it('only loginform is displayed', () => {
      app.update()
  
      const loginDiv = app.find('.loginArea')
      //console.log(loginDiv.debug())
      const button = loginDiv.find('button')
  
      expect(app.exists('.loginArea')).toEqual(true);
      expect(app.find('.contentDisplay').exists()).toEqual(false)
      expect(app.find('.blogForm').exists()).toEqual(false)
      expect(app.find('.blogList').exists()).toEqual(false)
  
      expect(loginDiv.text()).toContain('username')
      expect(loginDiv.text()).toContain('password')
      expect(button.text()).toContain('login')
      
    })
  })


  describe('when user is logged', () => {
    beforeEach(() => {
      app = mount(<App />)
      const user = {
        username: 'tester',
        token: '1231231214',
        name: 'Teuvo Testaaja'
      }
      localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      app.setState({ user: user.username })  
    })

    it('all blogs are rendered', () => {
      app.update()
      console.log(localStorage.getItem('loggedBlogAppUser'))
      //console.log(app.debug())
      
      expect(app.exists('.loginArea')).toEqual(false);
      expect(app.find('.contentDisplay').exists()).toEqual(true)
      expect(app.find('.blogForm').exists()).toEqual(true)
      expect(app.find('.blogList').exists()).toEqual(true)


      const blogItems = app.find(BlogDetails)
      console.log(blogItems.debug())
      expect(blogItems.length).toEqual(blogService.blogs.length)
    })
  })

})