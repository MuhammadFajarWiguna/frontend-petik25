import posts from "../../posts.json";
import gambarMap from "../utils/PictureMap";
import Kursus from "../../components/DaftarKursus/Kursus.jsx";

const Courses = () => {
  return (
    <div className="card-container">
      {posts.map((item) => (
        <Kursus
          key={item.id}
          gambar={gambarMap[item.gambar]}
          judul={item.judul}
          deskripsi={item.deskripsi}
          harga={item.harga}
          target={item.target}
        />
      ))}
    </div>
  );
};

export default Courses;
