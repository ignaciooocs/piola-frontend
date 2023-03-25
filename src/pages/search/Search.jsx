import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Input from '../../components/input/Input'
import notPicture from '../../assets/not-picture2.png'
import './Search.css'
import SearchEmpty from '../../components/SearchEmpty'
import { motion, AnimatePresence } from 'framer-motion'
const BASE_URL = import.meta.env.VITE_BASE_URL

const Search = () => {
  // cargar los datos de la sesion del usuario actual y mandarlos al reducer

  const { likedUsers } = useSelector(state => state.likedUsers)
  const { liked } = useSelector(state => state.profileUserLoggedIn)
  const { token } = useSelector(state => state.user)

  const navigate = useNavigate()

  // Estados para manejar el valor del input y el array de usuarios encontrados
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState(null)

  // Va encontrando usuarios que coincidan con lo que escribe
  useEffect(() => {
    if (!token) {
      navigate('/')
    }
    inputRef.current.focus()
    handleSearch()
  }, [searchTerm])

  // Funcion para buscar usuarios registrados en la app
  const handleSearch = async (e) => {
    try {
      if (searchTerm === '') {
        setSearchResults(null)
        return
      }
      const response = await axios.get(`${BASE_URL}/users/search/${searchTerm}`)
      setSearchResults(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const variants = {
    hidden: {
      opacity: 0
    },
    visible: () => ({
      opacity: 1
    })
  }

  const inputRef = useRef(null)

  return (
    <div className='search'>
      <form className='form-search'>
        <div className='container-input-search'>
          <Input
            type='text'
            ref={inputRef}
            placeholder='Buscar'
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>
      </form>
      {searchResults?.length === 0 && <p className='notResults'>no hay resultados de "{searchTerm}"</p>}
      {(liked?.length === 0 && searchTerm === '') && <SearchEmpty />}
      <div className='users-container-search'>
        <motion.ul layout className='users-search'>
          <AnimatePresence>
            {!searchResults &&
              likedUsers?.map((user) => (
                <motion.li
                  className='user-found' key={user._id}
                  variants={variants}
                  initial='hidden'
                  animate='visible'
                  exit='hidden'
                  layoutId={user._id}
                >
                  <NavLink className='user-search-link' to={`/${user.username}`}>
                    <div className='container-pictures'>
                      {!user.picture
                        ? <img className='user-picture' src={notPicture} />
                        : <img className='user-picture' src={user.picture} />}
                    </div>
                    <b>{user.username}</b>
                  </NavLink>
                </motion.li>
              ))}
            {searchResults?.map((user) => (
              <li className='user-found' key={user._id}>
                <NavLink className='user-search-link' to={`/${user.username}`}>
                  <div className='container-pictures'>
                    {!user.picture
                      ? <img className='user-picture' src={notPicture} />
                      : <img className='user-picture' src={user.picture} />}
                  </div>
                  <b>{user.username}</b>
                </NavLink>
              </li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>
    </div>
  )
}

export default Search
