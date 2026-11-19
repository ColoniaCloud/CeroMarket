import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const image =
    product?.featuredImage?.node?.sourceUrl ||
    product?.image?.sourceUrl ||
    product?.images?.nodes?.[0]?.sourceUrl ||
    "";

  return (
    <div className="group">
      <div className="relative w-full h-64 bg-gray-100 rounded-[5px] overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <img
              src="https://api.ceromarket.com.uy/wp-content/uploads/2025/08/logo-oscuro.png"
              alt="CeroMarket placeholder"
              className="object-contain max-h-28 opacity-40"
            />
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-black/30">
          <Link
            to={`/producto/${product.slug}`}
            className="btn-glass bg-white/10 text-white font-bold px-4 py-2 rounded"
          >
            Ver producto
          </Link>
        </div>
      </div>
      <h4 className="mt-[10px] text-center text-[0.95rem] font-medium">
        {product.name}
      </h4>
    </div>
  );
}

export default ProductCard;
