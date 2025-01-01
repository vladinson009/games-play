import { Routes, Route } from 'react-router-dom';

import Header from "./components/header/Header";
import HomePage from "./components/home/HomePage";

import CataloguePage from './components/games/CataloguePage';
import CreatePage from './components/games/CreatePage';
import DetailsPage from './components/games/DetailsPage';
import EditPage from './components/games/EditPage';
import LoginPage from './components/user/LoginPage';
import RegisterPage from './components/user/RegisterPage';


function App() {

  return (
    <>
      <Header />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/games">
            <Route path="catalogue" element={<CataloguePage />} />
            <Route path="create" element={<CreatePage />} />
            <Route path="details" element={<DetailsPage />} />
            <Route path="edit" element={<EditPage />} />
          </Route>
          <Route path="/users">
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>
        </Routes>
      </main>
    </>
  )
}

export default App
