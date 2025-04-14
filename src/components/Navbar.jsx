import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-dark-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary-500">
          CrimeFiles
        </Link>
        <div className="flex space-x-4">
          <Link to="/search" className="hover:text-primary-500 transition">
            Search Crimes
          </Link>
          <Link to="/login" className="hover:text-primary-500 transition">
            Admin Login
          </Link>
        </div>
      </div>
    </nav>
  );
}