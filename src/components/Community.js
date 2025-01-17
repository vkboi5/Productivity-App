import React, { useState, useEffect } from 'react';
import styles from './Community.module.css'; // Import custom CSS for styling

const Community = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');

  // Fetch posts from the server
  useEffect(() => {
    fetch('http://localhost:5000/posts')
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  // Handle adding a new post
  const handleAddPost = () => {
    if (newPost.trim()) {
      fetch('http://localhost:5000/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: 'You', content: newPost }),
      })
        .then((response) => response.json())
        .then((data) => setPosts([...posts, data]));

      setNewPost('');
    }
  };

  // Handle deleting a post
  const handleDeletePost = (id) => {
    fetch(`http://localhost:5000/posts/${id}`, {
      method: 'DELETE',
    })
      .then(() => setPosts(posts.filter((post) => post._id !== id)));
  };

  // Handle updating a post
  const handleUpdatePost = (id, updatedContent) => {
    fetch(`http://localhost:5000/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: updatedContent }),
    })
      .then((response) => response.json())
      .then((data) => {
        setPosts(posts.map((post) => (post._id === id ? data : post)));
      });
  };

  return (
    <div className={styles.communityContainer}>
      <h1 className={styles.header}>Community</h1>
      <div className={styles.newPostContainer}>
        <textarea
          className={styles.textarea}
          placeholder="What's on your mind?"
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        />
        <button className={styles.postButton} onClick={handleAddPost}>
          Post
        </button>
      </div>

      <div className={styles.postsList}>
        {posts.map((post) => (
          <div key={post._id} className={styles.post}>
            <div className={styles.postHeader}>
              <span className={styles.user}>{post.user}</span>
              <span className={styles.date}>
                {new Date(post.createdAt).toLocaleString()}
              </span>
            </div>
            <div className={styles.postContent}>
              <p>{post.content}</p>
            </div>
            <div className={styles.postActions}>
              <button
                className={styles.editButton}
                onClick={() => {
                  const updatedContent = prompt('Edit your post:', post.content);
                  if (updatedContent !== null) {
                    handleUpdatePost(post._id, updatedContent);
                  }
                }}
              >
                Edit
              </button>
              <button
                className={styles.deleteButton}
                onClick={() => handleDeletePost(post._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;
