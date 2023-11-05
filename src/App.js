import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import CreateGuessPage from './pages/CreateGuessPage/CreateGuessPage'
import EditGuessPage from './pages/EditGuessPage/EditGuessPage'
import GameplayPage from './pages/GameplayPage/GameplayPage'
import MagicLinkPage from './pages/MagicLinkPage/MagicLinkPage'
import MainPage from './pages/MainPage/MainPage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="magic-link" element={<MagicLinkPage />} />
          <Route path="guess-play/:gameId" element={<GameplayPage />} />
          <Route path="create-guess" element={<CreateGuessPage />} />
          <Route path="create-guess/question/:id" element={<CreateGuessPage />} />
          <Route path="edit-guess/:gameId" element={<EditGuessPage />} />
          <Route path="edit-guess/:gameId/question/:id" element={<EditGuessPage />} />
          <Route path="profile/:id" element={<ProfilePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
