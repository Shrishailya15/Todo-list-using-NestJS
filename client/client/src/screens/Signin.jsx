import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { signin } from '../services/user'

function Signin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const onSignin = async () => {
    if (email.length == 0) {
      toast.warn('Email is required')
    } else if (password.length == 0) {
      toast.warn('Password is required')
    } else {
      const response = await signin(email, password)
      if (!response) {
        toast.error('Error in signin')
      } else if (response.status == 201) {
        // get the token and persist it in session storage
        const { token } = response.data
        sessionStorage['token'] = token
        toast.success('Signin successful')
        navigate('/home')
      } else {
        toast.error('Error in signin')
      }
    }
  }

  return (
    <div className='container'>
      <h1 className='page-header'>Signin</h1>
      <div style={{ width: '50%', margin: 'auto' }}>
        <div className='mb-3'>
          <label htmlFor=''>Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type='text'
            className='form-control'
          />
        </div>
        <div className='mb-3'>
          <label htmlFor=''>Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            className='form-control'
          />
        </div>
        <div className='mb-3'>
          Dont have an account? <Link to='/signup'>Signup here.</Link>
        </div>
        <div className='mb-3'>
          <button
            onClick={onSignin}
            className='btn btn-primary'
          >
            Signin
          </button>
        </div>
      </div>
    </div>
  )
}

export default Signin
