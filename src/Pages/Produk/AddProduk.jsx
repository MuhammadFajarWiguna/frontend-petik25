import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduk = () => {
  const navigate = useNavigate();

  const [namaProduk, setNamaProduk] = useState("");
  const [stok, setStok] = useState(0);
  const [minStok, setMinStok] = useState(0);
  const [harga, setHarga] = useState(0);
  const [kategori, setKategori] = useState("");
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
      await axios.post(
        `${import.meta.env.VITE_API_URL}/produk`,
        {
          nama_barang: namaProduk,
          stok,
          min_stok: minStok,
          harga,
          jenis_produk_id: kategori,
          gambar,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      navigate(-1);
    } catch (error) {
      console.log(error.response);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    setGambar(file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div>
      <div className="users-page">
        <div className="users-header">
          <h3>Tambah Produk</h3>
        </div>

        <form onSubmit={handleSubmit} className="form-wrapper">
          <div className="form-grip">
            <label htmlFor="nama_produk">Nama Produk</label>
            <input
              type="text"
              id="nama_produk"
              onChange={(e) => setNamaProduk(e.target.value)}
              required
            />
            {errors.nama_produk && (
              <span className="error" style={{ color: "red" }}>
                {errors.nama_produk}
              </span>
            )}
          </div>
          {/*  */}
          <div className="form-grip">
            <label htmlFor="stok">Stok</label>
            <input
              type="number"
              id="stok"
              onChange={(e) => setStok(e.target.value)}
              required
            />
            {errors.stok && (
              <span className="error" style={{ color: "red" }}>
                {errors.stok}
              </span>
            )}
          </div>
          {/*  */}
          <div className="form-grip">
            <label htmlFor="min_stok">Minimal Stok</label>
            <input
              type="number"
              id="min_stok"
              onChange={(e) => setMinStok(e.target.value)}
              required
            />
            {errors.min_stok && (
              <span className="error" style={{ color: "red" }}>
                {errors.min_stok}
              </span>
            )}
          </div>
          {/*  */}
          <div className="form-grip">
            <label htmlFor="harga">Harga</label>
            <input
              type="number"
              id="harga"
              onChange={(e) => setHarga(e.target.value)}
              required
            />
            {errors.harga && (
              <span className="error" style={{ color: "red" }}>
                {errors.harga}
              </span>
            )}
          </div>
          {/*  */}
          <div className="form-grip">
            <label htmlFor="nama_kategori">Nama Kategori</label>
            <input
              type="number"
              id="namakategori"
              placeholder="Contoh: 1"
              onChange={(e) => setKategori(e.target.value)}
              required
            />
            {errors.nama_kategori && (
              <span className="error" style={{ color: "red" }}>
                {errors.nama_kategori}
              </span>
            )}
          </div>

          <div className="form-grip">
            <label htmlFor="gambar">Gambar</label>
            <input
              type="file"
              id="gambar"
              accept="image/*"
              onChange={handleChangeImage}
            />
            {preview && <img src={preview} alt="image-preview" width={220} />}
            {errors.global && (
              <span className="error" style={{ color: "red" }}>
                {errors.global}
              </span>
            )}
          </div>

          <div className="btn-group">
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
    </div>
  );
};

export default AddProduk;
