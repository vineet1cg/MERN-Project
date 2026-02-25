import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createPost } from '../services/api'
import { Upload, X } from 'lucide-react'

const CreatePost = () => {
    const [caption, setCaption] = useState('')
    const [image, setImage] = useState(null)
    const [preview, setPreview] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setImage(file)
            setPreview(URL.createObjectURL(file))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!image || !caption) return

        setLoading(true)
        setError(null)
        const formData = new FormData()
        formData.append('image', image)
        formData.append('caption', caption)

        try {
            await createPost(formData)
            navigate('/')
        } catch (err) {
            setError("Failed to create post. Please try again.")
            setLoading(false)
        }
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="neo-card bg-white">
                <h2 className="text-4xl font-black uppercase mb-8 tracking-tighter">Create New Post</h2>

                {error && (
                    <div className="bg-[var(--secondary)] text-white border-4 border-black p-4 mb-8 font-black uppercase text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-3">
                        <label className="block font-black uppercase text-lg tracking-tight">Caption</label>
                        <input
                            type="text"
                            className="neo-input text-xl py-4"
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            placeholder="Type something loud..."
                            required
                        />
                    </div>

                    <div className="space-y-3">
                        <label className="block font-black uppercase text-lg tracking-tight">Post Image</label>
                        <div className={`border-4 border-black border-dashed p-10 text-center cursor-pointer hover:bg-[var(--accent)] transition-colors relative transition-all ${preview ? 'p-0 border-solid' : ''}`}>
                            {!preview ? (
                                <>
                                    <input
                                        type="file"
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                        onChange={handleImageChange}
                                        accept="image/*"
                                        required
                                    />
                                    <Upload className="mx-auto mb-4" size={48} strokeWidth={3} />
                                    <p className="font-black uppercase text-sm tracking-widest">Select Image File</p>
                                </>
                            ) : (
                                <div className="relative aspect-square">
                                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => { setImage(null); setPreview(null); }}
                                        className="absolute top-4 right-4 bg-[var(--secondary)] text-white border-4 border-black p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                                    >
                                        <X size={24} strokeWidth={3} />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full neo-button py-6 text-2xl font-black ${loading ? 'opacity-50 cursor-not-allowed' : 'bg-[var(--main)]'}`}
                    >
                        {loading ? 'POSTING...' : 'PUBLISH NOW'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreatePost
