import { useEffect, useState } from 'react'
import { deleteTask, getAllTasks } from '../services/task'
import { Link, useNavigate } from 'react-router-dom'
import { to } from '../../node_modules/@pkgjs/parseargs/utils'
import { toast } from 'react-toastify'

function Home() {
  const [tasks, setTasks] = useState([])

  const navigate = useNavigate()

  const getTasks = async () => {
    const response = await getAllTasks()
    if (response.status === 200) {
      console.log(response.data)
      setTasks(response.data)
    }
  }

  const onLogout = () => {
    sessionStorage.clear()
    navigate('/')
  }

  useEffect(() => {
    getTasks()
  }, [])

  const onDeleteTask = async (id) => {
    const response = await deleteTask(id)

    if (response.status === 200) {
      toast.success('Task deleted successfully')

      // refresh the tasks
      getTasks()
    }
  }

  return (
    <div className='container'>
      <h1 className='page-header'>Home</h1>

      <div className='d-flex justify-content-between'>
        <Link to='/create-task'>
          <button className='btn btn-success'>Create</button>
        </Link>
        <button
          onClick={onLogout}
          className='btn btn-danger'
        >
          Logout
        </button>
      </div>
      <hr />
      {tasks.length == 0 && <h3>No tasks found</h3>}

      {tasks.length > 0 && (
        <div>
          <table className='table'>
            <thead>
              <tr>
                <th>No</th>
                <th>Title</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => {
                return (
                  <tr key={task.id}>
                    <td>{index + 1}</td>
                    <td>{task.title}</td>
                    <td>{task.description}</td>
                    <td>
                      <Link to={`/edit-task/${task.id}`}>
                        <button className='btn btn-primary'>Edit</button>
                      </Link>
                      <button
                        onClick={() => {
                          onDeleteTask(task.id)
                        }}
                        className='btn btn-danger ms-2'
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Home
