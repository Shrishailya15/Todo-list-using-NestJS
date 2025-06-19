import { config } from '../constants'
import axios from 'axios'

export async function getAllTasks() {
  try {
    const url = `${config.server}/task/`

    // get the token
    const token = sessionStorage['token']
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return response
  } catch (ex) {
    console.log(ex)
  }
}

export async function addTask(title, description) {
  const body = { title, description }

  try {
    const url = `${config.server}/task/`
    const token = sessionStorage['token']
    const response = await axios.post(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response
  } catch (ex) {
    console.log(ex)
  }
}

export async function deleteTask(id) {
  try {
    const url = `${config.server}/task/${id}`
    const token = sessionStorage['token']
    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response
  } catch (ex) {
    console.log(ex)
  }
}
