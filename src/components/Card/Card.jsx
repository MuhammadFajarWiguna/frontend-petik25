const Card = ({ children }) => {
  return (
    <div style=
    {{ 
        border: "1px solid gray", 
        padding: "16px", 
        borderRadius: "8px" 

    }}>
        <h2>Ini Judul Dari COmponent Car</h2>
      { children }
    </div>
  )
}

export default Card
