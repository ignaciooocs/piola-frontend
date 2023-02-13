import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import EmptyLikedUsers from '../../components/emptyLikedUsers/EmptyLikedUsers'
import LikedUser from '../../components/LikedUser'
import './home.css'

const Home = () => {
  // traer los estados del reducer
  const { liked } = useSelector(state => state.profileUserLoggedIn)

  return (
    <div className='home-container'>
      {liked?.length === 0 && <EmptyLikedUsers />}
      <LikedUser />
      {liked?.length > 0 && <p style={{ margin: '20px', paddingBottom: '20px', textAlign: 'center' }}>Sigue a mas personas <br /> <NavLink style={{ color: '#2ad' }} to='/search'>Buscar</NavLink></p>}
    </div>
  )
}

export default Home
