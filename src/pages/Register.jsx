import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { backend } from '../axios';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'; // Ikonkalar uchun import

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRePassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);

    const navigate = useNavigate();

    function validate() {
        if (username.length < 3) {
            alert("Foydalanuvchi nomi kamida 3 ta belgidan iborat bo'lishi kerak!");
            return false;
        }
        if (!email.includes('@') || email.length < 5) {
            alert("Yaroqli email manzilini kiriting!");
            return false;
        }
        if (password.length < 6) {
            alert("Parol kamida 6 ta belgidan iborat bo'lishi kerak!");
            return false;
        }
        if (password !== repassword) {
            alert("Parollar mos kelmadi!");
            return false;
        }
        return true;
    }

    function handleRegister(event) {
        event.preventDefault();
        const isValid = validate();
        if (!isValid) {
            return;
        }

        const user = {
            username,
            email,
            password,
        };
        setLoading(true);

        backend.post('auth/signup', user, {
            headers: {
                'Content-type': 'application/json',
            },
        })
            .then((response) => {
                if (response.status === 200) {
                    alert("Ro'yxatdan o'tish muvaffaqiyatli!");
                    navigate('/login');
                }
            })
            .catch((error) => {
                alert(
                    error.response?.data?.message ||
                    "Xatolik yuz berdi! Iltimos, qayta urinib ko'ring."
                );
            })
            .finally(() => {
                setLoading(false);
            });
    }

    function handleLogin() {
        navigate('/login');
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Register sahifasiga xush kelibsiz
                </h1>
                <div className="mb-4">
                    <input
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter username..."
                    />
                </div>
                <div className="mb-4">
                    <input
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email..."
                    />
                </div>
                <div className="mb-4 relative">
                    <input
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type={show ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password..."
                    />
                    <span
                        className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-blue-600"
                        onClick={() => setShow(!show)}
                    >
                        {show ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                    </span>
                </div>
                <div className="mb-4 relative">
                    <input
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type={show ? 'text' : 'password'}
                        value={repassword}
                        onChange={(e) => setRePassword(e.target.value)}
                        placeholder="Re-enter password..."
                    />
                </div>
                <button
                    onClick={handleRegister}
                    className={`w-full p-3 text-white rounded-lg ${
                        loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                    } transition duration-300`}
                    disabled={loading}
                >
                    {loading ? 'Loading...' : 'Register'}
                </button>
                <p
                    onClick={handleLogin}
                    className="text-center text-blue-600 mt-4 cursor-pointer hover:underline"
                >
                    Login sahifasiga o'tish
                </p>
            </form>
        </div>
    );
}

export default Register;
