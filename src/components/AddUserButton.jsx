import { Plus } from 'lucide-react';

export default function AddUserButton({ onAddUser }) {
  return (
    <button
      onClick={onAddUser}
      className="flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      <Plus className="h-5 w-5 mr-2" />
      Add User
    </button>
  );
}