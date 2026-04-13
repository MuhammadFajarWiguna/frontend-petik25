import axiosInstance from "../../utils/axiosInstance";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddPesanan = () => {
  const navigate = useNavigate();

  useEffect(() => {
    getPelanggan();
  }, []);

  const [tanggal, setTanggal] = useState("");
  const [total, setTotal] = useState(0);
  const [pelangganId, setPelangganId] = useState("");

  const [listPelanggan, setListPelanggan] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      await axiosInstance.post(
        `${import.meta.env.VITE_API_URL}/pesanan`,
        {
          tanggal,
          total,
          pelanggan_id: pelangganId,
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

  const getPelanggan = async () => {
    try {
      const result = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/pelanggan`);

      setListPelanggan(result.data.data)
    } catch (error) {
        console.log(error.response);  
    }
  };

  return (
    <div>
      <div className="users-page">
        <div className="users-header">
          <h3>Tambah Pesanan</h3>
        </div>

        <form onSubmit={handleSubmit} className="form-wrapper">
          <div className="form-grip">
            <label htmlFor="tanggal">Tanggal</label>
            <input type="date" id="tanggal" onChange={(e) => setTanggal(e.target.value)} required />
            {errors.tanggal && (
              <span className="error" style={{ color: "red" }}>
                {errors.tanggal}
              </span>
            )}
          </div>
          {/*  */}
          <div className="form-grip">
            <label htmlFor="total">Total</label>
            <input type="number" id="total" onChange={(e) => setTotal(e.target.value)} required />
            {errors.total && (
              <span className="error" style={{ color: "red" }}>
                {errors.total}
              </span>
            )}
          </div>
          {/*  */}
          <div className="form-grip">
            <label htmlFor="pelanggan">Pelanggan</label>
            <select id="pelanggan" onChange={(p) => setPelangganId(p.target.value)} required>
              <option value="">Pilih Pelanggan</option>
              {
                listPelanggan.map((l) => (
                    <option value={l.id}>{l.nama}</option>
                ))
              }
            </select>
            {errors.pelangganId && (
              <span className="error" style={{ color: "red" }}>
                {errors.pelangganId}
              </span>
            )}
          </div>
        

          <div className="btn-group">
            <button type="button" onClick={() => navigate(-1)} className="btn-delete" disabled={loading}>
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

export default AddPesanan;