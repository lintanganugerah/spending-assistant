import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import PageNotFound from './pages/PageNotFound'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path='*' Component={PageNotFound} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
