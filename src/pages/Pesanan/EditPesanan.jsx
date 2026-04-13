import axiosInstance from "../../utils/axiosInstance";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditPesanan = () => {
  const navigate = useNavigate();
  const { uuid } = useParams();

  const [tanggal, setTanggal] = useState("");
  const [total, setTotal] = useState(0);
  const [pelangganId, setPelangganId] = useState("");

  const [listPelanggan, setListPelanggan] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    getPelanggan();
    getPesananByUUID();
  }, []);

  const getPesananByUUID = async () => {
    try {
      const result = await axiosInstance.get(
        `${import.meta.env.VITE_API_URL}/pesanan/${uuid}`
      );

      const data = result.data.data;

      setTanggal(data.tanggal);
      setTotal(data.total);
      setPelangganId(data.pelanggan_id);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      await axiosInstance.put(
        `${import.meta.env.VITE_API_URL}/pesanan/${uuid}`,
        {
          tanggal,
          total,
          pelanggan_id: pelangganId,
        }
      );

      navigate(-1);
    } catch (error) {
      console.log(error.response);

      setErrors({
        global:
          error.response?.data?.message ||
          "Terjadi kesalahan saat menyimpan pesanan.",
      });
    } finally {
      setLoading(false);
    }
  };

  const getPelanggan = async () => {
    try {
      const result = await axiosInstance.get(
        `${import.meta.env.VITE_API_URL}/pelanggan`
      );

      setListPelanggan(result.data.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div>
      <div className="users-page">
        <div className="users-header">
          <h3>Edit Pesanan</h3>
        </div>

        <form onSubmit={handleSubmit} className="form-wrapper">
          {errors.global && (
            <span className="error" style={{ color: "red" }}>
              {errors.global}
            </span>
          )}

          <div className="form-grip">
            <label htmlFor="tanggal">Tanggal</label>
            <input
              type="date"
              id="tanggal"
              value={tanggal}
              onChange={(e) => setTanggal(e.target.value)}
              required
            />
          </div>

          <div className="form-grip">
            <label htmlFor="total">Total</label>
            <input
              type="number"
              id="total"
              value={total}
              onChange={(e) => setTotal(e.target.value)}
              required
            />
          </div>

          <div className="form-grip">
            <label htmlFor="pelanggan">Pelanggan</label>

            <select
              id="pelanggan"
              value={pelangganId}
              onChange={(p) => setPelangganId(p.target.value)}
              required
            >
              <option value="">Pilih Pelanggan</option>

              {listPelanggan.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.nama}
                </option>
              ))}
            </select>
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

            <button
              type="submit"
              className="btn-tambah"
              disabled={loading}
            >
              {loading ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPesanan;