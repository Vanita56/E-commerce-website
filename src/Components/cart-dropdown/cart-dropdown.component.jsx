import { useContext, useState } from "react";
import { CartContext } from "../../contexts/cart.context";


import "./cart-dropdown.styles.scss";
import Button from "../button/button.component";

import CartItem from "../cart-item/cart-item.component";
import { useNavigate } from "react-router-dom";


const CartDropdown=()=>{
    const {cartItems} = useContext(CartContext);
    const navigate = useNavigate();
    const goToNavigatHandler =()=>{
        navigate('/checkout');
    }
    return(
        <div className="cart-dropdown-container">
            <div className="cart-items">
            {cartItems.length ?(
                cartItems.map((cartItem)=>
                (
                    <CartItem key={cartItem.id} cartItem={cartItem} />
                ))
            ):(
                <span className="Empty-message">Your cart is empty</span>
            )}
                <Button  onClick={goToNavigatHandler}>GO TO CHECKOUT</Button>
            </div>
        </div>

    )
}
export default CartDropdown;