import { useDispatch, useSelector } from 'react-redux'
import blogService from '../services/blogs'
import { useParams, Link } from 'react-router-dom'

const BlogView = () => {
    const dispatch = useDispatch()

    const id = useParams().id

    const user = useSelector(state => state.user)
    const blog = useSelector(state => state.blogs).find(blog => blog.id === id)

    const blogListStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 10
    }

    const handleAddLike = async (blogId) => {
        const currBlog = blog
        const currLikes = currBlog.likes + 1
        const updatedBlogObject = {
            ...currBlog,
            likes: currLikes,
            users: currBlog.users.map(usr => usr.id)
        }
        await blogService.updateOne(blogId.toString(), updatedBlogObject)
    
        const updatedBlogObjectRedux = {
            ...currBlog,
            likes: currLikes
        }
        dispatch({ type: 'blogs/upVoteBlog', updatedBlog: updatedBlogObjectRedux })
      }
    
      const handleBlogDelete = async (blogId) => {
          if (window.confirm("Do you really want to delete this blog?")) {
            const blogToDelete = blog
            try {
              await blogService.deleteOne(blogId.toString(), user.token)
              dispatch({ type: 'blogs/removeBlog', id: blogId })
              dispatch({ type: 'notifications/makeNotification', message: `${blogToDelete.title} by ${blogToDelete.author} has been deleted`, errorState: false })
              setTimeout(() => {dispatch({ type: 'notifications/removeNotification' })}, 3000)
            } catch (exception) {
              dispatch({ type: 'notifications/makeNotification', message: exception.message, errorState: true })
              setTimeout(() => {dispatch({ type: 'notifications/removeNotification' })}, 3000)
            }
          }else{
              dispatch({ type: 'notifications/makeNotification', message: `blog deletion cancelled`, errorState: true })
              setTimeout(() => {dispatch({ type: 'notifications/removeNotification' })}, 3000)
          }
      }
    
      const showDeleteButton = (username) => {
        const currUser = blog.users.find(user => user.username === username)
        if(currUser !== undefined) {
          return(<button onClick={() => handleBlogDelete(blog.id)}>delete</button>)
        }
      }
    
      return (
        <div>
          <div style={blogListStyle}>
            <h2>{blog.title} {blog.author}</h2>
            <Link to={blog.url}>{blog.url}</Link><br />
            <label key={blog.likes}>likes</label>: {blog.likes} <button onClick={() => handleAddLike(blog.id)}>like</button><br />
            added by {blog.users.map(user => <label key={user.id}>{user.name}</label>)}<br />
            {showDeleteButton(user.username)}
          </div>
        </div>
     
      )
    }


export default BlogView