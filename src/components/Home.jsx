import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import './Header.css'; // Assuming styles for header/navigation are in Header.css

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsSnapshot = await getDocs(collection(db, 'posts'));
        const loadedPosts = postsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPosts(loadedPosts);
        setFilteredPosts(loadedPosts); // Initialize filtered posts
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  // Fetch users matching the search query
  const fetchUsers = async (searchText) => {
    try {
      const usersSnapshot = await getDocs(query(collection(db, 'users'), where('username', '>=', searchText)));
      const matchedUsers = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setFilteredUsers(matchedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Handle Search Input
  const handleSearch = (event) => {
    const searchText = event.target.value.toLowerCase();
    setSearchQuery(searchText);

    if (searchText === '') {
      // If search bar is empty, reset to show all posts and no user search results
      setFilteredPosts(posts);
      setFilteredUsers([]);
    } else {
      // Fetch matching users based on search
      fetchUsers(searchText);

      // Filter posts based on username
      const filtered = posts.filter((post) => post.username && post.username.toLowerCase().includes(searchText));
      setFilteredPosts(filtered);
    }
  };

  // Handle clicking on a user from search results
  const handleUserClick = (userId) => {
    navigate(`/user/${userId}`); // Navigate to user profile page
  };

  // Handle clicking on a post
  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`); // Navigate to the PostDetails page
  };

  return (
    <div className="home">
      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for users..."
          value={searchQuery}
          onChange={handleSearch}
        />
        <button className="search-button">
          <img src="/images/search.png" alt="Search" />
        </button>
      </div>

      {/* Conditionally show search results or all posts */}
      {searchQuery && filteredUsers.length > 0 && (
        <div className="search-results">
          <h2>Search Results</h2>
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="search-item"
              onClick={() => handleUserClick(user.id)}
            >
              <img src={user.profileImage || 'path/to/default-profile.jpg'} alt={user.username} className="search-user-image" />
              <p>{user.username}</p>
            </div>
          ))}
        </div>
      )}

      {/* Content Container for Posts */}
      <div className="content-container">
        {filteredPosts.map((post, index) => (
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
