import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

const AddProduct = () => {
  const navigate = useNavigate();

  const [namaProduk, setNamaProduk] = useState("");
  const [stok, setStok] = useState("0");
  const [minStok, setMinStok] = useState("0");
  const [harga, setHarga] = useState("0");
  const [Kategori, setKategori] = useState("");
  const [gambar, setGambar] = useState(null);
  const [preview, setPreview] = useState(null);


  const [kategoriList, setKategoriList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({}); 
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      await axiosInstance.post(`${import.meta.env.VITE_API_URL}/produk`, {
        nama_barang: namaProduk,
        stok,
        min_stok: minStok,
        harga,
        jenis_produk_id: Kategori,
        gambar,
      }, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate(-1); 
    } catch (error) {
      console.log(error);
      setErrors({
        global: error.response?.data?.message || "Terjadi kesalahan saat menyimpan produk.",
      });
    } finally {
      setLoading(false);
    }
  }

    /* PREVIEW GAMBAR */
  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    setGambar(file);
    setPreview(URL.createObjectURL(file));
   
  };

  return (
    <div className="user-page">
      <div className="user-header">
        <h3>Tambah Produk</h3>
      </div>

      <form className="from-wrapper" onSubmit={handleSubmit}>
        <div className="from-grid">
          <label htmlFor="nama_produk">Nama Produk</label>
          <input
            type="text"
            id="nama_produk"
            placeholder="Contoh : Indomie Goreng"
            onChange={(e) => setNamaProduk(e.target.value)}
            required
          />
          {errors.global && 
          <span className="error" style={{ color: "red" }}>
            {errors.global}
          </span>}
          
        </div>

        <div className="from-grid">
          <label htmlFor="stok">Stok</label>
          <input
            type="number"
            id="stok"
            onChange={(e) => setStok(e.target.value)}
            required
          />
          {errors.global && 
          <span className="error" style={{ color: "red" }}>
            {errors.global}
          </span>}
          </div>

          <div className="from-grid">
          <label htmlFor="min_stok">minStok</label>
          <input
            type="number"
            id="min_stok"
            onChange={(e) => setMinStok(e.target.value)}
            required
          />
          {errors.global && 
          <span className="error" style={{ color: "red" }}>
            {errors.global}
          </span>}
          </div>

          <div className="from-grid">
          <label htmlFor="harga">Harga</label>
          <input
            type="number"
            id="harga"
            onChange={(e) => setHarga(e.target.value)}
            required
          />
          {errors.global && 
          <span className="error" style={{ color: "red" }}>
            {errors.global}
          </span>}
          </div>

            <div className="from-grid">
          <label htmlFor="nama_kategori">Nama Kategori</label>
          <input
            type="number"
            id="nama_kategori"
            onChange={(e) => setKategori(e.target.value)}
            required
          />
          {errors.global && 
          <span className="error" style={{ color: "red" }}>
            {errors.global}
          </span>}
          </div>


        <div className="from-grid">
          <label htmlFor="gambar">Gambar</label>
          <input
            type="file"
            id="gambar"
            accept="image/*"
            onChange={handleChangeImage}
          />
          {
            preview && (
              <img
                src={preview}
                alt="image-preview"
                width={220}
              />
            )
          }
        </div>

        <div className="btn-groub">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn-delete"
            disabled={loading}
          >
            Batal
          </button>
          <button type="submit" className="btn-tambah" disabled={loading}>
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;