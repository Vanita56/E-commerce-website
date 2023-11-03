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


 
const removeCartItem= (cartItems, cartItemToRemove)=>{
    //find the cart item to remove

    const existingCartitem= cartItems.find(
        (cartItem)=> cartItem.id===cartItemToRemove.id)
    //check if cart quanitity is one . if it is remove form the cart

    if(existingCartitem.quantity===1){
       return cartItems.filter((cartItem)=> cartItem.id!==cartItemToRemove.id)
    }
    //return back cartitems with matching cartitems with reduced quantity
    if(existingCartitem){
        return cartItems.map((cartItem)=>
        cartItem.id===cartItemToRemove.id
        ?  {...cartItem, quantity:cartItem.quantity-1}
        : cartItem)
    };
} 


export const CartContext = createContext({
    isCartOpen:false,
    setIsOpen:()=>{},
    cartItems:[],
    addItemToCart: ()=>{},
    removeItemFromCart:()=>{},
    cartCout:0,
    cartTotal:0
});

export const CartProvider =({children})=>{
    const [isCartOpen, setIsCartOpen] =useState(false);
    const [cartItems, setCartItems ] =useState([]);
    const [cartCount, setCartCount] =useState(0);
    const [cartTotal, setCartTotal] =useState(0);

useEffect(()=>{
    const newCartCount =cartItems.reduce(
        (total, cartItem)=> total + cartItem.quantity, 0);
        setCartCount(newCartCount);
}, [cartItems]);

useEffect(()=>{
    const newCartTotal =cartItems.reduce(
        (total, cartItem)=> total + cartItem.quantity * cartItem.price, 0);
        setCartTotal(newCartTotal);
}, [cartItems])


    const addItemToCart= (productToAdd)=>{
        setCartItems(addCartItem(cartItems, productToAdd));
    }
    const removeItemToCart= (cartItemToRemove)=>{
        setCartItems(removeCartItem(cartItems,cartItemToRemove ));
    };
   
    const value={isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, removeItemToCart, cartTotal};

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
};


