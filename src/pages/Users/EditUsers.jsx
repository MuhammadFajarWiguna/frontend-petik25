import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

const EditUsers = () => {
  const navigate = useNavigate();
  const { uuid } = useParams();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("pelanggan");
  const [status, setStatus] = useState("aktif");

  const [nama, setNama] = useState("");
  const [gender, setGender] = useState("L");
  const [noHp, setNoHp] = useState("");
  const [alamat, setAlamat] = useState("");
  const [tglLahir, setTglLahir] = useState("");
  const [kartuId, setKartuId] = useState("");

  const [kartuList, setKartuList] = useState([]);

  const [gambar, setGambar] = useState(null);
  const [preview, setPreview] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  useEffect(() => {
    getUserByUUID();
    getKartuList();
  }, []);

  const getUserByUUID = async () => {
    try {
      const result = await axiosInstance.get(
        `${import.meta.env.VITE_API_URL}/users/${uuid}`
      );

      const data = result.data.data;

      setUsername(data.username);
      setEmail(data.email);
      setRole(data.role);
      setStatus(data.status);
      setPreview(data.url);

      if (data.pelanggan) {
        setNama(data.pelanggan.nama);
        setGender(data.pelanggan.gender);
        setNoHp(data.pelanggan.no_hp);
        setAlamat(data.pelanggan.alamat);
        setTglLahir(data.pelanggan.tgl_lahir);
        setKartuId(data.pelanggan.kartu_id);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const getKartuList = async () => {
    try {
      const result = await axiosInstance.get(
        `${import.meta.env.VITE_API_URL}/kartu`
      );
      setKartuList(result.data.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError({});

    try {
      await axiosInstance.put(
        `${import.meta.env.VITE_API_URL}/users/${uuid}`,
        {
          username,
          email,
          password,
          role,
          status,
          gambar,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (role === "pelanggan") {
        await axiosInstance.put(
          `${import.meta.env.VITE_API_URL}/pelanggan/user/${uuid}`,
          {
            nama,
            gender,
            no_hp: noHp,
            alamat,
            tgl_lahir: tglLahir,
            kartu_id: kartuId,
          }
        );
      }

      navigate(-1);
    } catch (error) {
      console.log(error);
      setError({
        global:
          error.response?.data?.message ||
          "Terjadi kesalahan saat menyimpan user.",
      });
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
      <div className="user-page">
        <div className="user-header">
          <h3>Edit Users</h3>
        </div>

        <form className="from-wrapper" onSubmit={handleSubmit}>
          
          <div className="from-grid">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="from-grid">
            <label>Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="from-grid">
            <label>Password</label>
            <input
              type="password"
              placeholder="Kosongkan jika tidak diganti"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="from-grid">
            <label>Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="pelanggan">Pelanggan</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="from-grid">
            <label>Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="aktif">Aktif</option>
              <option value="nonaktif">Nonaktif</option>
            </select>
          </div>

          <div className="from-grid">
            <label>Gambar</label>
            <input type="file" onChange={handleChangeImage} />

            {preview && (
              <img src={preview} alt="preview" width={200} />
            )}
          </div>

          {role === "pelanggan" && (
            <>
              <div className="from-grid">
                <label>Nama</label>
                <input
                  type="text"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                />
              </div>

              <div className="from-grid">
                <label>Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="L">Laki Laki</option>
                  <option value="P">Perempuan</option>
                </select>
              </div>

              <div className="from-grid">
                <label>No Hp</label>
                <input
                  type="text"
                  value={noHp}
                  onChange={(e) => setNoHp(e.target.value)}
                />
              </div>

              <div className="from-grid">
                <label>Alamat</label>
                <input
                  type="text"
                  value={alamat}
                  onChange={(e) => setAlamat(e.target.value)}
                />
              </div>

              <div className="from-grid">
                <label>Tanggal Lahir</label>
                <input
                  type="date"
                  value={tglLahir}
                  onChange={(e) => setTglLahir(e.target.value)}
                />
              </div>

              <div className="from-grid">
                <label>Kartu</label>
                <select
                  value={kartuId}
                  onChange={(e) => setKartuId(e.target.value)}
                >
                  {kartuList.map((kartu) => (
                    <option key={kartu.id} value={kartu.id}>
                      {kartu.nama}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          <div className="btn-groub">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="btn-delete"
            >
              Batal
            </button>

            <button type="submit" className="btn-tambah">
              {loading ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUsers;