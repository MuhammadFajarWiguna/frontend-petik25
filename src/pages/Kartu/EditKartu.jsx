import axiosInstance from "../../utils/axiosInstance";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditKartu = () => {
  const navigate = useNavigate();
  const { uuid } = useParams();

  const [nama, setNama] = useState("");
  const [kode, setKode] = useState("");
  const [diskon, setDiskon] = useState("");
  const [iuran, setIuran] = useState("");

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (uuid) {
      getKartuByUUID();
    }
  }, [uuid]);

  const getKartuByUUID = async () => {
    setLoading(true);
    try {
      const result = await axiosInstance.get(
        `${import.meta.env.VITE_API_URL}/kartu/${uuid}`
      );

      const data = result.data.data;

      setNama(data?.nama || "");
      setKode(data?.kode || "");
      setDiskon(data?.diskon || "");
      setIuran(data?.iuran || "");
    } catch (error) {
      console.log(error?.response || error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      await axiosInstance.put(`${import.meta.env.VITE_API_URL}/kartu/${uuid}`, {
        nama,
        kode,
        diskon,
        iuran,
      });

      navigate("/dashboard/kartu");
    } catch (error) {
      console.log(error?.response || error);

      const apiErrors = error.response?.data?.errors || [];

      if (apiErrors.length > 0) {
        const errorPerField = {};
        apiErrors.forEach((e) => {
          errorPerField[e.path] = e.msg;
        });
        setErrors(errorPerField);
      } else {
        setErrors({
          global:
            error.response?.data?.message ||
            "Terjadi kesalahan saat menyimpan data.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="users-page">
      <div className="users-header">
        <h3>Edit Kartu</h3>
      </div>

      <form onSubmit={handleSubmit} className="form-wrapper">
        {errors.global && (
          <span className="error" style={{ color: "red" }}>
            {errors.global}
          </span>
        )}

        <div className="form-grip">
          <label htmlFor="nama">Nama</label>
          <input
            type="text"
            id="nama"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            required
          />
          {errors.nama && (
            <span className="error" style={{ color: "red" }}>
              {errors.nama}
            </span>
          )}
        </div>

        <div className="form-grip">
          <label htmlFor="kode">Kode</label>
          <input
            type="text"
            id="kode"
            value={kode}
            onChange={(e) => setKode(e.target.value)}
            required
          />
          {errors.kode && (
            <span className="error" style={{ color: "red" }}>
              {errors.kode}
            </span>
          )}
        </div>

        <div className="form-grip">
          <label htmlFor="diskon">Diskon</label>
          <input
            type="text"
            id="diskon"
            value={diskon}
            onChange={(e) => setDiskon(e.target.value)}
            required
          />
          {errors.diskon && (
            <span className="error" style={{ color: "red" }}>
              {errors.diskon}
            </span>
          )}
        </div>

        <div className="form-grip">
          <label htmlFor="iuran">Iuran</label>
          <input
            type="number"
            id="iuran"
            value={iuran}
            onChange={(e) => setIuran(e.target.value)}
            required
          />
          {errors.iuran && (
            <span className="error" style={{ color: "red" }}>
              {errors.iuran}
            </span>
          )}
        </div>

        <div className="btn-group">
          <button
            type="button"
            onClick={() => navigate("/dashboard/kartu")}
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

export default EditKartu;