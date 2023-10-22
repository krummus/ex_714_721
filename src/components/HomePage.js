import { useSelector } from 'react-redux'
import BlogList from './BlogList'
import Togglable from './Togglable'
import LoggedInUserPanel from './LoggedInUserPanel'
import CreateBlog from './CreateBlog'

const HomePage = () => {
    const user = useSelector(state => state.user)

    return(

        <div>
            <LoggedInUserPanel />
            <br />
            <Togglable buttonLabel='new note'>
                <CreateBlog user={user}/>
            </Togglable>
            <br />
            <BlogList user={user} />
        </div>
    )
}

export default HomePage