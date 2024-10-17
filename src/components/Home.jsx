import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore'; // Import Firestore functions
import { db } from '../firebase'; // Make sure you import your firebase config
import './Header.css';

const Home = () => {
  const [posts, setPosts] = useState([]); // Store all posts

  // Function to shuffle array elements randomly
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsSnapshot = await getDocs(collection(db, 'posts')); // Fetch all posts
        const loadedPosts = postsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Shuffle posts so that they appear randomly
        const shuffledPosts = shuffleArray(loadedPosts);
        setPosts(shuffledPosts); // Set posts to state
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <div className="home">
      <div className="content-container">
        {posts.map((post, index) => (
          <div key={index} className="item">
            <div className="square">
              <img src={post.image} alt={post.caption} className="square-image" />
            </div>
            {/* Caption removed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
