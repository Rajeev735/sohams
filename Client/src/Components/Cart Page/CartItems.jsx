// import React from "react";
// import PropTypes from "prop-types";
// import { Link } from "react-router-dom";
// import { FaRegHeart } from "react-icons/fa";
// import { GoGitCompare } from "react-icons/go";
// import { IoCloseSharp } from "react-icons/io5";
// import Rating from "@mui/material/Rating";

// function CartItems({ product, cartItemId, onRemove }) {


//   return (
//     <div className="cartitems border-b border-gray-100 w-full sm:p-3 p-3 flex items-center sm:gap-4 gap-3">
//       <div className="img lg:!w-[15%] w-[20%] rounded-md overflow-hidden">
//         <Link to={`/productdetails/${product?._id}`} className="group">
//           <img
//             src={product?.image || "https://via.placeholder.com/150"}
//             alt={product?.title}
//             className="w-full group-hover:scale-105 transition-all"
//           />
//         </Link>
//       </div>

//       <div className="info w-[75%] sm:w-[85%] relative">
//         <IoCloseSharp
//           onClick={() => onRemove(cartItemId)}
//           className="cursor-pointer link transition-all absolute md:!top-[-3] !top-[0px] sm:!right-[10px] !right-[-8px] text-[14px] sm:text-[18px]"
//         />

//         <h3 className="md:text-[15px] text-[11px] text-black">
//           <Link to={`/productdetails/${product._id}`} className="link">
//             {product.title}
//           </Link>
//         </h3>

//         <div className="flex items-center sm:py-2 gap-1 sm:gap-3">
//           <span className="text-gray-400 sm:!text-[15px] text-[11px]">
//             Brand:
//             <span className="font-[400] text-[10px] sm:!text-[14px] text-gray-600 pl-1">
//               {product.brand || "No Brand"}
//             </span>
//           </span>
//           <Rating name="size-small" defaultValue={4} size="small" readOnly />
//           <span className="text-[10px] sm:!text-[14px] cursor-pointer">
//             Reviews 5
//           </span>
//         </div>

//         <div className="flex items-center gap-4 my-1">
//           <span className="text-black sm:text-[15px] text-[13px] font-[600]">
//             ₹{product.price}
//           </span>
//           <span className="line-through text-gray-500 text-[10px] sm:!text-[14px] font-[500]">
//             ₹{product.oldprice}
//           </span>
//           <span className="text-[#7d0492] sm:text-[14px] text-[10px] font-[600]">
//             {product.discount}% off
//           </span>
//         </div>

//         {/* <div className="flex sm:gap-4 gap-2 items-center sm:pt-2 sm:mb-1">
//           <span className="flex items-center gap-2 text-[10px] sm:text-[14px] link cursor-pointer font-[500]">
//             <FaRegHeart className="sm:text-[16px] text-[12px]" /> Add to Wishlist
//           </span>
//           <span className="flex items-center gap-2 text-[10px] sm:text-[14px] link cursor-pointer font-[500]">
//             <GoGitCompare className="sm:text-[18px] text-[12px]" /> Add to Compare
//           </span>
//         </div> */}
//       </div>
//     </div>
//   );
// }

// CartItems.propTypes = {
//   product: PropTypes.object.isRequired,
//   cartItemId: PropTypes.string.isRequired,
//   onRemove: PropTypes.func.isRequired,
// };

// export default CartItems;


// CartItems.jsx
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";
import Rating from "@mui/material/Rating";

function CartItems({ product, cartItemId, onRemove, onUpdateQuantity, quantity }) {

  const handleIncrement = () => {
    onUpdateQuantity(cartItemId, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      onUpdateQuantity(cartItemId, quantity - 1);
    }
  };

  return (
    <div className="cartitems border-b border-gray-100 w-full sm:p-3 p-3 flex items-center sm:gap-4 gap-3">
      <div className="img lg:!w-[15%] w-[20%] rounded-md overflow-hidden">
        <Link to={`/productdetails/${product?._id}`} className="group">
          <img
            src={product?.image || "https://placehold.co/150"}
            alt={product?.title}
            className="w-full group-hover:scale-105 transition-all"
          />
        </Link>
      </div>

      <div className="info w-[75%] sm:w-[85%] relative">
        <IoCloseSharp
          onClick={() => onRemove(cartItemId)}
          className="cursor-pointer link transition-all absolute md:!top-[-3] !top-[0px] sm:!right-[10px] !right-[-8px] text-[14px] sm:text-[18px]"
        />

        <h3 className="md:text-[15px] text-[11px] text-black">
          <Link to={`/productdetails/${product._id}`} className="link">
            {product.title}
          </Link>
        </h3>

        <div className="flex items-center sm:py-2 gap-1 sm:gap-3">
          <span className="text-gray-400 sm:!text-[15px] text-[11px]">
            Brand:
            <span className="font-[400] text-[10px] sm:!text-[14px] text-gray-600 pl-1">
              {product.brand || "No Brand"}
            </span>
          </span>
          <Rating name="size-small" defaultValue={4} size="small" readOnly />
          <span className="text-[10px] sm:!text-[14px] cursor-pointer">
            Reviews 5
          </span>
        </div>

        <div className="flex items-center gap-4 my-1">
          <span className="text-black sm:text-[15px] text-[13px] font-[600]">
            ₹{(product.price * quantity).toFixed(2)}
          </span>
          <span className="line-through text-gray-500 text-[10px] sm:!text-[14px] font-[500]">
            ₹{product.oldprice}
          </span>
          <span className="text-[#7d0492] sm:text-[14px] text-[10px] font-[600]">
            {product.discount}% off
          </span>
        </div>


        <div className="flex items-center gap-3 pt-1">
          <button
            onClick={handleDecrement}
            className="bg-gray-600 px-2 rounded text-sm font-semibold"
          >
            -
          </button>
          <span className="font-medium text-sm">{quantity}</span>
          <button
            onClick={handleIncrement}
            className="bg-gray-600 px-2 rounded text-sm font-semibold"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

CartItems.propTypes = {
  product: PropTypes.object.isRequired,
  cartItemId: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
  onUpdateQuantity: PropTypes.func.isRequired,
  quantity: PropTypes.number.isRequired,
};

export default CartItems;
