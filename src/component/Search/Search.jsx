import { useState } from "react";
import { Input, InputGroup, InputGroupText, } from "reactstrap";
import { FaSearch } from "react-icons/fa";

const Search = ({ totalPost, onSearchChange }) => {
  const [search, setSearch] = useState("keyword");

  const handleChangeSearch = (e) => {
    const keyword = e.target.value.toLowerCase();
    setSearch(keyword);

    onSearchChange(keyword);
  };
  return (
    <div className="mb-4">
      <InputGroup>
        <InputGroupText>
        <FaSearch size={18} className="me-2"/>
        </InputGroupText>
        <Input placeholder="username" />
      <Input 
      type="text" 
      onChange={handleChangeSearch} 
      placeholder="Cari artikel..." 
      />
      </InputGroup>
      
      <small className="text-muted d-block mt-2">
        Ditemukan <b>{totalPost}</b> data dengan pencarian kata <b>{search}</b>
      </small>
    </div>
  );
};

export default Search;
