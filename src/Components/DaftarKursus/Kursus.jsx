import "./Kursus.css"


const Kursus = ({gambar,namaKursus, harga, target}) => {
    return (
        

        <div className="card kursus-card">
           <img src={gambar} alt="" />
            <h3 className="text-center">Jurusan Kursus : {namaKursus}</h3>
            <p><strong>Harga :</strong> Rp.{harga}</p>
            <p><strong>Target :</strong> {target}</p>
            <button>Daftar Sekarang</button>
        
        </div>
     
    )
}

export default Kursus; 