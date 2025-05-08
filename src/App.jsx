

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import AddUserButton from './components/AddUserButton';
import UserTable from './components/UserTable';
import Pagination from './components/Pagination';
import ViewUserModal from './components/ViewUserModal';
import AddEditUserModal from './components/AddEditUserModal';
import DeleteUserModal from './components/DeleteUserModal';

export default function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);

  const emptyUser = {
    id: '',
    profession: '',
    name: '',
    email: '',
    location: '',
    description: ''
  };

  const [formData, setFormData] = useState(emptyUser);

  // Fetch users from API
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://backend-user-management-system-production.up.railway.app/users');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setUsers(data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching users: ' + error.message);
      setLoading(false);
    }
  };

  // Filter users based on search term
  const filteredUsers = users.filter(user => 
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.profession?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // View user
  const handleView = (user) => {
    setSelectedUser(user);
    setIsViewModalOpen(true);
  };

  // Edit user
  const handleEdit = (user) => {
    setFormData(user);
    setIsEditModalOpen(true);
  };

  // Add user
  const handleAddUser = () => {
    setFormData(emptyUser);
    setIsAddModalOpen(true);
  };

  // Delete user
  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`https://backend-user-management-system-production.up.railway.app/user/${selectedUser.id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
      
      setUsers(users.filter(user => user.id !== selectedUser.id));
      setIsDeleteModalOpen(false);
    } catch (error) {
      setError('Error deleting user: ' + error.message);
    }
  };

  // Submit form to add or edit user
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
    try {
      let url = 'https://backend-user-management-system-production.up.railway.app/user';
      let method = 'POST';
      
      if (formData.id && isEditModalOpen) {
        url = `https://backend-user-management-system-production.up.railway.app/user/${formData.id}`;
        method = 'PUT';
      }
      
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to ${isEditModalOpen ? 'update' : 'add'} user`);
      }
      
      const updatedUser = await response.json();
      
      if (isEditModalOpen) {
        setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
        setIsEditModalOpen(false);
      } else {
        setUsers([...users, updatedUser]);
        setIsAddModalOpen(false);
      }
      
      setFormData(emptyUser);
    } catch (error) {
      setError(`Error ${isEditModalOpen ? 'updating' : 'adding'} user: ` + error.message);
    }
  };

  // Close modals when clicking outside
  const handleOutsideClick = (e, closeFunction) => {
    if (e.target === e.currentTarget) {
      closeFunction(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">User Management</h1>
            <div className="flex flex-col sm:flex-row w-full md:w-auto gap-4">
              <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
              <AddUserButton onAddUser={handleAddUser} />
            </div>
          </div>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4">
              {error}
            </div>
          ) : (
            <>
              <UserTable 
                users={currentUsers} 
                onView={handleView} 
                onEdit={handleEdit} 
                onDelete={handleDeleteClick} 
                indexOfFirstUser={indexOfFirstUser}
              />
              <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                setCurrentPage={setCurrentPage} 
                filteredUsers={filteredUsers} 
                indexOfFirstUser={indexOfFirstUser} 
                indexOfLastUser={indexOfLastUser} 
              />
            </>
          )}
        </div>
      </main>
      <ViewUserModal 
        isOpen={isViewModalOpen} 
        user={selectedUser} 
        onClose={() => setIsViewModalOpen(false)} 
        onEdit={handleEdit} 
        onDelete={() => { setIsViewModalOpen(false); setIsDeleteModalOpen(true); }} 
        onOutsideClick={handleOutsideClick} 
      />
      <AddEditUserModal 
        isOpen={isAddModalOpen || isEditModalOpen} 
        isEdit={isEditModalOpen} 
        formData={formData} 
        onInputChange={handleInputChange} 
        onSubmit={handleSubmit} 
        onClose={() => isEditModalOpen ? setIsEditModalOpen(false) : setIsAddModalOpen(false)} 
        onOutsideClick={handleOutsideClick} 
      />
      <DeleteUserModal 
        isOpen={isDeleteModalOpen} 
        user={selectedUser} 
        onDelete={handleDelete} 
        onClose={() => setIsDeleteModalOpen(false)} 
        onOutsideClick={handleOutsideClick} 
      />
    </div>
  );
}
