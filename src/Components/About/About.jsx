import "./About.css";

import gambar from "../../assets/about.jpg" 

const About = () => {
  return (
    <section className="about">
      <div className="about-content">
        <div className="about-text">
          <h1>Tentang Perusahaan</h1>
          <p>
            Kursus Hi-five dibentuk pada tahun 2019 untuk menjembatani kesenjangan
            antara pengetahuan akademik dan keterampilan praktis yang dibutuhkan
            di dunia kerja. Kami berfokus pada tiga pilar utama: kurikulum berbasis
            praktik, instruktur profesional, dan lingkungan belajar yang
            mendukung. Kami percaya bahwa setiap orang memiliki potensi besar yang
            hanya perlu diasah dengan bimbingan yang tepat.
          </p>
        </div>

        <div className="about-image">
          <img src={gambar} alt="Tentang Kursus Hi-Five" />
        </div>
      </div>
    </section>
  );
};

export default About;
