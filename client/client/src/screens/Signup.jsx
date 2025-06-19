import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { signup } from '../services/user'

function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const navigate = useNavigate()

  const onSignup = async () => {
    if (name.length === 0) {
      toast.warn('Name is required')
    } else if (email.length === 0) {
      toast.warn('Email is required')
    } else if (password.length === 0) {
      toast.warn('Password is required')
    } else if (confirmPassword.length === 0) {
      toast.warn('Confirm Password is required')
    } else if (password !== confirmPassword) {
      toast.warn('Password and Confirm Password must be same')
    } else {
      const response = await signup(name, email, password)
      if (response.status == 201) {
        toast.success('Signup successful')
        navigate(-1)
      } else {
        toast.error('Error in signup')
      }
    }
  }

  return (
    <div className='container'>
      <h1 className='page-header'>Signup</h1>
      <div style={{ width: '50%', margin: 'auto' }}>
        <div className='mb-3'>
          <label htmlFor=''>Name</label>
          <input
            onChange={(e) => setName(e.target.value)}
            type='text'
            className='form-control'
          />
        </div>
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
          <label htmlFor=''>Confirm Password</label>
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            type='password'
            className='form-control'
          />
        </div>
        <div className='mb-3'>
          Already have an account? <Link to='/'>Signin here.</Link>
        </div>
        <div className='mb-3'>
          <button
            onClick={onSignup}
            className='btn btn-primary'
          >
            Signup
          </button>
        </div>
      </div>
    </div>
  )
}

export default Signup
