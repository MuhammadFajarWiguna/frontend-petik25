import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h1>404</h1>
      <p>Halaman tidak ditemukan</p>
      <Link to="/">Kembali ke Home</Link>
    </div>
  );
};

export default ErrorPage;
