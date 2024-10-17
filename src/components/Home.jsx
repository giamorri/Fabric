import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  // Function to shuffle array elements randomly
  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsSnapshot = await getDocs(collection(db, 'posts'));
        const loadedPosts = postsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPosts(shuffleArray(loadedPosts));
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  // Handler for clicking a post
  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`);
  };

  return (
    <div className="home">
      <div className="content-container">
        {posts.map((post, index) => (
          <div key={index} className="item" onClick={() => handlePostClick(post.id)}>
            <div className="square">
              <img src={post.image} alt={post.caption} className="square-image" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
