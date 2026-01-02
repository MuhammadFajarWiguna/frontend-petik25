const Kursus = ({namaKursus, harga, target}) => {
    return (
        <div>
        <ul>
            <li>Jurusan Kursus : {namaKursus}</li>
            <li>Harga : Rp.{harga}</li>
            <li>Target : {target}</li>
        </ul>
        </div>
    )
}

export default Kursus; 