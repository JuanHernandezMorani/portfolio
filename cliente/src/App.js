import './styles/App.css';
import React, { useEffect } from 'react';
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from './actions';
import Home from './routes/home.jsx';
import Footer from './components/footer/footer.jsx';
import { Navbar } from './components/navbar/navbar.jsx';
import Contacto from './routes/contacto.jsx';
import Projects from './routes/projects.jsx';
import About from './routes/about.jsx';
import CreationForm from './components/creationForm/creationForm.jsx';
import ProtectedRoute from './components/protectedRoute/protectedRoute.jsx';
import ErrorPage from './routes/errorPage.jsx';
import CurriculumVitae from './routes/curriculumVitae.jsx';

function App() {
    const dispatch = useDispatch();
    const projects = useSelector(state => state.OriginalProjects);
    const needsUpdate = useSelector(state => state.needsUpdate);

    useEffect(() => {
      if (!sessionStorage.getItem("sessionActive")) {
          sessionStorage.setItem("sessionActive", "true");
      }

      if (needsUpdate || projects.length === 0) {
          dispatch(getProjects());
      }

      const interval = setInterval(() => {
          dispatch(getProjects());
      }, 5 * 60 * 1000);

      return () => clearInterval(interval);
  }, [dispatch, needsUpdate, projects.length]);

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route exact path="/" element={<Home projects={projects}/>} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/projects" element={<Projects />} />
            <Route exact path="/contact" element={<Contacto />} />
            <Route path="*" element={<ErrorPage />} />
            <Route path='/cv' element={<CurriculumVitae />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/projects/:uuid" element={<CreationForm />} />
              <Route path="/addProject" element={<CreationForm />} />
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;