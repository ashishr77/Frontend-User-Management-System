import { X } from 'lucide-react';

export default function ViewUserModal({ isOpen, user, onClose, onEdit, onDelete, onOutsideClick }) {
  if (!isOpen || !user) return null;

  return (
    <div 
      className="fixed inset-0 bg-[#00000039] bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={(e) => onOutsideClick(e, onClose)}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
          <h3 className="text-xl font-semibold text-gray-800">User Details</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="px-6 py-4">
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-500">ID</p>
              <p className="text-gray-800">{user.id}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Profession</p>
              <p className="text-gray-800">{user.profession}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Name</p>
              <p className="text-gray-800">{user.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p className="text-gray-800">{user.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Location</p>
              <p className="text-gray-800">{user.location || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Description</p>
              <p className="text-gray-800">{user.description || 'N/A'}</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3 rounded-b-lg">
          <button
            onClick={() => onEdit(user)}
            className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}