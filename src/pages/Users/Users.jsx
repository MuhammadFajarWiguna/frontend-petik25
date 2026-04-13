import axiosInstance from "../../utils/axiosInstance";
import { useEffect, useState } from "react";
import { NavLink, useOutletContext, useNavigate } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { search } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    getUserCategories();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const getUserCategories = async () => {
    try {
      const result = await axiosInstance.get(
        `${import.meta.env.VITE_API_URL}/users`
      );
      setUsers(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredData = users.filter((user) =>
    user.username?.toLowerCase().includes(search.toLowerCase())
  );

  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleDelete = async (uuid) => {
    const msg = window.confirm("Apakah anda yakin ingin menghapus users ini?");
    if (!msg) return;

    try {
      await axiosInstance.delete(
        `${import.meta.env.VITE_API_URL}/users/${uuid}`
      );
      getUserCategories();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="user-header">
        <h3>Daftar Users</h3>
        <NavLink to="/dashboard/users/add">Tambah Users</NavLink>
      </div>

      <div className="table-wrapper">
        <table border={1}>
          <thead>
            <tr>
              <th>No</th>
              <th>Foto</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {paginatedData.map((user, index) => (
              <tr key={user.uuid}>
                <td>
                  {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                </td>

                <td>
                  {user.url ? (
                    <img src={user.url} alt="foto" width={60} />
                  ) : (
                    "Tidak ada gambar"
                  )}
                </td>

                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.status}</td>

                <td>
                  <button
                    onClick={() =>
                      navigate(`/dashboard/users/edit/${user.uuid}`)
                    }
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(user.uuid)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="btn-page"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            &laquo; Prev
          </button>

          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              className="btn-page"
              disabled={currentPage === i + 1}
              key={i}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            className="btn-page"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            &raquo; Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Users;