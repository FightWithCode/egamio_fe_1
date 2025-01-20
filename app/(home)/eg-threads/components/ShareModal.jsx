"use client"

import { useEffect, useRef } from 'react'
import { FaTwitter, FaFacebook, FaLinkedin, FaCopy } from 'react-icons/fa'

export default function ShareModal({ isOpen, onClose, postUrl, title }) {
  const modalRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(postUrl)
      alert('Link copied to clipboard!')
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleShare = async (platform) => {
    const shareData = {
      title: title,
      text: 'Check out this thread!',
      url: postUrl
    }

    try {
      if (navigator.share) {
        await navigator.share(shareData)
      } else {
        // Fallback for platforms without Web Share API
        window.open(
          platform === 'twitter' 
            ? `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(postUrl)}`
            : platform === 'facebook'
            ? `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`
            : `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`,
          '_blank'
        )
      }
    } catch (err) {
      console.error('Error sharing:', err)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div 
        ref={modalRef}
        className="bg-gray-800 p-6 rounded-lg w-full max-w-sm"
      >
        <h3 className="text-xl font-semibold mb-4">Share this thread</h3>
        <div className="space-y-4">
          <button 
            onClick={handleCopyLink}
            className="w-full flex items-center space-x-2 p-2 rounded hover:bg-gray-700"
          >
            <FaCopy />
            <span>Copy link</span>
          </button>
          
          <div className="flex justify-center space-x-4">
            <button 
              onClick={() => handleShare('twitter')}
              className="p-3 rounded-full hover:bg-gray-700"
            >
              <FaTwitter size={24} />
            </button>
            <button 
              onClick={() => handleShare('facebook')}
              className="p-3 rounded-full hover:bg-gray-700"
            >
              <FaFacebook size={24} />
            </button>
            <button 
              onClick={() => handleShare('linkedin')}
              className="p-3 rounded-full hover:bg-gray-700"
            >
              <FaLinkedin size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
