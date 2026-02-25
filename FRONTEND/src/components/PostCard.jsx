import React from 'react'

const PostCard = ({ image, caption }) => {
    return (
        <div className="neo-card hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
            <div className="border-[var(--border-width)] border-black overflow-hidden mb-4 aspect-square bg-[var(--bg)]">
                <img
                    src={image}
                    alt={caption}
                    className="w-full h-full object-cover"
                />
            </div>
            <p className="font-black text-xl leading-tight uppercase tracking-tight">
                {caption}
            </p>
        </div>
    )
}

export default PostCard
