import axiosInstance from "../../utils/axiosInstance";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditPelanggan = () => {
  const navigate = useNavigate();
  const { uuid } = useParams();

  useEffect(() => {
    getKartu();
    getPelangganByUUID();
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

  const getPelangganByUUID = async () => {
    try {
      const result = await axiosInstance.get(
        `${import.meta.env.VITE_API_URL}/pelanggan/${uuid}`
      );

      const data = result.data.data;

      setNama(data.nama);
      setGender(data.gender);
      setNoHp(data.no_hp);
      setAlamat(data.alamat);
      setTanggalLahir(data.tgl_lahir);
      setKartuId(data.kartu_id);
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
        `${import.meta.env.VITE_API_URL}/pelanggan/${uuid}`,
        {
          nama,
          gender,
          no_hp: noHp,
          alamat,
          tgl_lahir: tglLahir,
          kartu_id: kartuId,
        }
      );

      navigate(-1);
    } catch (error) {
      console.log(error.response);

      setErrors({
        global:
          error.response?.data?.message ||
          "Terjadi kesalahan saat menyimpan pelanggan.",
      });
    } finally {
      setLoading(false);
    }
  };

  const getKartu = async () => {
    try {
      const result = await axiosInstance.get(
        `${import.meta.env.VITE_API_URL}/kartu`
      );

      setListKartu(result.data.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div>
      <div className="users-page">
        <div className="users-header">
          <h3>Edit Pelanggan</h3>
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
          </div>

          <div className="form-grip">
            <label htmlFor="gender">Gender</label>
            <input
              type="text"
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            />
          </div>

          <div className="form-grip">
            <label htmlFor="no_hp">No Hp</label>
            <input
              type="text"
              id="no_hp"
              value={noHp}
              onChange={(e) => setNoHp(e.target.value)}
              required
            />
          </div>

          <div className="form-grip">
            <label htmlFor="alamat">Alamat</label>
            <input
              type="text"
              id="alamat"
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
              required
            />
          </div>

          <div className="form-grip">
            <label htmlFor="tgl_lahir">Tanggal Lahir</label>
            <input
              type="date"
              id="tgl_lahir"
              value={tglLahir}
              onChange={(e) => setTanggalLahir(e.target.value)}
              required
            />
          </div>

          <div className="form-grip">
            <label htmlFor="kartu">Kartu</label>
            <select
              id="kartu"
              value={kartuId}
              onChange={(p) => setKartuId(p.target.value)}
              required
            >
              <option value="">Pilih Kartu</option>

              {listKartu.map((l) => (
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

export default EditPelanggan;