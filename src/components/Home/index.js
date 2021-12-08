import {Component} from 'react'
import Cookies from 'js-cookie'
import ReactFileReader from 'react-file-reader'
import {Redirect} from 'react-router-dom'

import Header from '../Header'

import './index.css'

class Home extends Component {
  state = {
    jsonData: [],
    updatedJsonData: [],
  }

  sendJsonDataToServer = async () => {
    const {jsonData} = this.state
    const token = Cookies.get('jwt_token')
    const url = ''
    const options = {
      Authorization: {
        headers: `Bearer ${token}`,
      },
      method: 'POST',
      body: JSON.stringify(jsonData),
    }
    const sendData = await fetch(url, options)
    console.log(sendData)
  }

  uploadFile = () => {
    const handleFiles = files => {
      console.log(files.base64)
      const baseFile = files.base64
      this.setState({jsonData: baseFile}, this.readJsonFile)
    }

    return (
      <ReactFileReader
        fileTypes={['.json']}
        base64
        multipleFiles
        handleFiles={handleFiles}
      >
        <button className="file-upload-button" type="button">
          Upload
        </button>
      </ReactFileReader>
    )
  }

  uploadToLocalStorage = () => {
    // temporary (client and server is not integrated)
    const {updatedJsonData} = this.state
    const localData = localStorage.getItem('json_file')
    if (localData === null) {
      const toString = JSON.stringify(updatedJsonData)
      localStorage.setItem('json_file', toString)
    } else {
      localStorage.removeItem('json_file')
      const toString = JSON.stringify(updatedJsonData)
      localStorage.setItem('json_file', toString)
    }
  }

  readJsonFile = async () => {
    const {jsonData} = this.state
    const response = await fetch(jsonData)
    const data = await response.json()
    console.log('original', data)
    this.setState({updatedJsonData: data}, this.uploadToLocalStorage)
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <>
        <Header />
        <div className="home-container">
          <h1 className="upload-file-heading">Upload Your Json file</h1>
          {this.uploadFile()}
        </div>
      </>
    )
  }
}

export default Home
