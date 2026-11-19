import Hero from "../components/Hero";
import SustainableProposal from "../components/SustainableProposal";
import ProductsCarousel from "../components/ProductsCarousel";
import PostsCarousel from "../components/PostsCarousel";

function Home() {
  return (
    <>
      <Hero />
      <SustainableProposal />
      <ProductsCarousel />
      <PostsCarousel />
    </>
  );
}

export default Home;
