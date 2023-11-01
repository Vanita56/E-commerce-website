import {createContext, useEffect, useState} from'react';

const addCartItem= (cartItems, productToAdd)=>{
// Find the cart items  contains productToAdd
const existingCartitem= cartItems.find(
    (cartItem)=> cartItem.id===productToAdd.id)
// if found, increment quantity

if(existingCartitem){
    return cartItems.map((cartItem)=>
    cartItem.id===productToAdd.id
    ?  {...cartItem, quantity:cartItem.quantity+1}
    : cartItem)
};
//return new array with modified cartItems/ nea cart item
return [...cartItems, {...productToAdd, quantity:1}];

};

export const CartContext = createContext({
    isCartOpen:false,
    setIsOpen:()=>{},
    cartItems:[],
    addItemToCart: ()=>{},
    cartCout:0
});

export const CartProvider =({children})=>{
    const [isCartOpen, setIsCartOpen] =useState(false);
    const [cartItems, setCartItems ] =useState([]);
    const [cartCount, setCartCount] =useState(0);

useEffect(()=>{
    const newCartCount =cartItems.reduce(
        (total, cartItem)=> total + cartItem.quantity, 0);
        setCartCount(newCartCount);
}, [cartItems])


    const addItemToCart= (productToAdd)=>{
        setCartItems(addCartItem(cartItems, productToAdd));
    }
    const value={isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount};

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
};


