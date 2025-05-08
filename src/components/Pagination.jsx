import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ currentPage, totalPages, setCurrentPage, filteredUsers, indexOfFirstUser, indexOfLastUser }) {
  return (
    filteredUsers.length > 0 && (
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-500">
          Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, filteredUsers.length)} of {filteredUsers.length} entries
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed bg-gray-200 hover:bg-gray-300"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex items-center px-4">
            Page {currentPage} of {totalPages || 1}
          </div>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages || totalPages === 0}
            className="p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed bg-gray-200 hover:bg-gray-300"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    )
  );
}