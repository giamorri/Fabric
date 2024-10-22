import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'; // Import Link to navigate to PostDetails
import { db } from '../firebase';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import './UserProfile.css';

const UserProfile = () => {
  const { userId } = useParams(); // Get the userId from the URL
  const [userData, setUserData] = useState(null); // Store user data
  const [posts, setPosts] = useState([]); // Store user's posts

  // Fetch user profile and posts
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Fetch user data
        const userDocRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }

        // Fetch posts made by this user
        const postsQuery = query(collection(db, 'posts'), where('userId', '==', userId));
        const postsSnapshot = await getDocs(postsQuery);
        const userPosts = postsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(userPosts);
      } catch (error) {
        console.error('Error fetching user data or posts:', error);
      }
    };

    fetchUserProfile();
  }, [userId]);

  if (!userData) {
    return <p>Loading user profile...</p>;
  }

  return (
    <div className="user-profile-container">
      <div className="cover-photo">
        <img src={userData.coverImage || 'path/to/default-cover.jpg'} alt="Cover" className="cover-photo-img" />
      </div>
      <div className="profile-picture-container">
        <img src={userData.profileImage || 'path/to/default-profile.jpg'} alt="Profile" className="profile-picture" />
      </div>
      <h1 className="username">@{userData.username}</h1>

      <div className="user-posts-section">
        <div className="user-posts-grid">
          {posts.length > 0 ? (
            posts.map((post) => (
              <Link to={`/post/${post.id}`} key={post.id} className="user-post-item">
                <img src={post.image} alt={post.caption} className="user-post-image" />
                <p>{post.caption}</p>
              </Link>
            ))
          ) : (
            <p>No posts yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
