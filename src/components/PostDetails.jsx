import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc, collection, query, where, getDocs, updateDoc } from 'firebase/firestore';
import './Profile.css';
import './PostDetails.css';

const PostDetails = () => {
  const { postId } = useParams(); // Get the post ID from the URL
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]); // Store related posts (from the same user)
  const [randomPosts, setRandomPosts] = useState([]); // Store random posts (from other users)
  const [comment, setComment] = useState('');
  const [profileImage, setProfileImage] = useState('path/to/default-profile.jpg');
  const [username, setUsername] = useState('');
  const [notification, setNotification] = useState(false);

  // Fetch post details based on the post ID
  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const postDocRef = doc(db, 'posts', postId);
        const postDoc = await getDoc(postDocRef);

        if (postDoc.exists()) {
          const postData = postDoc.data();
          setPost(postData);

          // Fetch user data (profile image and username)
          const userDocRef = doc(db, 'users', postData.userId);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUsername(userData.username || postData.userId);
            setProfileImage(userData.profileImage || 'path/to/default-profile.jpg');
          }

          // Fetch related posts from the same user
          const relatedPostsQuery = query(
            collection(db, 'posts'),
            where('userId', '==', postData.userId)
          );
          const relatedPostsSnapshot = await getDocs(relatedPostsQuery);
          const relatedPostsData = relatedPostsSnapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .filter((p) => p.id !== postId); // Exclude the current post

          setRelatedPosts(relatedPostsData);

          // Fetch random posts (not from the current user)
          const randomPostsSnapshot = await getDocs(collection(db, 'posts'));
          const randomPostsData = randomPostsSnapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .filter((p) => p.userId !== postData.userId && p.id !== postId);

          // Shuffle and get a limited number of random posts
          setRandomPosts(randomPostsData.sort(() => 0.5 - Math.random()).slice(0, 5));
        } else {
          console.log('Post does not exist');
        }
      } catch (error) {
        console.error('Error fetching post details:', error);
      }
    };

    fetchPostDetails();
  }, [postId]);

  // Toggle Like Functionality
  const toggleLike = async () => {
    if (post) {
      const updatedPost = {
        ...post,
        liked: !post.liked,
        likes: post.liked ? post.likes - 1 : (post.likes || 0) + 1,
      };

      setPost(updatedPost); // Update the state immediately for better UX

      try {
        const postDocRef = doc(db, 'posts', postId);
        await updateDoc(postDocRef, {
          liked: updatedPost.liked,
          likes: updatedPost.likes,
        });
      } catch (error) {
        console.error('Error updating likes:', error);
      }
    }
  };

  // Function to handle adding comments
  const handleAddComment = () => {
    if (comment) {
      const updatedPost = { ...post, comments: [...(post.comments || []), comment] };
      setPost(updatedPost);
      setComment(''); // Clear comment input
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(post.image).then(() => {
      setNotification(true);
      setTimeout(() => {
        setNotification(false);
      }, 3000);
    });
  };

  if (!post) {
    return <p>Loading post...</p>;
  }

  return (
    <div className="profile-container">
      <div className="modal-post-view-content">
        <div className="post-left">
          <p className="caption">{post.caption}</p>
          <div className="action-buttons">
            <div className="post-header">
              <div className="like-button" onClick={toggleLike}>
                <img
                  src={post.liked ? '/images/liked.png' : '/images/like.png'}
                  alt="Like"
                  className="action-icon"
                />
                <span className="like-count">{post.likes || 0}</span>
              </div>
              <div className="comment-button">
                <img src="/images/comment.png" alt="Comment" className="action-icon" />
                <span className="comment-count">{post.comments?.length || 0}</span>
              </div>
              <div className="menu-button" onClick={handleShare}>
                <img src="/images/share.png" alt="Menu" />
              </div>
            </div>
          </div>

          <div className="comments-section">
            <h4>Comments</h4>
            {post.comments?.length > 0 ? (
              post.comments.map((comment, index) => <p key={index} className="comment-item">{comment}</p>)
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
          <img src={post.image} alt="Post" className="image-preview-large" />
          <img src={profileImage} alt="Profile" className="profile-picture-small" />
          <p className="username-above">
            <Link to={`/user/${post.userId}`}>@{username}</Link> {/* Link to user profile */}
          </p>
        </div>
      </div>

      {notification && (
        <div className="notification show">
          Image URL copied to clipboard!
        </div>
      )}

      {/* Related Posts Section */}
      <div className="related-posts-section">
        <h3>More from @{username}</h3>
        <div className="related-posts-grid">
          {relatedPosts.length > 0 ? (
            relatedPosts.map((relatedPost) => (
              <Link to={`/post/${relatedPost.id}`} key={relatedPost.id} className="related-post-item">
                <img src={relatedPost.image} alt={relatedPost.caption} className="related-post-image" />
              </Link>
            ))
          ) : (
            <p>No more posts from this user.</p>
          )}
        </div>
      </div>

      {/* Random Posts Section */}
      <div className="random-posts-section">
        <h3>Other posts you may like</h3>
        <div className="random-posts-grid">
          {randomPosts.map((randomPost) => (
            <Link to={`/post/${randomPost.id}`} key={randomPost.id} className="random-post-item">
              <img src={randomPost.image} alt={randomPost.caption} className="random-post-image" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
