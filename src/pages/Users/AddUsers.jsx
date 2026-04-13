import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance';

const AddUsers = () => {
    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("pelanggan")
    const [status, setStatus] = useState("aktif")

    // state data pelanggan

    const [nama, setNama] = useState("")
    const [gender, setGender] = useState("L")
    const [noHp, setNoHp] = useState("")
    const [alamat, setAlamat] = useState("")
    const [tglLahir, setTglLahir] = useState("")
    const [kartuId, setKartuId] = useState(4)
    const [kartuList, setKartuList] = useState([])

    const [gambar , setGambar] = useState(null)
    const [preview, setPreview] = useState(null)

    const [loading , setLoading] = useState(false)
    const [error , setError] = useState({})

    const getKartuList = async () => {
        try {
            const result = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/kartu`)
            setKartuList(result.data.data)
        } catch (error) {
            console.log(error.response);
        }
    };

    useEffect(() => {
        getKartuList();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError({});
        
       try {
        const userResponse = await axiosInstance.post(
         `${import.meta.env.VITE_API_URL}/users`, 
            {
                username,
                email,
                password,
                role,
                status,
                gambar
            }, 
            {
                headers: {
                    "Content-Type" : "multipart/form-data",
                },
            },
        );
        if (role === "pelanggan") {
            const newUserId = userResponse.data.data.id;
                await axiosInstance.post(
                `${import.meta.env.VITE_API_URL}/pelanggan`, 
                    {
                        nama,
                        gender,
                        no_hp: noHp,
                        alamat,
                        tgl_lahir : tglLahir,
                        kartu_id : kartuId,
                        user_Id: newUserId,
                    })
                }

            } catch (error) {
                console.log(error);
            }
            navigate(-1)
        };

      /* PREVIEW GAMBAR */
  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    setGambar(file);
    setPreview(URL.createObjectURL(file));
   
  };


    
  return (
    <div>
      <div className="user-page">
      <div className="user-header">
        <h3>Tambah Users</h3>
      </div>
      <form className="from-wrapper" onSubmit={handleSubmit}>
        <div className="from-grid">
          <label htmlFor="username">Username</label>
          <br />
          <input
            type="text"
            id="username"
            placeholder="Contoh : Ucup"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          {error.global && 
          <span className="error" style={{ color: "red" }}>
            {error.global}
          </span>}
        </div>
        <br/>
        <div className="from-grid">
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="text"
            id="email"
            placeholder="Contoh : ucup@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {error.global && 
          <span className="error" style={{ color: "red" }}>
            {error.global}
          </span>}
        </div>
        <br/>
        <div className="from-grid">
          <label htmlFor="password">Password</label>
          <br />
          <input
            type="password"
            id="password"
            placeholder="********"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error.global && 
          <span className="error" style={{ color: "red" }}>
            {error.global}
          </span>}
        </div>
        <br/>
         <div className="from-grid">
          <label htmlFor="role">Role</label>
          <br />
          <select 
            id="role" 
            value={role} 
            onChange={(e) => setRole(e.target.value)}
          >
            <option disabled>-Pilih Role-</option>
            <option value="pelanggan">Pelanggan</option>
            <option value="admin">Admin</option>
          </select>
          {error.global && 
          <span className="error" style={{ color: "red" }}>
            {error.global}
          </span>}
        </div> 
        <br/>
        <div className="from-grid">
          <label htmlFor="status">Status</label>
          <br />
          <select 
            id="status" 
            value={status} 
            onChange={(e) => setStatus(e.target.value)}
          >
            <option disabled>-Pilih status-</option>
            <option value="aktif">Aktif</option>
            <option value="nonaktif">Nonaktif</option>
          </select>
          {error.global && 
          <span className="error" style={{ color: "red" }}>
            {error.global}
          </span>}
        </div>     
        <br/>
        <div className="from-grid">
          <label htmlFor="gambar">Gambar</label>
          <br />
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
        <br/>

        {
            role === "pelanggan" && (
                <>
                <div className="from-grid">
          <label htmlFor="nama">Nama</label>
          <br />
          <input
            type="text"
            id="nama"
            placeholder="Contoh : Ucup"
            onChange={(e) => setNama(e.target.value)}
            required
          />
          {error.global && 
          <span className="error" style={{ color: "red" }}>
            {error.global}
          </span>}
        </div>

        <br/>

        <div className="from-grid">
          <label>Gender</label>
          <br />
          <label htmlFor="l">
          <input
            type="radio"
            id="l"
            value="L"
            checked={gender === "L"}
            onChange={(e) => setGender(e.target.value)}
            required
            />
            Laki Laki
           </label>
            <br />
           <label htmlFor="p">
          <input
            type="radio"
            id="p"
            value="P"
            checked={gender === "P"}
            onChange={(e) => setGender(e.target.value)}
            required
            />
            Perempuan
           </label>
          {error.global && 
          <span className="error" style={{ color: "red" }}>
            {error.global}
          </span>}
        </div>
        <br/>

        <div className="from-grid">
          <label htmlFor="noHp">Nomor Hp</label>
          <br />
          <input
            type="text"
            id="noHp"
            placeholder="Contoh : 0812345678922"
            onChange={(e) => setNoHp(e.target.value)}
            required
          />
          {error.global && 
          <span className="error" style={{ color: "red" }}>
            {error.global}
          </span>}
        </div>
            <br/>

        <div className="from-grid">
          <label htmlFor="alamat">Alamat</label>
          <br />
          <input
            type="text"
            id="alamat"
            placeholder="Contoh : Jl. Mawar No. 123"
            onChange={(e) => setAlamat(e.target.value)}
            required
          />
          {error.global && 
          <span className="error" style={{ color: "red" }}>
            {error.global}
          </span>}
        </div>
            <br/>

        <div className="from-grid">
          <label htmlFor="tgl_lahir">Tangal Lahir</label>
          <br />
          <input
            type="date"
            id="tgl_lahir"
            onChange={(e) => setTglLahir(e.target.value)}
            required
          />
          {error.global && 
          <span className="error" style={{ color: "red" }}>
            {error.global}
          </span>}
        </div>
            <br/>

        <div className="from-grid">
          <label htmlFor="kartu_id">Membership</label>
          <br />
          <select 
            id="kartu_id" 
            value={kartuId} 
            onChange={(e) => setKartuId(e.target.value)}
          >
            <option disabled>-Pilih Langganan-</option>
            {kartuList.map((kartu) => (
                <option key={kartu.id} value={kartu.id}>
                    {kartu.nama}
                </option>
            ))}
          </select>
          {error.global && 
          <span className="error" style={{ color: "red" }}>
            {error.global}
          </span>}
        </div>     
        <br/>
                </>
            )
        }

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
    </div>
  )
}

export default AddUsers
