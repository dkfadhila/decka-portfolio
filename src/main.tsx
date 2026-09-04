import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import { LanguageProvider } from './i18n';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Experience from './pages/Experience';
import Work from './pages/Work';
import WorkDetail from './pages/WorkDetail';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Content from './pages/Content';
import Creative from './pages/Creative';
import Credentials from './pages/Credentials';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="experience" element={<Experience />} />
            <Route path="work" element={<Work />} />
            <Route path="work/:slug" element={<WorkDetail />} />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/:slug" element={<ProjectDetail />} />
            <Route path="content" element={<Content />} />
            <Route path="creative" element={<Creative />} />
            <Route path="credentials" element={<Credentials />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  </StrictMode>
);
