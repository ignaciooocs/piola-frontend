import { useState } from 'react'
import { useDispatch } from 'react-redux'
import Button from '../../components/button/Button'
import Input from '../../components/input/Input'
import { NavLink, useNavigate } from 'react-router-dom'
import { setUser } from '../../reducers/user/userSlice'
import { login } from '../../services/login'
import './Login.css'

const Login = () => {
  // cargar los datos de la sesion del usuario actual y mandarlos al reducer
  const navigate = useNavigate()

  // Se crea funcion de dispatch
  const dispatch = useDispatch()

  const [error, setError] = useState('')

  // Estado y funcion para manejar el valor y los cambios del input
  const [input, setInput] = useState({
    username: '',
    password: ''
  })
  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  // Funcion para iniciar sesión
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!input.username.trim()) {
      setError('Debe introducir sus datos')
      e.target.username.focus()
      return
    }

    if (!input.password.trim()) {
      setError('Debe introducir sus datos')
      e.target.password.focus()
      return
    }

    const userLogin = {
      username: input.username,
      password: input.password
    }

    try {
      const data = await login(userLogin, setError)
      dispatch(setUser(data))
      navigate('/')
    } catch (error) {
      console.log(error.response.data.error)
    }
  }

  return (
    <div className='login'>
      <div className='welcome-container'>
        <p className='welcome'>
          Bienvenido a PIOLA <br />Preguntas y confesiones🤐
        </p>
      </div>
      <form className='form-login' onSubmit={handleSubmit}>
        <label className='label-login'>Iniciar sesión</label>
        <div className='container-input-error'>
          <b className='error'>{error}</b>
          <div className='container-input-register'>
            <Input type='text' name='username' placeholder='nombre de usuario' onChange={handleChange} />
            <Input type='password' name='password' placeholder='contraseña' onChange={handleChange} />
          </div>
        </div>
        <div className='container-button-login'>
          <Button color='#2ad' title='Iniciar sesión' />
        </div>
      </form>
      <p className='registrate'>¿No tienes una cuenta? <br /> <NavLink style={{ color: '#2ad' }} to='/register'>Regístrate</NavLink></p>
      <div className='welcome-description'>
        <p className='welcome'>Pagina Web de Preguntas y Confesiones Anónimas en Piola 🤐 Conéctate con tus amigos y comparte preguntas y confesiones completamente anónimas. 👌 Dale "Me gusta" a los perfiles y hazles preguntas o confesiones secretas.🤫 Personaliza tu perfil con una foto para ser reconocido.😏 Recibe notificaciones en tiempo real cuando alguien valore tu perfil con un "Me gusta".📥 Puedes cambiar tu biografía, nombre de usuario y foto para mantener tu perfil actualizado.💪 Elimina de forma inmediata cualquier pregunta o confesión inapropiada.❌ Mantente informado sobre las últimas preguntas y confesiones de tus contactos.</p>
      </div>
    </div>
  )
}

export default Login
