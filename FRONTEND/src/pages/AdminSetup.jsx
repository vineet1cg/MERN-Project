import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

const ADMIN_KEY = 'punchline-admin-2026'; // Secret passphrase to access this page

const API_URL = import.meta.env.PROD ? import.meta.env.VITE_BACKEND_URL : '/api';

const AdminSetup = () => {
    const [adminKey, setAdminKey] = useState('');
    const [unlocked, setUnlocked] = useState(false);
    const [form, setForm] = useState({ username: '', email: '', password: '' });
    const [message, setMessage] = useState(null);
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();

    const handleUnlock = (e) => {
        e.preventDefault();
        if (adminKey === ADMIN_KEY) {
            setUnlocked(true);
        } else {
            setMessage('Invalid admin key.');
            setIsError(true);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        setMessage(null);
        try {
            const res = await axios.post(`${API_URL}/auth/register`, form);
            if (res.data.success) {
                setMessage(`✅ User "${form.username}" created successfully! You can now log in.`);
                setIsError(false);
                setForm({ username: '', email: '', password: '' });
            }
        } catch (err) {
            setMessage(err.response?.data?.message || 'Failed to create user.');
            setIsError(true);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-16">
            <div className="neo-card bg-white">
                <div className="flex items-center gap-3 mb-6">
                    <ShieldCheck size={36} className="text-[var(--main)]" />
                    <h2 className="text-3xl font-black uppercase tracking-tighter">Admin Setup</h2>
                </div>

                {message && (
                    <div className={`border-4 border-black p-3 mb-6 font-bold uppercase text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${isError ? 'bg-red-400' : 'bg-green-400'}`}>
                        {message}
                    </div>
                )}

                {!unlocked ? (
                    <form onSubmit={handleUnlock} className="space-y-4">
                        <div>
                            <label className="block font-black uppercase mb-1">Admin Key</label>
                            <input
                                type="password"
                                className="neo-input w-full"
                                value={adminKey}
                                onChange={(e) => setAdminKey(e.target.value)}
                                placeholder="Enter admin key"
                                required
                            />
                        </div>
                        <button type="submit" className="w-full neo-button py-4 font-black bg-[var(--main)]">
                            UNLOCK
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleCreate} className="space-y-4">
                        <div>
                            <label className="block font-black uppercase mb-1">Username</label>
                            <input
                                type="text"
                                className="neo-input w-full"
                                value={form.username}
                                onChange={(e) => setForm({ ...form, username: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label className="block font-black uppercase mb-1">Email</label>
                            <input
                                type="email"
                                className="neo-input w-full"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label className="block font-black uppercase mb-1">Password</label>
                            <input
                                type="password"
                                className="neo-input w-full"
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                required
                            />
                        </div>
                        <button type="submit" className="w-full neo-button py-4 font-black bg-[var(--main)]">
                            CREATE USER
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/login')}
                            className="w-full neo-button py-3 font-black bg-white"
                        >
                            GO TO LOGIN
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default AdminSetup;
