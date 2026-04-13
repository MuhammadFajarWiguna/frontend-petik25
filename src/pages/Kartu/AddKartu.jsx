import axiosInstance from "../../utils/axiosInstance";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddKartu = () => {
    const navigate = useNavigate();

     useEffect(() => {
        getKartu();
      }, []);

    const [nama, setNama] = useState("");
    const [kode, setKode] = useState("");
    const [diskon, setDiskon] = useState("");
    const [iuran, setIuran] = useState("");

  
    const [listKartu, setListKartu] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
  

    const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
      
    try {
      await axiosInstance.post(
        `${import.meta.env.VITE_API_URL}/kartu`,
        {
          nama,
          kode,
          diskon,
          iuran
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
  }

  const getKartu = async () => {
    try {
      const result = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/kartu`);

      console.log(result.data.data);
      setListKartu(result.data.data)
      
    } catch (error) {
        console.log(error.response);  
    }
  };
    return (
    <div>
      <div className="users-page">
        <div className="users-header">
          <h3>Tambah Kartu</h3>
        </div>

        <form onSubmit={handleSubmit} className="form-wrapper">
          <div className="form-grip">
            <label htmlFor="nama">Nama</label>
            <input type="text" id="nama" onChange={(e) => setNama(e.target.value)} required />
            {errors.nama && (
              <span className="error" style={{ color: "red" }}>
                {errors.nama}
              </span>
            )}
          </div>
          {/*  */}
          <div className="form-grip">
            <label htmlFor="kode">Kode</label>
            <input type="text" id="kode" onChange={(e) => setKode(e.target.value)} required />
            {errors.gender && (
              <span className="error" style={{ color: "red" }}>
                {errors.gender}
              </span>
            )}
          </div>

          <div className="form-grip">
            <label htmlFor="diskon">Diskon</label>
            <input type="text" id="diskon" onChange={(e) => setDiskon(e.target.value)} required />
            {errors.no_hp && (
              <span className="error" style={{ color: "red" }}>
                {errors.no_hp}
              </span>
            )}
          </div>

          <div className="form-grip">
            <label htmlFor="iuran">Iuran</label>
            <input type="number" id="iuran" onChange={(e) => setIuran(e.target.value)} required />
            {errors.alamat && (
              <span className="error" style={{ color: "red" }}>
                {errors.alamat}
              </span>
            )}
          </div>

          {/*  */}
        
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

export default AddKartu;