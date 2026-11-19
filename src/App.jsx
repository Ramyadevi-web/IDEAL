import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TopBar, Header, Ticker } from './components/Header';
import { Footer } from './components/Contact';
import { WhatsAppWidget, BackToTop } from './components/Floating';
import Home from './pages/Home';
import { AboutUs, LeaderPage, VisionMission } from './pages/AboutPages';
import { Curriculum, Timings, CCA, Certificates } from './pages/AcademicsPages';
import { GalleryIndex, GalleryAlbum, FieldTrip, Achievements } from './pages/AlbumPages';
import { InfrastructurePage, AdmissionsPage, ContactPage, FeedbackPage, JobEnquiryPage, NotFound } from './pages/OtherPages';

/** Scroll to top on page change, or to #section when the link has a hash */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const id = hash.slice(1);
    const go = () => {
      const el = id && document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      else window.scrollTo({ top: 0, behavior: 'instant' });
      ScrollTrigger.refresh();
    };
    const t = setTimeout(go, id ? 120 : 0);
    return () => clearTimeout(t);
  }, [pathname, hash]);
  return null;
}

// Old website addresses (…/curriculum.php) → new pages, so Google links keep working
const legacy = {
  'index.php': '/', 'about-us.php': '/about', 'chairman.php': '/about/chairman', 'principal.php': '/about/principal',
  'visionmission.php': '/about/vision-mission', 'curriculum.php': '/academics/curriculum', 'timings.php': '/academics/timings',
  'cca.php': '/academics/cca', 'achivements.php': '/achievements', 'infrastructure.php': '/infrastructure',
  'field-trip.php': '/field-trip', 'admissions.php': '/admissions', 'contact-us.php': '/contact',
  'feedback.php': '/feedback', 'jobinquiry.php': '/job-enquiry',
};

export default function App() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <ScrollManager />
      <TopBar />
      <Header />
      <Ticker />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/about/vision-mission" element={<VisionMission />} />
        <Route path="/about/:slug" element={<LeaderPage />} />
        <Route path="/academics" element={<Navigate to="/academics/curriculum" replace />} />
        <Route path="/academics/curriculum" element={<Curriculum />} />
        <Route path="/academics/timings" element={<Timings />} />
        <Route path="/academics/cca" element={<CCA />} />
        <Route path="/academics/certificates" element={<Certificates />} />
        <Route path="/achievements/:year?" element={<Achievements />} />
        <Route path="/infrastructure" element={<InfrastructurePage />} />
        <Route path="/gallery" element={<GalleryIndex />} />
        <Route path="/gallery/:cat/:year?" element={<GalleryAlbum />} />
        <Route path="/field-trip/:year?" element={<FieldTrip />} />
        <Route path="/admissions" element={<AdmissionsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/job-enquiry" element={<JobEnquiryPage />} />
        {Object.entries(legacy).map(([from, to]) => (
          <Route key={from} path={`/${from}`} element={<Navigate to={to} replace />} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <WhatsAppWidget />
      <BackToTop />
    </>
  );
}
