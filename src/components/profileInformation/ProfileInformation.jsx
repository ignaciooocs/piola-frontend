import { useNavigate } from 'react-router-dom'
import Button from '../button/Button'
import ButtonLike from '../ButtonLike'
import './ProfileInformation.css'

const ProfileInformation = ({ id, data }) => {
  // estados globales y función de navegació
  const navigate = useNavigate()

  return (
    <div className='profile-information'>
      <b>@{data.username}</b>
      {id !== data._id && <ButtonLike data={data} />}
      {id === data._id &&
        <div>
          <Button onClick={() => navigate('/edit/profile/' + data.username)} title='editar perfil' color='#2ad' />
        </div>}
      <p>{data.biography}</p>
      <div className='container-post-likes'>
        <div className='post-container'>
          posts <br /> {data?.comments.length}
        </div>
        <div className='post-container'>
          Lovers <br /> {data?.likes?.length}
        </div>
      </div>
    </div>
  )
}

export default ProfileInformation
