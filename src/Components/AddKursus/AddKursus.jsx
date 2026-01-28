import { useState } from "react";
import "./AddKursus.css";

const AddKursus = ({ posts, setPosts }) => {
  const [form, setForm] = useState({
    judul: "",
    deskripsi: "",
    harga: "",
    target: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newKursus = {
      id: posts.length + 1,
      ...form,
      gambar: "1.jpg", 
    };

    setPosts([...posts, newKursus]);

    setForm({
      judul: "",
      deskripsi: "",
      harga: "",
      target: "",
    });
  };

  return (
    <div className="add-kursus">
      <h2>Tambah Kursus Baru</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="judul"
          placeholder="Judul Kursus"
          value={form.judul}
          onChange={handleChange}
          required
        />

        <textarea
          name="deskripsi"
          placeholder="Deskripsi"
          value={form.deskripsi}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="harga"
          placeholder="Harga"
          value={form.harga}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="target"
          placeholder="Durasi"
          value={form.target}
          onChange={handleChange}
          required
        />

        <button type="submit">Tambah Kursus</button>
      </form>
    </div>
  );
};

export default AddKursus;
