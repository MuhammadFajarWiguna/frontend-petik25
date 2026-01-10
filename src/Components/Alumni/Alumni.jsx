import "./Alumni.css";

const Alumni = ({ foto, nama, jurusan, perusahaan }) => {
  return (
    <div className="alumni-card">
      <img src={foto} alt={nama} />

      <h3>{nama}</h3>
      <p><strong>Jurusan:</strong> {jurusan}</p>
      <p><strong>Bekerja di:</strong> {perusahaan}</p>
    </div>
  );
};

export default Alumni;
