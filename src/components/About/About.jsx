import "./About.css";
import gambar from "../../assets/about.jpg";

const About = () => {
  return (
    <section className="about">
      <div className="about-content">
        <div className="about-text">
          <h1>Tentang Perusahaan</h1>
          <p>
            Kursus Hi-Five berdiri sejak 2019 untuk menjembatani dunia akademik
            dan industri dengan kurikulum berbasis praktik dan mentor profesional.
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
