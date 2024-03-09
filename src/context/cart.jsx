import { createContext, useReducer } from "react";

export const CartContext = createContext()

const initialState = JSON.parse(window.localStorage.getItem("cart")) || []

const updateLocalStorageFromState = state => window.localStorage.setItem("cart", JSON.stringify(state));

const reducer = (state, action) => {
    const { type, payload } = action
    switch (type) {
        case 'ADD_TO_CART':
            {
                const productInCartIndex = state.findIndex(item => item.id === payload.id);
                if (productInCartIndex >= 0) {
                    const newState = structuredClone(state);
                    newState[productInCartIndex].quantity++;
                    updateLocalStorageFromState(newState);
                    return newState
                }
                const newState = [...state, {
                    ...payload,
                    quantity: 1
                }]
                updateLocalStorageFromState(newState);
                return newState
            }
        case 'REMOVE_FROM_CART':
            {
                const id = payload
                const newState = state.filter(item => item.id !== id)
                updateLocalStorageFromState(newState);
                return newState
            }
        case 'CLEAR_CART':
            {
                updateLocalStorageFromState([])
                return [];
            }
    }
    return state;
}
export function CartProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState)
    const addToCart = product => dispatch({ type: 'ADD_TO_CART', payload: product })
    const removeFromCart = id => dispatch({ type: 'REMOVE_FROM_CART', payload: id })
    const clearCart = () => dispatch({ type: 'CLEAR_CART' })
    return (
        <CartContext.Provider value={{
            cart: state,
            addToCart,
            clearCart,
            removeFromCart
        }}>
            {children}
        </CartContext.Provider>
    )
}