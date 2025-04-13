import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useLocation } from 'react-router-dom';

function ProductList() {
  const location = useLocation();
  const { category } = location.state || {};

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const { data } = await axios.get("http://localhost:7000/api/client/productsbycategory");
        if (data.success && Array.isArray(data.categories)) {
          const categoryData = data.categories.find(cat => cat.category === category);
          if (categoryData) {
            setProducts(categoryData.products);
          } else {
            setProducts([]);
          }
        }
      } catch (error) {
        console.error("Error fetching category products:", error);
      }
    };

    if (category) {
      fetchCategoryProducts();
    }
  }, [category]);

 
  
  const handleAddToCart = async (product) => {
    try {
      const response = await axios.post(
        'http://localhost:7000/api/auth/Cart', // replace with actual route
        {
          productId: product._id,
          quantity: 1,
        },

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // If using JWT auth
          },
        }
      );
  
      if (response.data?.cart) {
        console.log("Added to cart successfully", response.data.cart);
        // Optionally show a toast or UI update
      }
    } catch (error) {
      console.error("Error adding to cart:", error.response?.data || error.message);
    }
  };
  

  const handleAddToWishlist = (product) => {
    console.log("Add to Wishlist clicked:", product);
    // Add API call or wishlist logic here
  };

  return (
    <div>
      <h1 className="text-center text-2xl md:text-3xl font-bold text-gray-800 my-8">
        🎂 {category ? `${category} Products` : 'Birthday Wish List'}
      </h1>

      <div className="container border bg-white border-none m-auto !my-8 py-8">
        <div className="items flex gap-5 flex-wrap justify-center">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product._id} className="productItem bg-white mb-4 rounded overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 max-w-xs">
                <div className="imgWrapper w-full h-[300px] sm:h-[280px] overflow-hidden pb-2">
                  <img
                    src={product?.images?.[0]?.url || "/default-image.jpg"}
                    alt={product?.images?.[0]?.altText || product?.title}
                    className="w-full h-full object-cover duration-300 group-hover:scale-105 transition-all"
                  />
                </div>

                <div className="info pb-4 px-4 text-center">
                  <h3 className="text-gray-700 text-sm md:text-base font-semibold p-1">
                    {product.title}
                  </h3>
                  <h2 className="text-gray-900 text-sm md:text-lg font-semibold mb-2">
                    ₹{product.price}
                  </h2>

                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-xs md:text-sm px-3 py-1 rounded"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => handleAddToWishlist(product)}
                      className="bg-pink-500 hover:bg-pink-600 text-white text-xs md:text-sm px-3 py-1 rounded"
                    >
                      Wishlist
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No products found for this category.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductList;
