import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import usersService from './services/users'
import Notification from './components/Notification'
import BlogView from './components/BlogView'
import UsersList from './components/UsersList'
import UserView from './components/UserView'
import HomePage from './components/HomePage'

const App = () => {
  const dispatch = useDispatch()

  const padding = {
    padding: 5
  }

  useEffect(() => {
    blogService.getAll().then(blogs => dispatch({ type: 'blogs/setBlogs', payload: blogs }))
    usersService.getAll().then(users => dispatch({ type: 'users/setUsers', payload: users }))
  }, [dispatch])

  const user = useSelector(state => state.user)

  return (
    <Router>
      
      <Link style={padding} to='/'>home</Link>
      <Link style={padding} to='/users'>users</Link>
      <h1>Blogs App</h1>
      <Notification />
      {user.username === '' ? <LoginForm /> :
        <Routes>
          <Route path='/users/:id' element={<UserView />} />
          <Route path='/users' element={<UsersList />} />
          <Route path='/blogs/:id' element={<BlogView />} />
          <Route path='/' element={<HomePage />} />
        </Routes>
      }
    </Router>
  )
}

export default App
