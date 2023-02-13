import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Button from '../button/Button'
import ButtonLike from '../ButtonLike'
import './ProfileInformation.css'

const ProfileInformation = ({ id }) => {
  // estados globales y función de navegació
  const { username, comments, _id, biography, likes } = useSelector(state => state.profileUser)
  const navigate = useNavigate()

  // {id === _id && 'Tu'} {id !== _id ? 'B' : 'b'}iografía <br />
  return (
    <div className='profile-information'>
      <b>@{username}</b>
      {id !== _id && <ButtonLike />}
      <p>{biography}</p>
      {id === _id &&
        <div>
          <Button onClick={() => navigate('/edit/profile')} title='editar perfil' color='#2ad' />
        </div>}
      <div className='container-post-likes'>
        <div className='post-container'>
          posts <br /> {comments.length}
        </div>
        <div className='post-container'>
          Lovers <br /> {likes?.length}
        </div>
      </div>
    </div>
  )
}

export default ProfileInformation
