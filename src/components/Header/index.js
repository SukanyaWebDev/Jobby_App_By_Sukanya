import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const goToLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav>
      <ul>
        <Link to="/">
          <li>
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </li>
        </Link>

        <li style={{display: 'flex'}}>
          <h1>
            <Link to="/">Home</Link>
          </h1>

          <h1>
            <Link to="/jobs">Jobs </Link>
          </h1>
        </li>
        <li>
          <button type="button" onClick={goToLogout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}
export default withRouter(Header)
