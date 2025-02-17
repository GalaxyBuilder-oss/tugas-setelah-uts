import { createContext, useState } from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
// import { createContext, useContext } from "react";

// const ThemeContext = createContext(null);

// export default function App() {
//   return (
//     <ThemeContext.Provider value="dark">
//       <Form />
//     </ThemeContext.Provider>
//   );
// }

// function Form() {
//   return (
//     <Panel title="Welcome">
//       <Button>Sign up</Button>
//       <Button>Log in</Button>
//     </Panel>
//   );
// }

// function Panel({ title, children }) {
//   const theme = useContext(ThemeContext);
//   const className = "panel-" + theme;
//   return (
//     <section className={className}>
//       <h1>{title}</h1>
//       {children}
//     </section>
//   );
// }

// function Button({ children }) {
//   const theme = useContext(ThemeContext);
//   const className = "button-" + theme;
//   return <button className={className}>{children}</button>;
// }
export const CartContext = createContext();
export default function App() {
  const [cart, setCart] = useState([])

  function handleDeleteCart(id) {
    setCart(cart.filter((item) => item.id !== id))
  }
  return (
    <CartContext.Provider value={{ cart, setCart, handleDeleteCart }}>
      <Header />
      <Outlet />
      <Footer />
    </CartContext.Provider>
  );
}
