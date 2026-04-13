import "./Landing.css";
import MyNavbar from "../../components/MyNavbar/MyNavbar";
import axiosInstance from "../../utils/axiosInstance";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDashboard } from "../../context/DashboardContext";
import shopImg from "../../assets/shop.png"

export default function Landing() {
  const [categories, setCategories] = useState([]);
  const [produk, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const { search } = useDashboard();

  useEffect(() => {
    getCategories();
    getProducts();

    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const getCategories = async () => {
    try {
      const token = localStorage.getItem("token");

      const result = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/jenis-produk`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCategories(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getProducts = async () => {
    try {
      const result = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/produk`);

      setProducts(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  /* tambah keranjang */

  const addToCart = (product) => {
    const exist = cart.find((item) => item.uuid === product.uuid);

    let updatedCart;

    if (exist) {
      updatedCart = cart.map((item) => (item.uuid === product.uuid ? { ...item, qty: item.qty + 1 } : item));
    } else {
      updatedCart = [...cart, { ...product, qty: 1 }];
    }

    setCart(updatedCart);

    localStorage.setItem("cart", JSON.stringify(updatedCart));

    alert("Produk ditambahkan ke keranjang");
  };

  /* beli langsung */

  const buyNow = (product) => {
    navigate("/checkout", {
      state: {
        buyNowItem: {
          ...product,
          qty: 1,
        },
      },
    });
  };

  const filteredProduk = produk
  .filter((p) => {
    return activeCategory ? p.jenis_produk_id === activeCategory : true;
  })
  .filter((p) => {
    return p.nama_barang
    ?.toLowerCase()
    .includes((search || "").toLowerCase())
  });

  const formatRupiah = (angka) => {
    return "Rp " + angka.toLocaleString("id-ID");
  };

  const handleScrollProduk = () => {
    const sc = document.getElementById("produk");
    if (sc) {
      sc.scrollIntoView({behavior: "smooth"})
    }
  }

  return (
    <div className="landing">
      <MyNavbar cartCount={cart.length} />

      <div className="container">
        {/* HERO */}

        <section className="hero" id="produk">
          <div className="hero-left">
            <h1>
              Belanja Mudah,
              <br />
              Harga Terbaik
            </h1>

            <p>Temukan berbagai produk berkualitas hanya di Petik Niaga</p>

            <button onClick={handleScrollProduk}>Lihat Produk</button>
          </div>

          <div className="hero-right">
            <img src={shopImg} />
          </div>
        </section>

        {/* KATEGORI */}

        <section className="kategori">
          <h2>Kategori</h2>

          <div className="kategori-scroll">
            <span className={!activeCategory ? "active" : ""} onClick={() => setActiveCategory(null)}>
              Semua
            </span>

            {categories.map((category) => (
              <span key={category.uuid} className={activeCategory === category.id ? "active" : ""} onClick={() => setActiveCategory(category.id)}>
                {category.nama}
              </span>
            ))}
          </div>
        </section>

        {/* PRODUK */}

        <section className="produk">
          <div className="produk-grid">
            {filteredProduk.map((product) => (
              <div className="card" key={product.uuid}>
                <img src={product.url} />

                <div className="card-body">
                  <h3>{product.nama_barang}</h3>

                  <p>Stok: {product.stok}</p>

                  <h4>{formatRupiah(product.harga)}</h4>

                  <div className="btn-group">
                    <button className="keranjang" onClick={() => addToCart(product)}>
                      + Keranjang
                    </button>

                    <button className="beli" onClick={() => buyNow(product)}>
                      Beli
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
