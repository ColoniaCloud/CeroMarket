import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import MissionZeroWaste from "./pages/MissionZeroWaste";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Blog from "./pages/Blog";
import PostDetail from "./pages/PostDetail";
import Recipes from "./pages/Recipes";
import Contact from "./pages/Contact";
import Careers from "./pages/Careers";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre-nosotros" element={<AboutUs />} />
          <Route path="/mision-zero-waste" element={<MissionZeroWaste />} />
          <Route path="/productos" element={<Products />} />
          <Route path="/producto/:slug" element={<ProductDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<PostDetail />} />
          <Route path="/recetas" element={<Recipes />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/trabaja-con-nosotros" element={<Careers />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
