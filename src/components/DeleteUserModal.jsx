import { X } from 'lucide-react';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

export default function DeleteUserModal({ isOpen, user, onDelete, onClose, onOutsideClick }) {
  if (!isOpen || !user) return null;

  const [Password, setPassword] = useState("")

  const handleDelete = () => {
    if (Password !== user.location) {
      toast.error('Incorrect password');
      console.log
      return;
    }
    if (Password === '') {
      toast.error('Please enter password');
      return;
    }
    toast.success('User deleted successfully');
    onDelete(user.id);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-[#00000039] bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={(e) => onOutsideClick(e, onClose)}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
          <h3 className="text-xl font-semibold text-gray-800">Confirm Deletion</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="px-6 py-4">
          <p className="text-gray-700">
            Are you sure you want to delete <span className="font-semibold">{user.name}</span>? <br />
            Please enter your password to confirm deletion.
          </p>
          <input type="password"
            name="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            value={Password}
            id="password"
            required="true"
            className='border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md px-3 py-2 mt-4' />
        </div>
        <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3 rounded-b-lg">
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Yes, Delete
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
      />

    </div>
  );
}