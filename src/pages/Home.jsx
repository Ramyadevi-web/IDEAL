import Page from '../components/Page';
import Hero from '../components/Hero';
import { About, Stats } from '../components/About';
import Values from '../components/Values';
import Leadership from '../components/Leadership';
import { Academics, WhyChooseUs } from '../components/Academics';
import { Infrastructure, Gallery } from '../components/Campus';
import { Admissions, News, Testimonials, Downloads, CtaBand } from '../components/Admissions';
import { Contact } from '../components/Contact';

export default function Home() {
  return (
    <Page>
      <Hero />
      <About />
      <Stats />
      <Values showLink />
      <Leadership />
      <Academics />
      <WhyChooseUs />
      <Infrastructure />
      <Gallery />
      <Admissions />
      <News />
      <Testimonials />
      <Downloads />
      <CtaBand />
      <Contact />
    </Page>
  );
}
