import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Checkout.css";

const Checkout = () => {

  const [cart,setCart] = useState([]);
  const [alamat,setAlamat] = useState("");
  const [payment,setPayment] = useState("Transfer Bank");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(()=>{

    if(location.state?.buyNowItem){
      setCart([{...location.state.buyNowItem, qty:1}]);
    } 
    else {

      const data = localStorage.getItem("cart");

      if(data){
        setCart(JSON.parse(data));
      }

    }

  },[location.state]);


  const increaseQty = (uuid)=>{

    const updated = cart.map(item =>
      item.uuid === uuid
        ? { ...item, qty: item.qty + 1 }
        : item
    );

    setCart(updated);

    if(!location.state?.buyNowItem){
      localStorage.setItem("cart",JSON.stringify(updated));
    }

  }


  const decreaseQty = (uuid)=>{

    const updated = cart.map(item =>
      item.uuid === uuid
      ? { ...item, qty: item.qty - 1 }
      : item
    );

    setCart(updated);

    if(!location.state?.buyNowItem){
      localStorage.setItem("cart",JSON.stringify(updated));
    }

  }


  const handleQtyInput = (uuid,value)=>{

    const qty = parseInt(value);

    if(isNaN(qty)) return;

    const updated = cart.map(item =>
      item.uuid === uuid
        ? { ...item, qty }
        : item
    );

    setCart(updated);

    if(!location.state?.buyNowItem){
      localStorage.setItem("cart",JSON.stringify(updated));
    }

  }


  const total = cart.reduce(
    (acc,item)=> acc + item.harga * item.qty,
    0
  );


  const formatRupiah = (angka)=>{
    return "Rp " + angka.toLocaleString("id-ID");
  }


  const handleOrder = ()=>{

    if(!alamat){
      alert("Alamat wajib diisi");
      return;
    }

    const order = {
      id: Date.now(),
      items: cart,
      alamat,
      payment,
      total
    }

    const orders =
      JSON.parse(localStorage.getItem("orders")) || [];

    orders.push(order);

    localStorage.setItem("orders",JSON.stringify(orders));

    if(!location.state?.buyNowItem){
      localStorage.removeItem("cart");
    }

    alert("Pesanan berhasil dibuat");

    navigate("/orders");

  }


  return(

    <div className="checkout-page">

      {/* HEADER */}

      <div className="checkout-header">

        <button 
          className="back-btn"
          onClick={()=>navigate(-1)}
        >
          ← Kembali
        </button>

        <h2>Checkout Pesanan</h2>

      </div>


      {/* STEP PROGRESS */}

      <div className="checkout-steps">

        <div className="step done">
          <span>1</span>
          <p>Keranjang</p>
        </div>

        <div className="line"></div>

        <div className="step active">
          <span>2</span>
          <p>Pembayaran</p>
        </div>

        <div className="line"></div>

        <div className="step">
          <span>3</span>
          <p>Pesanan</p>
        </div>

      </div>


      <div className="checkout-container">


        {/* PRODUK */}

        <div className="checkout-products">

          {cart.map((item)=>(
            <div key={item.uuid} className="checkout-card">

              <img
                src={item.url || "https://via.placeholder.com/120"}
                alt={item.nama_barang}
              />

              <div className="product-info">

                <h3>{item.nama_barang}</h3>

                <p className="price">
                  {formatRupiah(item.harga)}
                </p>

                <div className="qty">

                  <button onClick={()=>decreaseQty(item.uuid)}>
                    -
                  </button>

                  <input
                    className="qty-input"
                    value={item.qty}
                    onChange={(e)=>
                      handleQtyInput(item.uuid,e.target.value)
                    }
                  />

                  <button onClick={()=>increaseQty(item.uuid)}>
                    +
                  </button>

                </div>

                <p className="subtotal">
                  Subtotal :
                  {formatRupiah(item.harga * item.qty)}
                </p>

              </div>

            </div>
          ))}

        </div>


        {/* SUMMARY */}

        <div className="checkout-summary">

          <h3>Ringkasan Pesanan</h3>

          <p className="total">
            Total: {formatRupiah(total)}
          </p>

          <label>Alamat Pengiriman</label>

          <textarea
            value={alamat}
            onChange={(e)=>setAlamat(e.target.value)}
            placeholder="Masukkan alamat lengkap..."
          />

          <label>Metode Pembayaran</label>

          <select
            value={payment}
            onChange={(e)=>setPayment(e.target.value)}
          >
            <option>Transfer Bank</option>
            <option>COD</option>
            <option>E-Wallet</option>
          </select>

          <button
            className="order-btn"
            onClick={handleOrder}
          >
            Buat Pesanan
          </button>

        </div>

      </div>

    </div>

  )

}

export default Checkout;