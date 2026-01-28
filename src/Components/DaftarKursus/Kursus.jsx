import "./Kursus.css"


const Kursus = ({gambar,judul, deskripsi, harga, target}) => {
    return (
        

        <div className="card kursus-card">
           <img src={gambar} alt={judul} />
            <h3 className="text-center">Jurusan Kursus : {judul}</h3>
            <p>{deskripsi}</p><br />
            <p><strong>Harga :</strong> <i>{harga}</i> </p>
            <p><strong>Target :</strong> <i>{target}</i></p>
            
            <button>Daftar Sekarang</button>
        
        </div>
     
    )
}

export default Kursus; 