import { House, Info, ShoppingBag, Trash2 } from "lucide-react";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../App";

export default function Header() {
  const { cart, handleDeleteCart } = useContext(CartContext)
  const [showCart, setShowCart] = useState(false)
  return (
    <>
      <header className="flex w-full items-center justify-between bg-slate-100 p-4 shadow-lg">
        <div className="flex w-1/2  items-center gap-1">
          <img src="vite.svg" alt="" />
          <h1>Nebula Project</h1>
        </div>
        <nav className="flex w-1/2">
          <ul className=" w-full flex justify-evenly ">
            <li className="flex items-center gap-2">
              <House />
              <Link to="/"> Home</Link>
            </li>
            <li className="flex items-center gap-2 relative">
              <button onClick={() => setShowCart(!showCart)} className="w-12 flex relative">
                <ShoppingBag />
                <span className="absolute right-0 size-4 text-xs bg-red-400 rounded-full text-slate-100">{cart.length}</span>
              </button>
              {showCart && (<div className="w-[200px] flex flex-col items-center justify-center absolute top-12 bg-white rounded-lg shadow-md">
                {cart && cart.length !== 0 ? (
                  <>
                    {cart.map((itemCart) => (
                      <div key={itemCart.id} className="flex items-center justify-start gap-4 mb-4 p-2">
                        <img src={itemCart.product.image} className="w-8" />
                        <p className="text-xs"><span className="capitalize">{itemCart.product.name}</span> x {itemCart.qty}</p>
                        <button onClick={() => handleDeleteCart(itemCart.id)}><Trash2 /></button>
                      </div>
                    ))}
                    <Link to="/cart" onClick={() => setShowCart(!showCart)}>Show More...</Link>
                  </>
                )
                  : (
                    <div className="mb-4 p-2">
                      item kosong
                    </div>)}
              </div>)}
            </li>
            <li className="flex items-center gap-2">
              <Info />
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>

      </header>

    </>
  );
}
