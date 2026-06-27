import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home               from './pages/Home';
import About              from './pages/About';
import ResourceEvaluation from './pages/ResourceEvaluation';
import LaboratoryTesting  from './pages/LaboratoryTesting';
import MinePlanning       from './pages/MinePlanning';
import Environmental      from './pages/Environmental';
import ProjectDesign      from './pages/ProjectDesign';
import Permits            from './pages/Permits';
import Commissioning      from './pages/Commissioning';
import Experience         from './pages/Experience';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main style={{ paddingTop: 72 }}>
        <Routes>
          <Route path="/"                    element={<Home />} />
          <Route path="/about"               element={<About />} />
          <Route path="/resource-evaluation" element={<ResourceEvaluation />} />
          <Route path="/laboratory"          element={<LaboratoryTesting />} />
          <Route path="/mine-planning"       element={<MinePlanning />} />
          <Route path="/environmental"       element={<Environmental />} />
          <Route path="/project-design"      element={<ProjectDesign />} />
          <Route path="/permits"             element={<Permits />} />
          <Route path="/commissioning"       element={<Commissioning />} />
          <Route path="/experience"          element={<Experience />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
