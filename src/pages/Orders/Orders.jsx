import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import "./Orders.css";

const Orders = () => {

  const navigate = useNavigate();

  const [orders,setOrders] = useState([]);
  const [search,setSearch] = useState("");
  const [statusFilter,setStatusFilter] = useState("all");

  const [page,setPage] = useState(1);
  const perPage = 5;

  useEffect(()=>{

    // nanti ini tinggal ganti API
    const data = JSON.parse(localStorage.getItem("orders")) || [];

    setOrders(data.map(o => ({
      ...o,
      status: o.status || "Selesai"
    })));

  },[]);


  const formatRupiah = (angka)=>{
    return "Rp " + angka.toLocaleString("id-ID");
  };


  /* SEARCH + FILTER */

  const filteredOrders = orders.filter(order => {

    const matchSearch =
      order.items.some(item =>
        item.nama_barang.toLowerCase()
        .includes(search.toLowerCase())
      );

    const matchStatus =
      statusFilter === "all" ||
      order.status === statusFilter;

    return matchSearch && matchStatus;

  });


  /* PAGINATION */

  const totalPages =
    Math.ceil(filteredOrders.length / perPage);

  const start =
    (page - 1) * perPage;

  const currentOrders =
    filteredOrders.slice(start,start + perPage);


  /* DELETE ORDER */

  const deleteOrder = (id)=>{

    const updated =
      orders.filter(o => o.id !== id);

    setOrders(updated);

    localStorage.setItem(
      "orders",
      JSON.stringify(updated)
    );

  };


  /* DOWNLOAD PDF */

  const downloadInvoice = (order)=>{

    const doc = new jsPDF();

    doc.text("Invoice Pesanan",20,20);

    doc.text(
      `Total : ${formatRupiah(order.total)}`,
      20,
      40
    );

    doc.text(
      `Alamat : ${order.alamat}`,
      20,
      50
    );

    let y = 70;

    order.items.forEach(item => {

      doc.text(
        `${item.nama_barang} x ${item.qty}`,
        20,
        y
      );

      y += 10;

    });

    doc.save(`invoice-${order.id}.pdf`);

  };


  return(

    <div className="orders-page">


      {/* HEADER */}

      <div className="orders-top">

        <h2>
          Riwayat Pesanan
          <span className="badge">
            {orders.length}
          </span>
        </h2>

        <button
          className="back-btn"
          onClick={()=>navigate("/")}
        >
          ← Belanja Lagi
        </button>

      </div>


      {/* SEARCH */}

      <input
        className="search"
        placeholder="Cari produk..."
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
      />


      {/* FILTER STATUS */}

      <div className="filters">

        <button
          onClick={()=>setStatusFilter("all")}
        >
          Semua
        </button>

        <button
          onClick={()=>setStatusFilter("Diproses")}
        >
          Diproses
        </button>

        <button
          onClick={()=>setStatusFilter("Dikirim")}
        >
          Dikirim
        </button>

        <button
          onClick={()=>setStatusFilter("Selesai")}
        >
          Selesai
        </button>

      </div>


      {/* ORDER LIST */}

      {currentOrders.map(order => (

        <div
          key={order.id}
          className="order-card fade-in"
        >

          <div className="order-header">

            <div>

              <h3>
                Total
                {" "}
                {formatRupiah(order.total)}
              </h3>

              <p>{order.alamat}</p>

              <span className={`status ${order.status}`}>
                {order.status}
              </span>

            </div>

            <div className="actions">

              <button
                onClick={()=>downloadInvoice(order)}
              >
                Invoice
              </button>

              <button
                className="delete"
                onClick={()=>deleteOrder(order.id)}
              >
                Hapus
              </button>

            </div>

          </div>


          <div className="items">

            {order.items.map(item => (

              <div
                key={item.uuid}
                className="item"
              >

                <img
                  src={
                    item.url ||
                    "https://via.placeholder.com/80"
                  }
                />

                <div>

                  <p>{item.nama_barang}</p>

                  <small>
                    {item.qty} x
                    {" "}
                    {formatRupiah(item.harga)}
                  </small>

                </div>

              </div>

            ))}

          </div>

        </div>

      ))}


      {/* PAGINATION */}

      <div className="pagination">

        {Array.from(
          {length: totalPages},
          (_,i)=>(
            <button
              key={i}
              className={
                page === i+1
                ? "active"
                : ""
              }
              onClick={()=>setPage(i+1)}
            >
              {i+1}
            </button>
          )
        )}

      </div>

    </div>

  )

}

export default Orders;