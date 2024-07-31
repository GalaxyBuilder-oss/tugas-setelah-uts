import { useContext } from 'react';
import { CartContext } from '../App';
import { TrashIcon } from 'lucide-react';

const Cart = () => {
  const { cart, handleDeleteCart } = useContext(CartContext);

  return (
    <div className="min-h-96 m-4 p-4 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>
      {cart && cart.map((itemCart) => (
        <div key={itemCart.id} className="flex items-center gap-4 mb-4 p-4 bg-white rounded-lg shadow-md">
          <img src={itemCart.product.image} className="w-12" />
          <div>
            <h3 className="text-lg font-bold capitalize">{itemCart.product.name}</h3>
            <p className="text-gray-700">{itemCart.qty} x Rp. {Intl.NumberFormat('IDR').format(itemCart.product.price)}</p>
          </div>
          <div>
            <button onClick={() => handleDeleteCart(itemCart.id)}><TrashIcon /></button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cart;
