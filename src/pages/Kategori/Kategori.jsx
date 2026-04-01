import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
const Kategori = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getProductCategories();
  }, []);

  const getProductCategories = async () => {
    try {
      const result = await axios.get(`https://apiniaga.psjpetik.my.id/api/v1/jenis-produk`);
      // console.log(result.data.data);
      console.log(categories);

      setCategories(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="kategori-header">
        <h3>Daftar Kategori</h3>
        <NavLink to="/dashboard/kategori/add">Tambah Kategori</NavLink>
      </div>

      <div className="table-wrapper">
        <table border={1}>
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Gambar</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={index}>
                <td>1</td>
                <td>{category.nama}</td>
                <td>
                  <img src={category.url} alt="gambar" width={120} />
                </td>
                <td>
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Kategori;
