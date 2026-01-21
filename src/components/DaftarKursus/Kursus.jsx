import "./Kursus.css";

const Kursus = ({ gambar, judul, deskripsi, harga, target }) => {
  return (
    <div className="card kursus-card">
      <img src={gambar} alt={judul} />
      <h3>Jurusan Kursus: {judul}</h3>
      <p>{deskripsi}</p>
      <p><strong>Harga:</strong> {harga}</p>
      <p><strong>Target:</strong> {target}</p>
      <button>Daftar Sekarang</button>
    </div>
  );
};

export default Kursus;
