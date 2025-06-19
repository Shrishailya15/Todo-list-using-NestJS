import axios from 'axios'
import { config } from '../constants'

export async function signup(name, email, password) {
  // create the body
  const body = {
    name,
    email,
    password,
  }

  try {
    const url = `${config.server}/user/signup`
    const response = await axios.post(url, body)
    console.log(response.data)
    return response
  } catch (error) {
    console.error(error)
  }
}

export async function signin(email, password) {
  try {
    // create the body
    const body = {
      email,
      password,
    }
    const url = `${config.server}/user/signin`
    const response = await axios.post(url, body)
    return response
  } catch (error) {
    console.error(`error: `, error)
  }
}
