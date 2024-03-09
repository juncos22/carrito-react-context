import { useCart } from '../hooks/useCart';
import '../styles/Products.css';
import { AddToCartIcon, RemoveFromCartIcon } from "./Icons";

export default function Products({ products }) {
    const { addToCart, cart, removeFromCart } = useCart();
    const checkProductInCart = product => {
        console.log(cart);
        return cart.some(item => item.id === product.id);
    }
    return (
        <main className='products'>
            <ul>
                {
                    products.slice(0, 10).map(p => {
                        const isProductInCart = checkProductInCart(p);
                        return (
                            <li key={p.id}>
                                <img src={p.thumbnail} alt={p.title} />
                                <div>
                                    <strong>{p.title} - ${p.price}</strong>
                                </div>
                                <div>
                                    <button
                                        style={{ backgroundColor: isProductInCart ? 'red' : '#09f' }}
                                        onClick={() => isProductInCart
                                            ? removeFromCart(p.id)
                                            : addToCart(p)}>
                                        {
                                            isProductInCart
                                                ? <RemoveFromCartIcon />
                                                : <AddToCartIcon />
                                        }
                                    </button>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </main>
    )
}
