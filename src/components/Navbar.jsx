import { User, Check } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <User className="h-6 w-6" />
            <span className="text-xl font-bold">User Management System</span>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <a href="https://backend-user-management-system-production.up.railway.app/" className="flex items-center hover:text-blue-200 transition-colors">
                  <Check className="h-5 w-5 mr-1" />
                  <span>Refresh Users</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
