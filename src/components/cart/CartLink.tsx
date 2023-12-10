import "../../styles/CartLink.scss";
import { useAppSelector } from "../../app/hooks";
import {  getMemoizedNumItems } from "../../features/cart/cartSlice";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"; 

export function CartLink() {
  const numItems = useAppSelector(getMemoizedNumItems);
  return (
    <Link to="/cart" className="cart-link">
      <span className="cart-link-text">
        <ShoppingCartIcon /> {numItems ? numItems : "Cart"}
      </span>
    </Link>
  );
}
