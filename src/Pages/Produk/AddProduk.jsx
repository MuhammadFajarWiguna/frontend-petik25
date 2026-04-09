import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddProduk = () => {
  const navigate = useNavigate();

  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState("");
  const [gambar, setGambar] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [kategoriList, setKategoriList] = useState([]);
  const [kategoriId, setKategoriId] = useState("");


  useEffect(() => {
    getKategori();
  }, []);

  const getKategori = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/jenis-produk`
      );
      setKategoriList(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const formData = new FormData();
    formData.append("nama", nama);
    formData.append("harga", harga);
    formData.append("kategori_id", kategoriId);
    formData.append("gambar", gambar);

    await axios.post(
      `${import.meta.env.VITE_API_URL}/produk`,
      formData
    );

    navigate(-1);
  } catch (error) {
    console.log(error.response);
  } finally {
    setLoading(false);
  }
};

  const handleImage = (e) => {
    const file = e.target.files[0];
    setGambar(file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="users-page">
      <h3>Tambah Produk</h3>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nama Produk"
          onChange={(e) => setNama(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Harga"
          onChange={(e) => setHarga(e.target.value)}
          required
        />

        <select
          value={kategoriId}
          onChange={(e) => setKategoriId(e.target.value)}
          required
        >
          <option value="">-- Pilih Kategori --</option>
          {kategoriList.map((item) => (
            <option key={item.id} value={item.id}>
              {item.nama}
            </option>
          ))}
        </select>

        <input type="file" onChange={handleImage} />

        {preview && <img src={preview} width={150} />}

        <button type="submit">
          {loading ? "Menyimpan..." : "Simpan"}
        </button>
      </form>
    </div>
  );
};

export default AddProduk;