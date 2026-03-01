import React, { useState, useEffect } from 'react'
import { fetchPosts } from '../services/api'
import PostCard from '../components/PostCard'
import { Loader2 } from 'lucide-react'

const Home = () => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const getPosts = async () => {
            try {
                const data = await fetchPosts()
                setPosts(data)
            } catch (err) {
                setError("Failed to load posts. Is the backend running?")
            } finally {
                setLoading(false)
            }
        }
        getPosts()
    }, [])

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="animate-spin mb-4 text-[var(--main)]" size={64} strokeWidth={3} />
                <p className="font-black text-2xl uppercase tracking-tighter">Loading Feed...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="neo-card bg-[var(--secondary)] text-white text-center py-10 scale-105">
                <p className="font-black text-3xl uppercase mb-2 tracking-tighter">Error!</p>
                <p className="font-bold text-xl">{error}</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-12">
            {posts.length > 0 ? (
                posts.map((post) => (
                    <PostCard key={post._id} image={post.image} caption={post.caption} />
                ))
            ) : (
                <div className="col-span-full text-center py-12 sm:py-20 neo-card bg-[var(--accent)]">
                    <p className="font-black text-2xl sm:text-4xl uppercase tracking-tighter">No posts yet!</p>
                    <p className="font-bold text-base sm:text-lg mt-4 uppercase">Be the first player to start the feed.</p>
                </div>
            )}
        </div>
    )
}

export default Home
