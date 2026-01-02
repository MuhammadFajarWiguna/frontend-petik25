const Customer = ({nama, alamat, membership}) =>{
    return(
        <div>
            
            <ul>
                <li>Nama : {nama}</li>
                <li>Alamat : {alamat}</li>
                <li>Membership : {membership}</li>
            </ul>
            <button>Detail</button>
        </div>
    );
}

export default Customer;