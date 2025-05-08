import { User, Edit, Trash } from 'lucide-react';

export default function UserTable({  users, onView, onEdit, onDelete,indexOfFirstUser }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <tr>
            <th className="py-3 px-4 text-left">ID</th>
            <th className="py-3 px-4 text-left">Name</th>
            <th className="py-3 px-4 text-left">Profession</th>
            <th className="py-3 px-4 text-left">Email</th>
            <th className="py-3 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-4">{indexOfFirstUser + index + 1}</td>
                <td className="py-3 px-4">{user.name}</td>
                <td className="py-3 px-4">{user.profession}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onView(user)}
                      className="p-1 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200"
                      title="View"
                    >
                      <User className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => onEdit(user)}
                      className="p-1 bg-amber-100 text-amber-600 rounded-md hover:bg-amber-200"
                      title="Edit"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => onDelete(user)}
                      className="p-1 bg-red-100 text-red-600 rounded-md hover:bg-red-200"
                      title="Delete"
                    >
                      <Trash className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="py-6 text-center text-gray-500">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}