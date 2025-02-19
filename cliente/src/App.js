import './styles/App.css';
import React, { useEffect, useState } from 'react';
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

function App() {
    const [charge, setCharge] = useState(false);
    const dispatch = useDispatch();
    const projects = useSelector(state => state.OriginalProjects);

    useEffect(() => {
            if (!charge) {
                dispatch(getProjects());
                setCharge(true);
            }
        }, [dispatch, charge, projects]);

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