import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { addTask } from '../services/task'

function CreateTask() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const navigate = useNavigate()

  const onAdd = async () => {
    if (title.length === 0) {
      toast.warn('Title is required')
    } else if (description.length === 0) {
      toast.warn('Description is required')
    } else {
      const response = await addTask(title, description)
      if (response.status == 201) {
        toast.success('Task added successfully')
        navigate(-1)
      } else {
        toast.error('Error while adding a task')
      }
    }
  }

  return (
    <div className='container'>
      <h1 className='page-header'>CreateTask</h1>
      <div style={{ width: '50%', margin: 'auto' }}>
        <div className='mb-3'>
          <label htmlFor=''>Title</label>
          <input
            onChange={(e) => setTitle(e.target.value)}
            type='text'
            className='form-control'
          />
        </div>

        <div className='mb-3'>
          <label htmlFor=''>Description</label>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            type='text'
            className='form-control'
          />
        </div>

        <div className='mb-3'>
          <button
            onClick={onAdd}
            className='btn btn-success'
          >
            Add
          </button>
          <button
            onClick={() => navigate(-1)}
            className='btn btn-danger ms-2'
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateTask
