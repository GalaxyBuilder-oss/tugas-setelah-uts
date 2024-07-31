import { useState, useEffect, useContext } from "react";
import { Trash, SquarePen, ShoppingCartIcon } from "lucide-react";
import { Plus, Search } from "lucide-react";
import { CartContext } from "../App";

let initialProducts = [
  {
    id: 1,
    name: "Baju Gamis",
    price: 1400000,
    image:
      "https://tse3.mm.bing.net/th?id=OIP.DSCozuVAabLMXEx86PsXbAHaJQ&pid=Api&P=0&h=180",
  },
  {
    id: 2,
    name: "Rok",
    price: 1800000,
    image:
      " https://sintesakonveksi.com/wp-content/uploads/2020/12/Bahan-Rok-Plisket.jpg",
  },
  {
    id: 3,
    name: "Baju koko",
    price: 1400000,
    image:
      "https://tse3.mm.bing.net/th?id=OIP.8wI2fSB4fpJPMXOzexK0YQHaKs&pid=Api&P=0&h=180",
  },
  {
    id: 4,
    name: "switer",
    price: 1400000,
    image:
      "https://down-id.img.susercontent.com/file/c2016a4a28b773db8424231c389903e9",
  },
  {
    id: 5,
    name: "jaket",
    price: 1400000,
    image:
      "https://tse1.mm.bing.net/th?id=OIP.LIIRo68qfjPsxlW9jna65gHaHa&pid=Api&P=0&h=180",
  },
];

const saveProduct = localStorage.getItem("products");

export default function Home() {
  const [products, setProducts] = useState(
    saveProduct ? JSON.parse(saveProduct) : initialProducts
  );
  const { cart, setCart } = useContext(CartContext)
  const [updateProduct, setUpdateProduct] = useState(null);
  const [addProduct, setAddProduct] = useState(null);

  // set urutan dari besar ke kecil atau sebaliknya
  const [orderBy, setOrderBy] = useState("asc");
  const [sortBy, setSortBy] = useState("id");
  const [query, setQuery] = useState("");

  // const sortedProduct = products.sort((a, b) => a.price - b.price);

  const filterData = products
    .sort((a, b) => {
      if (orderBy === "asc") {
        return a[sortBy] < b[sortBy] ? -1 : 1;
      } else {
        return a[sortBy] > b[sortBy] ? -1 : 1;
      }
    })
    .filter((item) => item.name.toLowerCase().includes(query.toLowerCase()));

  function handleDelete(product) {
    if (window.confirm("Apakah kamu yakin hapus ini?")) {
      setProducts(products.filter((p) => p.id !== product.id));
      setCart(cart.filter((item) => item.product.id !== product.id))
    }
  }

  function handleUpdate() {
    setProducts(
      products.map((a) => (a.id === updateProduct.id ? updateProduct : a))
    );
    setUpdateProduct(null);
  }

  function handleAddProduct() {
    const newId =
      products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
    setProducts([...products, { ...addProduct, id: newId }]);
    setAddProduct(null); //
  }

  function handleAddCart(product) {

    if (!cart.find((itemCart) => itemCart.product.id === product.id))
      setCart([...cart, {
        id: cart.length,
        product: product,
        qty: 1
      }])
    else
      setCart(cart.map((item) => {
        if (item.product.id === product.id)
          return { ...item, qty: item.qty + 1 }
        return item
      }))
    alert("Berhasil Tambah Keranjang")
  }

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  },[addProduct]);
  return (
    <div className="p-4 min-h-96">
      <div className="flex w-full items-center p-3">
        <div
          className="flex w-1/4 gap-2 justify-center"
          onClick={() => setAddProduct(products)}
        >
          <Plus />
          Add
        </div>
        <div className="flex w-2/4 bg-slate-300 p-4 gap-4 items-center">
          <Search />
          <input
            type="text"
            className="bg-transparent w-full p-2"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="flex w-1/4 gap-2 justify-center">
          <label>Urutkan Berdasarkan : </label>
          <select
            name="sortby"
            id=""
            defaultValue={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="id">Urutkan</option>
            <option value="name">Nama</option>
            <option value="price">Harga</option>
          </select>
        </div>
        <div>
          <select
            name="orderby"
            id=""
            defaultValue={orderBy}
            onChange={(e) => setOrderBy(e.target.value)}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
      <div className="flex justify-center items-center gap-6 flex-wrap">
        {filterData.map((product) => (
          <div key={product.id}>
            <div>
              <img
                src={product.image}
                alt={product.name}
                className="w-40 h-40 object-cover"
              />
              <p className="font-bold text-2xl text-center">{product.name}</p>
              <p className="font-mono">
                {Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  maximumFractionDigits: 0,
                }).format(product.price)}
              </p>
            </div>
            <div className="flex justify-between">
              <button onClick={() => handleAddCart(product)}>
                <ShoppingCartIcon />
              </button>
              <button onClick={() => handleDelete(product)}>
                <Trash />
              </button>
              <button onClick={() => setUpdateProduct(product)}>
                <SquarePen />
              </button>
            </div>
          </div>
        ))}
      </div>
      {updateProduct && (
        <div className="flex fixed inset-0 items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-3 w-1/4 rounded-lg">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdate();
              }}
            >
              <label>Name Product : </label>
              <input
                type="text"
                id="name"
                value={updateProduct.name}
                onChange={(e) =>
                  setUpdateProduct({ ...updateProduct, name: e.target.value })
                }
                className="border border-gray-300 p-2 mb-4 w-full"
              />
              <label>Price : </label>
              <input
                type="number"
                id="price"
                value={updateProduct.price}
                onChange={(e) =>
                  setUpdateProduct({
                    ...updateProduct,
                    price: parseInt(e.target.value),
                  })
                }
                className="border border-gray-300 p-2 mb-4 w-full"
              />
              <label>Image Url : </label>
              <input
                type="text"
                id="price"
                value={updateProduct.image}
                onChange={(e) =>
                  setUpdateProduct({
                    ...updateProduct,
                    image: e.target.value,
                  })
                }
                className="border border-gray-300 p-2 mb-4 w-full"
              />
              <div className="flex justify-around">
                <button
                  type="submit"
                  className="bg-green-400 hover:bg-green-600 rounded-full px-2"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setUpdateProduct(null)}
                  className="bg-red-400 hover:bg-red-600 rounded-full p-2"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {addProduct && (
        <div className="flex fixed inset-0 items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-3 w-1/4 rounded-lg">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddProduct();
              }}
            >
              <label>Name Product : </label>
              <input
                type="text"
                id="name"
                value={addProduct.name}
                onChange={(e) =>
                  setAddProduct({ ...addProduct, name: e.target.value })
                }
                className="border border-gray-300 p-2 mb-4 w-full"
              />
              <label>Price : </label>
              <input
                type="number"
                id="price"
                value={addProduct.price}
                onChange={(e) =>
                  setAddProduct({
                    ...addProduct,
                    price: parseInt(e.target.value),
                  })
                }
                className="border border-gray-300 p-2 mb-4 w-full"
              />
              <label>Image Url : </label>
              <input
                type="text"
                id="price"
                value={addProduct.image}
                onChange={(e) =>
                  setAddProduct({
                    ...addProduct,
                    image: e.target.value,
                  })
                }
                className="border border-gray-300 p-2 mb-4 w-full"
              />
              <div className="flex justify-around">
                <button
                  type="submit"
                  className="bg-green-400 hover:bg-green-600 rounded-full p-2"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setAddProduct(null)}
                  className="bg-red-400 hover:bg-red-600 rounded-full p-2"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
