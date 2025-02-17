import './styles/App.css';
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from './routes/home.jsx';
import Footer from './components/footer/footer.jsx';
import Navbar from './components/navbar/navbar.jsx';
import Contacto from './routes/contacto.jsx';
import Projects from './routes/projects.jsx';
import About from './routes/about.jsx';
import CreationForm from './components/creationForm/creationForm.jsx';
import ProtectedRoute from './components/protectedRoute/protectedRoute.jsx';
import ErrorPage from './routes/errorPage.jsx';

function App() {
  return (
    <BrowserRouter>
          <div className="App">
            <Navbar />
             <Routes>
                <Route exact path="/" element={<Home />}/>
                <Route exact path="/about" element={<About />}/>
                <Route exact path="/projects" element={<Projects />}/>
                <Route exact path="/contact" element={<Contacto />}/>
                <Route path="*" element={<ErrorPage />} />

                <Route element={<ProtectedRoute />}>
                  <Route path="/projects/:uuid/edit" element={<EditForm />} />
                  <Route path="/addProject" element={<CreationForm />} />
                </Route>
            </Routes>
            <Footer />
          </div>
    </BrowserRouter>
  );
}

export default App;