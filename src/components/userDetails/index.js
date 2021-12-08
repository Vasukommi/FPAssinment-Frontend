import './index.css'

const UserDetails = props => {
  const {userDetailsList} = props
  const {body, title, userId} = userDetailsList

  return (
    <li className="each-user">
      <p>{userId}</p>
      <h1>{title}</h1>
      <p>{body}</p>
    </li>
  )
}

export default UserDetails
