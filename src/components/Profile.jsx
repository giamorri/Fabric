import React, { useEffect, useState, useRef } from 'react';
import { storage, db , auth} from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getDocs } from 'firebase/firestore';
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import {  onSnapshot,collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { query, where } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';  
import './Profile.css';

const Profile = () => {
  const [username, setUsername] = useState('');
  const profileInputRef = useRef(null);
  const coverInputRef = useRef(null);

  const [profileImage, setProfileImage] = useState('path/to/default-profile.jpg'); 
  const [coverImage, setCoverImage] = useState('path/to/default-cover.jpg'); 

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

  useEffect(() => {
    const fetchData = async (user) => {
      try {
        const userId = user.uid;
        const displayName = user.displayName || userId;
        setUsername(displayName);
  
        // Fetch User Data for Profile and Cover Image
        const userDocRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setProfileImage(userData.profileImage || 'path/to/default-profile.jpg');
          setCoverImage(userData.coverImage || 'path/to/default-cover.jpg');
        }
  
        // Fetch posts only created by this user
        const postsQuery = query(
          collection(db, 'posts'),
          where('userId', '==', userId)
        );
        onSnapshot(postsQuery, (snapshot) => {
          const loadedPosts = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          }));
          setPosts(loadedPosts);
          console.log("Posts loaded:", loadedPosts);
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchData(user);
      } else {
        console.log("User is not authenticated.");
        // Optional: Redirect to login page
        // navigate('/login');
      }
    });
  
    return () => unsubscribe();
  }, []);



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

  // Function to toggle the visibility of the comment box
const toggleCommentBox = () => {
  setShowCommentBox(!showCommentBox);
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

  // Function to handle image upload
  const handleImageUpload = async (event, setImage, type) => {
    const file = event.target.files[0];
    if (!file) return;

    const storageRef = ref(storage, `${type}/${username}-${file.name}`);
    
    try {
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      setImage(downloadURL); // Update state with new image URL

      // Check if user document exists, create if not
      const userDocRef = doc(db, 'users', username);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        await setDoc(userDocRef, {}); // Create an empty document if it doesn't exist
      }

      // Save the image URL in Firestore under the appropriate field (profileImage or coverImage)
      await updateDoc(userDocRef, {
        [type]: downloadURL,
      });

      console.log(`${type} image uploaded and saved to Firestore!`);
    } catch (error) {
      console.error(`Error uploading ${type} image:`, error);
    }
};


const triggerFileInput = (inputRef) => {
  inputRef.current.click();
};

 // Handle submitting the post (image + caption)
 const handlePostSubmit = async () => {
  if (postImage && caption) {
    try {
      // Ensure user is authenticated
      const user = auth.currentUser;
      if (!user) {
        console.error("User is not authenticated.");
        return;
      }
      
      const newPost = {
        image: postImage,
        caption,
        liked: false,
        likes: 0,
        comments: [],
        username, // You might use `user.displayName` if available
        userId: user.uid, // Store the UID for reference
        createdAt: serverTimestamp(),
      };

      // Add the new post to Firestore
      await addDoc(collection(db, 'posts'), newPost);

      // Update local state
      setPosts([newPost, ...posts]);
      setPostImage(null);
      setCaption('');
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error creating new post:', error);
    }
  }
};

  // Open post view modal
  const openPostViewModal = (post) => {
    setCurrentPost(post);
    setIsPostViewModalOpen(true);
  };

  
  return (
    <div className="profile-container">
      <div className="profile-header">
      <div className="cover-photo" onClick={() => triggerFileInput(coverInputRef)}>
        <img src={coverImage || 'path/to/default-cover.jpg'} alt="Cover" className="cover-photo-img" />

          <div className="upload-overlay">
            <span>Upload Cover Photo</span>
          </div>
          <input
            type="file"
            ref={coverInputRef}
            onChange={(e) => handleImageUpload(e, setCoverImage, 'coverImage')}
            style={{ display: 'none' }}
            accept="image/*"
          />
        </div>
        <div className="profile-picture-container" onClick={() => triggerFileInput(profileInputRef)}>
        <img src={profileImage || 'path/to/default-profile.jpg'} alt="Profile" className="profile-picture" />

          <div className="upload-overlay">
            <span>Upload Profile Picture</span>
          </div>
          <input
            type="file"
            ref={profileInputRef}
            onChange={(e) => handleImageUpload(e, setProfileImage, 'profileImage')}
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
      <div key={post.id || index} className="post-item" onClick={() => openPostViewModal(post)}>
    <img src={post.image} alt="User Post" className="post-image" />
    <div className="post-info">
          <p>{post.caption}</p>
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
            <div className="post-left">
              <p className="caption">{currentPost.caption}</p>
              <div className="action-buttons">
                <div className="post-header">
                  <div className="like-button" onClick={toggleLike}>
                    <img src={currentPost.liked ? "/images/liked.png" : "/images/like.png"} alt="Like" className="action-icon" /> 
                    <span className="like-count">{currentPost.likes || 0}</span>
                  </div>
                  <div className="comment-button" onClick={toggleCommentBox}>
                    <img src="/images/comment.png" alt="Comment" className="action-icon" />
                    <span className="comment-count">{currentPost.comments.length || 0}</span>
                  </div>
                  <div className="menu-button" onClick={(e) => {
                    e.stopPropagation();
                    setShowMenu(!showMenu);
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
              </div>
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
            <div className="post-right">
              <img src={currentPost.image} alt="Post" className="image-preview-large" />
              <img src={profileImage} alt="Profile" className="profile-picture-small" />
              <p className="username-above">@{username}</p>
            </div>
          </div>
        </div>
      )}
      {notification && (
        <div className="notification show">
          Image URL copied to clipboard!
        </div>
      )}
    </div>
  );
};

export default Profile;
