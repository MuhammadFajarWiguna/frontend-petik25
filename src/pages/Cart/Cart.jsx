import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {

  const [cart,setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{

    const data = localStorage.getItem("cart");

    if(data){
      setCart(JSON.parse(data));
    }

  },[]);

  const updateQty = (uuid,type)=>{

    const updated = cart.map((item)=>{

      if(item.uuid === uuid){

        if(type === "plus"){
          return {...item, qty:item.qty + 1}
        }

        if(type === "minus" && item.qty > 1){
          return {...item, qty:item.qty - 1}
        }

      }

      return item;

    });

    setCart(updated);
    localStorage.setItem("cart",JSON.stringify(updated));

  }

  const removeItem = (uuid)=>{

    const filtered = cart.filter((item)=>item.uuid !== uuid);

    setCart(filtered);
    localStorage.setItem("cart",JSON.stringify(filtered));

  }

  const total = cart.reduce(
    (acc,item)=> acc + item.harga * item.qty,
    0
  );

  const formatRupiah = (angka)=>{
    return "Rp " + angka.toLocaleString("id-ID");
  }

  return(

    <div style={{padding:"40px"}}>

      <h2>Keranjang Belanja</h2>

      {cart.map((item)=> (

        <div key={item.uuid} style={{marginBottom:"20px"}}>

          <img src={item.url} width={120}/>

          <h3>{item.nama_barang}</h3>

          <p>{formatRupiah(item.harga)}</p>

          <div>

            <button onClick={()=>updateQty(item.uuid,"minus")}>-</button>

            <span style={{margin:"0 10px"}}>{item.qty}</span>

            <button onClick={()=>updateQty(item.uuid,"plus")}>+</button>

          </div>

          <button onClick={()=>removeItem(item.uuid)}>
            Hapus
          </button>

        </div>

      ))}

      <h2>Total: {formatRupiah(total)}</h2>

      <button
        onClick={()=>navigate("/checkout")}
        style={{padding:"10px 20px"}}
      >
        Checkout
      </button>

    </div>

  )

}

export default Cart;