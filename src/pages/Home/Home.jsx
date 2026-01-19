import React from "react";
import Navbar from "../../component/Navbar/Navbar";

const Home = () => {
    return(
        <div>
            <Navbar/>
            <h1>Selamat Datang di PeTIK Blog</h1>
            <p>Pesantren Teknologi Informasi dan Komunikasi (PeTIK) adalah
                lembaga pendidikan yang fokus pada pengembangan keterampilan IT,
                khususnya Web Development, Mobile Development dan jaringan.
            </p>
            <p>
                Bergabunglah dengan kami dan tingkatkan keahlianmu di dunia digital bersama mentor
                dan praktisi industri!
            </p>
        </div>
    )
}
export default Home;