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
        <div className="max-w-2xl mx-auto mt-6 sm:mt-10">
            <div className="neo-card bg-white p-6 sm:p-10">
                <h2 className="text-3xl sm:text-4xl font-black uppercase mb-6 sm:mb-8 tracking-tighter">Create New Post</h2>

                {error && (
                    <div className="bg-[var(--secondary)] text-white border-4 border-black p-3 sm:p-4 mb-6 sm:mb-8 font-black uppercase text-center shadow-brutalist">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                    <div className="space-y-2 sm:space-y-3">
                        <label className="block font-black uppercase text-base sm:text-lg tracking-tight">Caption</label>
                        <input
                            type="text"
                            className="neo-input text-lg sm:text-xl py-3 sm:py-4"
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            placeholder="Type something loud..."
                            required
                        />
                    </div>

                    <div className="space-y-2 sm:space-y-3">
                        <label className="block font-black uppercase text-base sm:text-lg tracking-tight">Post Image</label>
                        <div className={`border-4 border-black border-dashed p-6 sm:p-10 text-center cursor-pointer hover:bg-[var(--accent)] transition-colors relative transition-all ${preview ? 'p-0 border-solid' : ''}`}>
                            {!preview ? (
                                <>
                                    <input
                                        type="file"
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                        onChange={handleImageChange}
                                        accept="image/*"
                                        required
                                    />
                                    <Upload className="mx-auto mb-2 sm:mb-4 w-10 h-10 sm:w-12 sm:h-12" strokeWidth={3} />
                                    <p className="font-black uppercase text-xs sm:text-sm tracking-widest">Select Image File</p>
                                </>
                            ) : (
                                <div className="relative aspect-square">
                                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => { setImage(null); setPreview(null); }}
                                        className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-[var(--secondary)] text-white border-4 border-black p-1.5 sm:p-2 shadow-brutalist hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-brutalist-sm transition-all"
                                    >
                                        <X size={20} className="sm:size-[24px]" strokeWidth={3} />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full neo-button py-4 sm:py-6 text-xl sm:text-2xl font-black ${loading ? 'opacity-50 cursor-not-allowed' : 'bg-[var(--main)]'}`}
                    >
                        {loading ? 'POSTING...' : 'PUBLISH NOW'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreatePost
