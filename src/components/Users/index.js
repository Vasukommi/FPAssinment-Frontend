import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import UserDetails from '../userDetails'
import Header from '../Header'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Users extends Component {
  state = {
    usersData: [],
    apiStatus: apiConstants.initial,
  }

  componentDidMount() {
    this.fetchUsersData()
  }

  fetchUsersData = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const token = Cookies.get('jwt_token')
    const url = 'https://api.jsonbin.io/b/61b04a6501558c731cd03e52'
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    const jsonData = this.updateJsonData()
    console.log('file', jsonData)
    if (jsonData !== null) {
      this.setState({apiStatus: apiConstants.success, usersData: jsonData})
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  updateJsonData = () => {
    const data = JSON.parse(localStorage.getItem('json_file'))
    if (data === undefined) {
      return null
    }
    return data
  }

  renderUsersData = () => {
    const {usersData} = this.state

    return (
      <ul className="user-details-container">
        {usersData.map(eachItem => (
          <UserDetails userDetailsList={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
  )

  renderFailure = () => <h1>Please Upload a JSON File</h1>

  renderOutput = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConstants.success:
        return this.renderUsersData()
      case apiConstants.inProgress:
        return this.renderLoader()
      case apiConstants.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="users-page">
          <div className="users-container">{this.renderOutput()}</div>
        </div>
      </>
    )
  }
}

export default Users
