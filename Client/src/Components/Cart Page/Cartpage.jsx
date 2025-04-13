// import { useEffect, useState } from "react";
// import axios from "axios";
// import CartItems from "./CartItems";

// function Cartpage() {
//   const [cartItems, setCartItems] = useState([]);

//   const token = localStorage.getItem("token");

//   const fetchCart = async () => {
//     try {
//       const res = await axios.get("http://localhost:7000/api/auth/Cart", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setCartItems(res.data.cart); // cart is assumed to be an array of { _id, product, quantity }
//     } catch (err) {
//       console.error("Error fetching cart:", err);
//     }
//   };

//   const handleRemove = async (cartItemId) => {
//     try {
//       await axios.delete(`http://localhost:7000/api/auth/delete/${cartItemId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       console.log(cartItemId)
//       // Remove from local state too
//       setCartItems((prev) => prev.filter((item) => item.product._id !== cartItemId));
//     } catch (err) {
//       console.error("Error removing cart item:", err);
//     }
//   };

//   useEffect(() => {
//     fetchCart();
//   }, []);

//   return (
//     <section className="section py-3">
//       <div className="container lg:w-[80%] w-full lg:flex gap-4">
//         <div className="leftPart lg:w-[70%] w-full">
//           <div className="py-2 bg-white sm:px-3 px-2 border-b border-gray-200">
//             <h2 className="text-black">Your Cart</h2>
//             <p>
//               There are <span className="font-bold">{cartItems.length}</span> products in your cart.
//             </p>
//           </div>

//           <div className="shadow-md rounded-md bg-white max-h-[450px] overflow-y-scroll">
//             {cartItems.length > 0 ? (
//               cartItems.map((item) => (
//                 <CartItems
//                   key={item.product._id}
//                   cartItemId={item.product._id}
//                   product={item.product}
//                   onRemove={handleRemove}
//                 />
//               ))
//             ) : (
//               <p className="p-4 text-gray-500">Your cart is empty.</p>
//             )}
//           </div>
//         </div>

//         <div className="rightPart lg:w-[30%] w-full mt-4 lg:mt-0">
//           {/* Optional: Add your TotalPrice component here */}
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Cartpage;


// Cartpage.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import CartItems from "./CartItems";

function Cartpage() {
  const [cartItems, setCartItems] = useState([]);
  const token = localStorage.getItem("token");

  // Fetch cart data
  const fetchCart = async () => {
    try {
      const res = await axios.get("http://localhost:7000/api/auth/Cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(res.data.cart);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  // Handle remove from cart
  const handleRemove = async (cartItemId) => {
    try {
      await axios.delete(`http://localhost:7000/api/auth/delete/${cartItemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems((prev) => prev.filter((item) => item.product._id !== cartItemId));
    } catch (err) {
      console.error("Error removing cart item:", err);
    }
  };

  // Handle quantity update
  const handleUpdateQuantity = async (productId, newQty) => {
    try {
      await axios.put(
        "http://localhost:7000/api/auth/update-quantity",
        { productId, quantity: newQty },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      // ✅ Update quantity locally
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.product._id === productId
            ? { ...item, quantity: newQty }
            : item
        )
      );
    } catch (err) {
      alert(err.response?.data?.message || "Error updating quantity");
      console.error(err);
    }
  };
  

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <section className="section py-3">
      <div className="container lg:w-[80%] w-full lg:flex gap-4">
        <div className="leftPart lg:w-[70%] w-full">
          <div className="py-2 bg-white sm:px-3 px-2 border-b border-gray-200">
            <h2 className="text-black">Your Cart</h2>
            <p>
              There are <span className="font-bold">{cartItems.length}</span> products in your cart.
            </p>
          </div>

          <div className="shadow-md rounded-md bg-white max-h-[450px] overflow-y-scroll">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <CartItems
                  key={item.product._id}
                  cartItemId={item.product._id}
                  product={item.product}
                  quantity={item.quantity}
                  onRemove={handleRemove}
                  onUpdateQuantity={handleUpdateQuantity}
                />
              ))
            ) : (
              <p className="p-4 text-gray-500">Your cart is empty.</p>
            )}
          </div>
        </div>

        <div className="rightPart lg:w-[30%] w-full mt-4 lg:mt-0">
          {/* Optional: Add your TotalPrice component here */}
        </div>
      </div>
    </section>
  );
}

export default Cartpage;

