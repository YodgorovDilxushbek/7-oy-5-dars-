import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Counter from './components/Counter';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            <Link to="/" className="hover:text-yellow-400 transition duration-300">
              Counter App
            </Link>
          </h1>
          <nav className="flex gap-6">
            <Link
              to="/login"
              className="px-4 py-2 rounded-lg hover:bg-yellow-400 hover:text-blue-900 transition duration-300"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 rounded-lg hover:bg-yellow-400 hover:text-blue-900 transition duration-300"
            >
              Register
            </Link>
          </nav>
        </div>
      </header>
      <main className="container mx-auto p-6">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Counter />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    
    </div>
  );
}

export default App;
