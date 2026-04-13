import axiosInstance from "../../utils/axiosInstance";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddPelanggan = () => {
    const navigate = useNavigate();

     useEffect(() => {
        getKartu();
      }, []);

    const [nama, setNama] = useState("");
    const [gender, setGender] = useState("");
    const [noHp, setNoHp] = useState("");
    const [alamat, setAlamat] = useState("");
    const [tglLahir, setTanggalLahir] = useState("");
    const [kartuId, setKartuId] = useState("");
  
    const [listKartu, setListKartu] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
  

    const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
      
    try {
      await axiosInstance.post(
        `${import.meta.env.VITE_API_URL}/pelanggan`,
        {
          nama,
          gender,
          no_hp: noHp,
          alamat,
          tgl_lahir: tglLahir,
          kartu_id: kartuId,
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
          <h3>Tambah Pelanggan</h3>
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
            <label htmlFor="gender">Gender</label>
            <input type="text" id="gender" onChange={(e) => setGender(e.target.value)} required />
            {errors.gender && (
              <span className="error" style={{ color: "red" }}>
                {errors.gender}
              </span>
            )}
          </div>

          <div className="form-grip">
            <label htmlFor="no_hp">No_Hp</label>
            <input type="text" id="no_hp" onChange={(e) => setNoHp(e.target.value)} required />
            {errors.no_hp && (
              <span className="error" style={{ color: "red" }}>
                {errors.no_hp}
              </span>
            )}
          </div>

          <div className="form-grip">
            <label htmlFor="alamat">Alamat</label>
            <input type="text" id="alamat" onChange={(e) => setAlamat(e.target.value)} required />
            {errors.alamat && (
              <span className="error" style={{ color: "red" }}>
                {errors.alamat}
              </span>
            )}
          </div>

          <div className="form-grip">
            <label htmlFor="tgl_lahir">Tgl_Lahir</label>
            <input type="date" id="tgl_lahir" onChange={(e) => setTanggalLahir(e.target.value)} required />
            {errors.tgl_lahir && (
              <span className="error" style={{ color: "red" }}>
                {errors.tgl_lahir}
              </span>
            )}
          </div>
          {/*  */}
          <div className="form-grip">
            <label htmlFor="kartu">Kartu</label>
            <select id="kartu" onChange={(p) => setKartuId(p.target.value)} required>
              <option value="">Pilih Kartu</option>
              {listKartu.map((l) => (
                <option key={l.id} value={l.id}>{l.nama}</option>
              ))}
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

export default AddPelanggan;