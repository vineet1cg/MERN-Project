import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoggingIn(true);

        const result = await login(email, password);

        if (result.success) {
            navigate('/', { replace: true });
        } else {
            setError(result.message);
            setIsLoggingIn(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 sm:mt-20">
            <div className="neo-card bg-white p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6 sm:mb-8">
                    <LogIn size={32} className="text-[var(--main)] sm:size-[40px]" />
                    <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter">Login Required</h2>
                </div>

                {error && (
                    <div className="bg-[var(--secondary)] text-white border-4 border-black p-3 sm:p-4 mb-6 sm:mb-8 font-black uppercase text-center shadow-brutalist">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    <div className="space-y-2">
                        <label className="block font-black uppercase text-base sm:text-lg tracking-tight">Email</label>
                        <input
                            type="email"
                            className="neo-input w-full text-lg sm:text-xl py-3 sm:py-4"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="admin@punchline.dev"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block font-black uppercase text-base sm:text-lg tracking-tight">Password</label>
                        <input
                            type="password"
                            className="neo-input w-full text-lg sm:text-xl py-3 sm:py-4"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoggingIn}
                        className={`w-full neo-button py-4 sm:py-6 mt-2 sm:mt-4 text-xl sm:text-2xl font-black ${isLoggingIn ? 'opacity-50 cursor-not-allowed' : 'bg-[var(--main)]'}`}
                    >
                        {isLoggingIn ? 'AUTHENTICATING...' : 'ENTER WHISPERWALL'}
                    </button>

                    <p className="text-center mt-6 font-bold text-gray-600 uppercase tracking-widest text-sm">
                        Private Access Only
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
