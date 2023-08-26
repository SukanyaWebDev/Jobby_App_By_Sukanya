import {withRouter, Link, Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'
import {Component} from 'react'

import Header from '../Header'
import './index.css'

class Home extends Component {
  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <div className="mainDiv">
        <Header />
        <div className="myCard">
          <h1>Find The Job That Fits Your Life</h1>
          <p>
            Millions of people are searching for jobs,salary Information,company
            reviews.find the that fits your ability and potential
          </p>
        </div>
        <Link to="/jobs">
          <button type="button">Find Jobs</button>
        </Link>
      </div>
    )
  }
}

export default withRouter(Home)
