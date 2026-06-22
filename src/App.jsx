import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Programs from './components/sections/Programs';
import Gallery from './components/sections/Gallery';
import Network from './components/sections/Network';
import Infrastructure from './components/sections/Infrastructure';
import CallToAction from './components/sections/CallToAction';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Programs />
        <Gallery />
        <Network />
        <Infrastructure />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}

export default App;
