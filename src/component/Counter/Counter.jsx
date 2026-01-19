import { useState } from "react";
import './Counter.css'





const Counter = () => {
    const [count, setCount] = useState(2);
    const tambah = () => {  
        setCount(count + 1);
    };

    const kurang = () => {
        setCount(count - 1);
    };
    
    return (
        <div className="counter-container">
        <h2 className="count-number">{count}</h2>
        <div className="btn-grp">
        <button className="btn-kurang" onClick={kurang}>Kurang</button>
        <button className="btn-tambah" onClick={tambah}>Tambah</button>
        </div>
    </div>
)
};

export default Counter;