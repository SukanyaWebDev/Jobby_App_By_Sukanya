import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {async} from 'rxjs'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {userName: '', userPass: '', errorMsgDisplay: false, errorMsg: ''}

  takeTheUserName = event => {
    this.setState({userName: event.target.value})
  }

  takeThePass = event => {
    this.setState({userPass: event.target.value})
  }

  onSuccessForm = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })

    history.replace('/')
  }

  getTheData = async event => {
    event.preventDefault()
    const {userName, userPass} = this.state

    const data = {
      username: userName,
      password: userPass,
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(data),
    }
    const dataCan = await fetch('https://apis.ccbp.in/login', options)
    const response = await dataCan.json()
    if (dataCan.ok === true) {
      this.setState({errorMsgDisplay: false})
      this.onSuccessForm(response.jwt_token)
    } else if (dataCan.ok === false) {
      this.setState({errorMsgDisplay: true})
      this.setState({errorMsg: response.error_msg})
    }
    console.log(response)
  }

  render() {
    const {userName, userPass, errorMsgDisplay, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="mainDiv1">
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </div>
        <p>User Name : rahul Password: rahul@2021</p>
        <form onSubmit={this.getTheData}>
          <label htmlFor="nameTaker">USERNAME</label>
          <input
            id="nameTaker"
            type="text"
            onChange={this.takeTheUserName}
            value={userName}
            placeholder="Username"
          />
          <label htmlFor="passTaker">PASSWORD</label>
          <input
            id="passTaker"
            type="password"
            value={userPass}
            onChange={this.takeThePass}
            placeholder="Password"
          />
          <button type="submit">Login</button>
        </form>
        {errorMsgDisplay ? <p>*{errorMsg}</p> : ''}
      </div>
    )
  }
}
export default Login
