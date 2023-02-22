import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Button from '../../components/button/Button'
import Input from '../../components/input/Input'
import { register } from '../../services/register'
import Loading from '../../components/loading/Loading'
import './Register.css'

const Register = () => {
  // Función para la avegación
  const navigate = useNavigate()

  // Estado inicial de los input
  const initialState = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  // estados locales
  const [input, setInput] = useState(initialState)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  // función para captar el cambio del input
  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  // Funcion para enviar el formulario de regitro
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    if (!input.username.trim() || !input.password.trim() || !input.email.trim()) {
      setError('Todos los campos son requeridos')
      return
    }
    if (input.password !== input.confirmPassword) {
      setError('Las contraseñas no coinciden')
      e.traget.confirmPassword.focus()
      return
    }
    const newUser = {
      username: input.username,
      email: input.email,
      password: input.password
    }
    try {
      setLoading(true)
      const res = await register(newUser, setError)
      console.log(res)
      navigate('/login')
    } catch (error) {
      setLoading(false)
      console.log('error en el registro')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='register'>
      <form className='form-register' onSubmit={handleSubmit}>
        {!loading &&
          <>
            <label className='label-register'>Crear cuenta</label>
            <div className='container-input-error'>
              <div className='container-input-register'>
                <Input type='text' name='username' placeholder='crea un nombre de usuario' onChange={handleChange} />
                <Input type='text' name='email' placeholder='introduce tu correo' onChange={handleChange} />
                <Input type='password' name='password' placeholder='crea una contraseña' onChange={handleChange} />
                <Input type='password' name='confirmPassword' placeholder='confirma contraseña' onChange={handleChange} />
                <b className='error'>{error}</b>
              </div>
            </div>
            <div className='container-button-register'>
              <Button color='#2ad' title='Registrarse' />
            </div>
          </>}
        {loading && <Loading />}
      </form>
      <p className='iniciar'>¿Ya tienes cuenta? <br /> <NavLink style={{ color: '#2ad' }} to='/login'>Iniciar sesión</NavLink></p>
    </div>
  )
}

export default Register
