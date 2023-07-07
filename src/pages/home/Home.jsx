import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import EmptyLikedUsers from '../../components/emptyLikedUsers/EmptyLikedUsers'
import LikedUser from '../../components/LikedUser'
import './home.css'
import { useQuery } from '@tanstack/react-query'
import { getLikedUsers } from '../../services/user'
import Loading from '../../components/loading/Loading'

const Home = () => {
  // traer los estados del reducer
  const { id } = useSelector(state => state.user)

  const get = async () => await getLikedUsers(id)

  const { data, isLoading, error } = useQuery({
    queryKey: ['LikedUsers'],
    queryFn: get
  })
  if (isLoading) return <Loading className='loader-container' />

  if (error) return <div>Error: {error}</div>

  return (
    <div className='home-container'>
      {data.length < 1 && <EmptyLikedUsers />}
      <LikedUser data={data} />
      {data.length > 0 && <p style={{ margin: '20px', paddingBottom: '20px', textAlign: 'center' }}>Sigue a mas personas <br /> <NavLink style={{ color: '#2ad' }} to='/search'>Buscar</NavLink></p>}
    </div>
  )
}

export default Home
