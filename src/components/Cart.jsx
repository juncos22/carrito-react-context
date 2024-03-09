import { useId } from 'react';
import { CartIcon, ClearCartIcon } from './Icons.jsx';
import React from 'react'
import '../styles/Cart.css';
import { useCart } from '../hooks/useCart.js';
function CartItem({ thumbnail, title, price, quantity, addToCart }) {
    return (
        <li>
            <img src={thumbnail} alt={title} />
            <div>
                <strong>{title}</strong> - ${price}
            </div>
            <footer>
                <small>Qty: {quantity}</small>
                <button onClick={addToCart}>+</button>
            </footer>
        </li>
    )
}
export function Cart() {
    const cartCheckBoxId = useId()
    const { cart, clearCart, addToCart } = useCart();
    return (
        <>
            <label htmlFor={cartCheckBoxId} className='cart-button'>
                <CartIcon />
            </label>
            <input id={cartCheckBoxId} type="checkbox" hidden />
            <aside className='cart'>
                <ul>
                    {
                        cart.map((item) => (
                            <CartItem
                                key={item.id}
                                thumbnail={item.thumbnail}
                                title={item.title}
                                price={item.price}
                                quantity={item.quantity}
                                addToCart={() => addToCart(item)}
                            />
                        ))
                    }
                </ul>
                <button onClick={clearCart}>
                    <ClearCartIcon />
                </button>
            </aside>
        </>
    )
}
