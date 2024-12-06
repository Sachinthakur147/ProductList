import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-gray-500 to-gray-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-sky-500 text-2xl font-extrabold">
          <span className="bg-white text-sky-500 px-2 py-1 rounded-lg">PM</span>
          <span className="ml-2">Product Manager</span>
        </h1>

        <div className="flex items-center bg-white rounded-lg shadow-md px-3 py-1 w-1/3">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full border-none outline-none text-gray-700"
          />
        </div>

        <div className="flex items-center space-x-6">
          <Link
            to="/"
            className="text-sky-400 text-lg hover:text-gray-200 transition-colors"
          >
            Home
          </Link>
          <Link
            to="/products"
            className="text-sky-400 text-lg hover:text-gray-200 transition-colors"
          >
            Products
          </Link>

          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM1JHHxuRfDou2rvGOKclVvclj3hMNdKXqQY04ksA7wJsZrCkxGJE0_SezPo3lxg10juw&usqp=CAU"
            alt="Profile"
            className="w-10 h-10 rounded-full border-2 border-white"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
