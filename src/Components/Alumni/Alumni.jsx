const Alumni = ({nama, jurusan, perusahaan}) => {
    return (
            <ul>
                <li>Nama : {nama}</li>
                <li>Jurusan : {jurusan}</li>
                <li>Tempat Bekerja Sekarang : {perusahaan}</li>
            </ul>
    )
}

export default Alumni;