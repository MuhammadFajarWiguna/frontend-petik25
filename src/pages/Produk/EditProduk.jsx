import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

const EditProduk = () => {
  const navigate = useNavigate();
  const { uuid } = useParams();

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

  useEffect(() => {
    getProdukByUUID();
  }, []);

  const getProdukByUUID = async () => {
    try {
      const result = await axiosInstance.get(
        `${import.meta.env.VITE_API_URL}/produk/${uuid}`
      );

      const data = result.data.data;

      setNamaProduk(data.nama_barang);
      setStok(data.stok);
      setMinStok(data.min_stok);
      setHarga(data.harga);
      setKategori(data.jenis_produk_id);
      setPreview(data.url); 
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      await axiosInstance.put(
        `${import.meta.env.VITE_API_URL}/produk/${uuid}`,
        {
          nama_barang: namaProduk,
          stok,
          min_stok: minStok,
          harga,
          jenis_produk_id: Kategori,
          gambar,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      navigate(-1);
    } catch (error) {
      console.log(error);

      setErrors({
        global:
          error.response?.data?.message ||
          "Terjadi kesalahan saat menyimpan produk.",
      });
    } finally {
      setLoading(false);
    }
  };

  /* PREVIEW GAMBAR */
  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    setGambar(file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="user-page">
      <div className="user-header">
        <h3>Edit Produk</h3>
      </div>

      <form className="from-wrapper" onSubmit={handleSubmit}>
        <div className="from-grid">
          <label htmlFor="nama_produk">Nama Produk</label>
          <input
            type="text"
            id="nama_produk"
            value={namaProduk}
            placeholder="Contoh : Indomie Goreng"
            onChange={(e) => setNamaProduk(e.target.value)}
            required
          />
        </div>

        <div className="from-grid">
          <label htmlFor="stok">Stok</label>
          <input
            type="number"
            id="stok"
            value={stok}
            onChange={(e) => setStok(e.target.value)}
            required
          />
        </div>

        <div className="from-grid">
          <label htmlFor="min_stok">Min Stok</label>
          <input
            type="number"
            id="min_stok"
            value={minStok}
            onChange={(e) => setMinStok(e.target.value)}
            required
          />
        </div>

        <div className="from-grid">
          <label htmlFor="harga">Harga</label>
          <input
            type="number"
            id="harga"
            value={harga}
            onChange={(e) => setHarga(e.target.value)}
            required
          />
        </div>

        <div className="from-grid">
          <label htmlFor="nama_kategori">Kategori</label>
          <input
            type="number"
            id="nama_kategori"
            value={Kategori}
            onChange={(e) => setKategori(e.target.value)}
            required
          />
        </div>

        <div className="from-grid">
          <label htmlFor="gambar">Gambar</label>
          <input
            type="file"
            id="gambar"
            accept="image/*"
            onChange={handleChangeImage}
          />

          {preview && (
            <img src={preview} alt="image-preview" width={220} />
          )}
        </div>

        {errors.global && (
          <span className="error" style={{ color: "red" }}>
            {errors.global}
          </span>
        )}

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

export default EditProduk;