import { NavLink } from 'react-router-dom'
import searchUsers from '../../assets/search-users.png'
import './EmptyLikedUsers.css'

const EmptyLikedUsers = () => {
  return (
    <div className='empty-container'>
      <p>Aun no te gusta ningun usuario</p>
      <div className='search-img-container'>
        <img className='search-img' src={searchUsers} />
      </div>
      <NavLink style={{ color: '#2ab' }} to='/search'>Busca a tus amigos</NavLink>
    </div>
  )
}

export default EmptyLikedUsers
