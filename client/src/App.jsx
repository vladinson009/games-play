import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Header from "./components/header/Header";
import HomePage from "./components/home/HomePage";
import CataloguePage from './components/games/CataloguePage';
import CreatePage from './components/games/CreatePage';
import DetailsPage from './components/games/DetailsPage';
import EditPage from './components/games/EditPage';
import LoginPage from './components/user/LoginPage';
import RegisterPage from './components/user/RegisterPage';
import LogoutPage from './components/user/LogoutPage.jsx';

import sessionCtx from './util/sessionContext.js';
import DeletePage from './components/games/DeletePage.jsx';

function App() {
  const [session, setSession] = useState({})
  const sessionContext = sessionCtx
  useEffect(() => {
    const session = JSON.parse(sessionStorage.getItem('auth'))
    if (session) {
      setSession(session)
    }
  }, [])

  return (
    <sessionContext.Provider value={{ session, setSession }}>
      <Header />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/games">
            <Route path="catalogue" element={<CataloguePage />} />
            <Route path="create" element={<CreatePage />} />
            <Route path="details/:gameId" element={<DetailsPage />} />
            <Route path="edit/:gameId" element={<EditPage />} />
            <Route path="delete/:gameId" element={<DeletePage />} />
          </Route>
          <Route path="/users">
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="logout" element={<LogoutPage />} />
          </Route>
        </Routes>
      </main>
    </sessionContext.Provider >
  )

}

export default App
