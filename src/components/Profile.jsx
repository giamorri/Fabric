import React, { useEffect, useState, useRef } from 'react';
import './Profile.css';

const Profile = () => {
  const [username, setUsername] = useState('');
  const profileInputRef = useRef(null);
  const coverInputRef = useRef(null);

  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [coverImage, setCoverImage] = useState('default-cover.jpg');
  const [isModalOpen, setIsModalOpen] = useState(false); // For post creation modal
  const [isPostViewModalOpen, setIsPostViewModalOpen] = useState(false); // For viewing a post modal
  const [postImage, setPostImage] = useState(null); // Store uploaded image for post
  const [caption, setCaption] = useState(''); // Store caption for post
  const [posts, setPosts] = useState([]); // Store all posts
  const [currentPost, setCurrentPost] = useState(null); // Track post for view modal
  const [comment, setComment] = useState(''); // Store new comment
  const [showCommentBox, setShowCommentBox] = useState(false); // Add state to control comment input visibility
  const [showMenu, setShowMenu] = useState(false); // Add state to control the menu display
  const [notification, setNotification] = useState(false); // Add state for showing notification

  // Function to toggle the comment box
  const toggleCommentBox = () => {
    setShowCommentBox(!showCommentBox);
  };

  // Function to handle toggling likes
const toggleLike = () => {
  if (currentPost) {
    const updatedPost = { 
      ...currentPost, 
      liked: !currentPost.liked, 
      likes: currentPost.liked ? currentPost.likes - 1 : (currentPost.likes || 0) + 1 // Adjust likes safely
    };

    const updatedPosts = posts.map((post) => 
      post === currentPost ? updatedPost : post
    );

    setPosts(updatedPosts);
    setCurrentPost(updatedPost);
  }
};


  // Function to handle adding comments
  const handleAddComment = () => {
    if (comment) {
      const updatedPost = { ...currentPost, comments: [...currentPost.comments, comment] };
      const updatedPosts = posts.map((post) => (post === currentPost ? updatedPost : post));
      setPosts(updatedPosts);
      setCurrentPost(updatedPost);
      setComment(''); // Clear comment input
    }
  };

  // Function to toggle the menu (show/hide)
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  // Function to handle image download
  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = currentPost.image;
    link.download = 'post-image.jpg'; // Change the filename as needed
    link.click();
  };

   // Function to handle sharing the post (simulating copying the image URL)
   const handleShare = () => {
    navigator.clipboard.writeText(currentPost.image).then(() => {
      // Show notification
      setNotification(true);

      // Hide notification after 3 seconds
      setTimeout(() => {
        setNotification(false);
      }, 3000);
    });
  };

  
  
  const handleImageUpload = (event) => {
    const formData = new FormData();
    formData.append('profileImage', event.target.files[0]);
    formData.append('username', localStorage.getItem('username')); // Retrieve the username from localStorage

    fetch('http://localhost:5000/api/upload-profile-image', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        const imageUrl = `http://localhost:5000/${data.profileImageUrl}`;
        setProfileImageUrl(imageUrl);
        localStorage.setItem('profileImage', imageUrl); // Save new profile image to localStorage
      })
      .catch((error) => {
        console.error('Error uploading image:', error);
      });
  };

  const triggerFileInput = () => {
    profileInputRef.current.click();
  };
  
   


 // Handle submitting the post (image + caption)
const handlePostSubmit = () => {
  if (postImage && caption) {
    const newPost = { 
      image: postImage, 
      caption, 
      liked: false, 
      likes: 0, // Initialize likes with 0
      comments: [] 
    };
    setPosts([newPost, ...posts]); // Add new post at the top
    setPostImage(null);
    setCaption('');
    setIsModalOpen(false); // Close modal
  }
};



  // Open post view modal
  const openPostViewModal = (post) => {
    setCurrentPost(post);
    setIsPostViewModalOpen(true);
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedProfileImage = localStorage.getItem('profileImage');

    if (storedUsername) {
      setUsername(storedUsername);
    }

    if (storedProfileImage) {
      setProfileImageUrl(storedProfileImage);
    }
  }, []);
  
  
  
  
  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="cover-photo" onClick={() => triggerFileInput(coverInputRef)}>
          <img src={coverImage} alt="Cover" className="cover-photo-img" />
          <div className="upload-overlay">
            <span>Upload Cover Photo</span>
          </div>
          <input
            type="file"
            ref={coverInputRef}
            onChange={(e) => handleImageUpload(e, setCoverImage)}
            style={{ display: 'none' }}
            accept="image/*"
          />
        </div>
        <div className="profile-picture-container" onClick={() => triggerFileInput(profileInputRef)}>
        <img src={profileImageUrl} alt="Profile" className="profile-picture" />
          <div className="upload-overlay">
            <span>Upload Profile Picture</span>
          </div>
          <input
            type="file"
            ref={profileInputRef}
            onChange={(e) => handleImageUpload(e, setProfileImageUrl)}
            style={{ display: 'none' }}
            accept="image/*"
          />
        </div>

        <h1 className="profile-name">{username}</h1>
        <p className="fabricusername">@{username}</p>
        <div className="profile-actions">
          <button className="upload-post-button" onClick={() => setIsModalOpen(true)}>
            Upload Post
          </button>
        </div>
      </div>

      {/* Modal for creating a post */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Upload Image and Add Caption</h3>
            <input
              type="file"
              accept="image/*"
              onChange={(event) => handleImageUpload(event, setPostImage)}
            />
            {postImage && <img src={postImage} alt="Preview" className="image-preview" />}
            <input
              type="text"
              placeholder="Add a caption..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="caption-input"
            />
            <button className="post-button" onClick={handlePostSubmit}>
              Post
            </button>
            <button className="cancel-button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Display user posts */}
      <div className="posts-section">
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <div key={index} className="post-item" onClick={() => openPostViewModal(post)}>
              <img src={post.image} alt="User Post" className="post-image" />
              <div className="post-info">
              </div>
            </div>
          ))
        ) : (
          <p className="no-posts-message">No posts yet. Upload your first post!</p>
        )}
      </div>

      {/* Modal for viewing a post */}
      {isPostViewModalOpen && currentPost && (
        <div className="modal-overlay" onClick={(e) => {
          if (e.target.className === 'modal-overlay') {
            setIsPostViewModalOpen(false);
          }
        }}>
          <div className="modal-post-view-content">
            {/* Left side: Caption and Comments */}
            <div className="post-left">
              {/* Caption of the image */}
              <p className="caption">{currentPost.caption}</p>

              {/* Action buttons (like, comment, menu) */}
              <div className="action-buttons">
                <div className="post-header">
                  <div className="like-button" onClick={toggleLike}>
                    <img src={currentPost.liked ? "/images/liked.png" : "/images/like.png"} alt="Like" className="action-icon" /> 
                    <span className="like-count">{currentPost.likes || 0}</span> {/* Display number of likes below */}
                  </div>
                  <div className="comment-button" onClick={toggleCommentBox}>
                    <img src="/images/comment.png" alt="Comment" className="action-icon" />
                    <span className="comment-count">{currentPost.comments.length || 0}</span> {/* Display number of comments below */}
                  </div>
                  <div className="menu-button" onClick={(e) => {
                    e.stopPropagation(); // Prevent the menu from toggling multiple times
                    setShowMenu(!showMenu); // Only toggle once
                  }}>
                    <img src="/images/menu.png" alt="Menu" />
                  </div>

                  {showMenu && (
                    <div className="menu-options" onClick={(e) => e.stopPropagation()}>
                      <button onClick={downloadImage}>Download</button>
                      <button onClick={handleShare}>Share</button>
                    </div>
                  )}


                </div>

                {/* Menu options (download, share) */}
                {showMenu && (
                  <div className="menu-options">
                    <button onClick={downloadImage}>Download</button>
                    <button onClick={handleShare}>Share</button>
                  </div>
                )}
              </div>

              {/* Comments Section */}
              <div className="comments-section">
                <h4>Comments</h4>
                {currentPost.comments.length > 0 ? (
                  currentPost.comments.map((comment, index) => (
                    <p key={index} className="comment-item">{comment}</p>
                  ))
                ) : (
                  <p>No comments yet.</p>
                )}
              </div>

              {/* Comment input box at the bottom */}
              <div className="comment-box">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  className="comment-input"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleAddComment();
                  }}
                />
                <button onClick={handleAddComment}>Post</button>
              </div>
            </div>

            {/* Right side: Image and Profile */}
            <div className="post-right">
              <img src={currentPost.image} alt="Post" className="image-preview-large" />

              {/* Profile Image on the right */}
              <img src={profileImageUrl} alt="Profile" className="profile-picture-small" /> 

              {/* Username above the post image */}
              <p className="username-above">@{username}</p>
            </div>
          </div>
        </div>
      )}
        {/* Share notification */}
        {notification && (
        <div className="notification show">
          Image URL copied to clipboard!
        </div>
      )}
      
    </div>
  );
};

export default Profile;
