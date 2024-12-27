import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { backend } from '../axios';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    function validate() {
        if (!username || username.length < 3) {
            alert("Foydalanuvchi nomi kamida 3 ta belgi bo'lishi kerak!");
            return false;
        }
        if (!password || password.length < 6) {
            alert("Parol kamida 6 ta belgi bo'lishi kerak!");
            return false;
        }
        return true;
    }

    function handleLogin(event) {
        event.preventDefault();
        const isValid = validate();
        if (!isValid) {
            return;
        }

        const user = {
            username,
            password,
        };
        setLoading(true);

        backend.post('auth/signin', user, {
            headers: {
                'Content-type': 'application/json',
            },
        })
            .then((response) => {
                if (response.status === 200) {
                    localStorage.setItem('token', response.data.token);
                    navigate('/');
                }
            })
            .catch((error) => {
                if (error.response && error.response.status === 400) {
                    alert(error.response.data.message || 'Noto‘g‘ri foydalanuvchi ma‘lumotlari!');
                } else {
                    alert('Registerga oting sizning tokeningiz yoq yoki login yo parol xato!');
                }
            })
            .finally(() => {
                setLoading(false);
            });
    }

    function handleRegister() {
        navigate('/register');
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Login sahifasiga xush kelibsiz</h1>
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
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password..."
                    />
                </div>
                <button
                    onClick={handleLogin}
                    className={`w-full p-3 text-white rounded-lg ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                        } transition duration-300`}
                    disabled={loading}
                >
                    {loading ? 'Loading...' : 'Login'}
                </button>
                <p
                    onClick={handleRegister}
                    className="text-center text-blue-600 mt-4 cursor-pointer hover:underline"
                >
                    Register sahifasiga o'tish
                </p>
            </form>
        </div>
    );
}

export default Login;
