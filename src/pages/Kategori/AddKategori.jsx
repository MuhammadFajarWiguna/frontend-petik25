import React from "react";
import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";


const AddKategori = () => {
  const navigate = useNavigate();
  const [namaKategori, setNamaKategori] = useState("");
  const [gambar, setGambar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({}); 

  const hadleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      await axiosInstance.post(
        `${import.meta.env.VITE_API_URL}/jenis-produk`,
        {
          // masukkan key dan value di sini untuk menambhkan data
          nama: namaKategori,
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
      const apiErrorr = error.response.data.errors || [];
      if (apiErrorr.length > 0) {
        const errorPerField = {};
        apiErrorr.forEach((e) => {
          errorPerField[e.path] = e.msg;
        });
        setErrors(errorPerField);
      } else {
        setErrors({
            global: error.response.data.message || "Terjadi kesalahan saat menyimpan gambar.",
        });
      } 
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
        <h3>Tambah Kategori</h3>
      </div>
      <form className="from-wrapper" onSubmit={hadleSubmit}>
        <div className="from-grid">
          <label htmlFor="nama">Nama Kategori</label>
          <input
            type="text"
            id="nama"
            placeholder="Contoh : Elektronik"
            onChange={(e) => setNamaKategori(e.target.value)}
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

export default AddKategori;