import { useContext, useState } from "react";
import { CartContext } from "../../contexts/cart.context";


import {CartDropdownContainer, EmptyMessage, cartItems} from "./cart-dropdown.styles.jsx";
import Button from "../button/button.component";

import CartItem from "../cart-item/cart-item.component";
import { useNavigate } from "react-router-dom";


const CartDropdown=()=>{
    const {cartItems} = useContext(CartContext);
    const navigate = useNavigate();
    const goToCheckoutHandler =()=>{
        navigate('/checkout');
    }
    return(
        <CartDropdownContainer>
            <cartItems>
            {cartItems.length ?(
                cartItems.map((cartItem)=>
                (
                    <CartItem key={cartItem.id} cartItem={cartItem} />
                ))
            ):(
                <EmptyMessage >Your cart is empty</EmptyMessage>
            )}
                <Button  onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
            </cartItems>
        </CartDropdownContainer>

    )
}
export default CartDropdown;