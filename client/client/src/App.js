import { Route, Routes } from 'react-router-dom'
import Signin from './screens/Signin'
import Signup from './screens/Signup'
import Home from './screens/Home'
import CreateTask from './screens/CreateTask'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <div>
      <Routes>
        <Route
          path='/'
          element={<Signin />}
        />
        <Route
          path='/signup'
          element={<Signup />}
        />
        <Route
          path='/home'
          element={<Home />}
        />
        <Route
          path='/create-task'
          element={<CreateTask />}
        />
      </Routes>

      <ToastContainer />
    </div>
  )
}

export default App
