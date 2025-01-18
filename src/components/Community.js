import React, { useState, useEffect } from "react";
import styles from "./Community.module.css";

const Community = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({ title: "", desc: "", img: "" });
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const userId = localStorage.getItem("authUser") || "Anonymous User";

  // Load dummy blogs or blogs from localStorage
  useEffect(() => {
    const savedBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
    if (savedBlogs.length === 0) {
      const dummyBlogs = [
        {
          _id: "1",
          title: "Welcome to the Community!",
          desc: "This is a place to share your thoughts and ideas.",
          img: "https://via.placeholder.com/300",
          date: new Date().toISOString(),
          user: "Admin",
        },
        {
          _id: "2",
          title: "Stay Productive!",
          desc: "Share your tips on productivity and time management.",
          img: "",
          date: new Date().toISOString(),
          user: "Admin",
        },
      ];
      setBlogs(dummyBlogs);
      localStorage.setItem("blogs", JSON.stringify(dummyBlogs));
    } else {
      setBlogs(savedBlogs);
    }
  }, []);

  // Save blogs to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("blogs", JSON.stringify(blogs));
  }, [blogs]);

  // Handle adding a new blog
  const handleAddBlog = () => {
    if (newBlog.title.trim() && newBlog.desc.trim()) {
      const newBlogEntry = {
        ...newBlog,
        _id: Date.now().toString(),
        date: new Date().toISOString(),
        user: userId,
      };
      setBlogs([...blogs, newBlogEntry]);
      setNewBlog({ title: "", desc: "", img: "" });
      setIsPopupOpen(false);
    }
  };

  // Handle deleting a blog
  const handleDeleteBlog = (id) => {
    setBlogs(blogs.filter((blog) => blog._id !== id));
  };

  // Handle updating a blog
  const handleUpdateBlog = (id) => {
    const updatedTitle = prompt("Edit blog title:");
    const updatedDesc = prompt("Edit blog description:");
    if (updatedTitle && updatedDesc) {
      setBlogs(
        blogs.map((blog) =>
          blog._id === id ? { ...blog, title: updatedTitle, desc: updatedDesc } : blog
        )
      );
    }
  };

  return (
    <div className={styles.communityContainer}>
      <h1 className={styles.header}>Community Corner</h1>
      <button className={styles.addPostButton} onClick={() => setIsPopupOpen(true)}>
        + Create Post
      </button>

      {isPopupOpen && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <h2 className={styles.popupHeader}>Share Your Thoughts</h2>
            <input
              type="text"
              className={styles.input}
              placeholder="Blog Title"
              value={newBlog.title}
              onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
            />
            <textarea
              className={styles.textarea}
              placeholder="Blog Description"
              value={newBlog.desc}
              onChange={(e) => setNewBlog({ ...newBlog, desc: e.target.value })}
            />
            <input
              type="text"
              className={styles.input}
              placeholder="Image URL (optional)"
              value={newBlog.img}
              onChange={(e) => setNewBlog({ ...newBlog, img: e.target.value })}
            />
            <div className={styles.popupActions}>
              <button className={styles.saveButton} onClick={handleAddBlog}>
                Post
              </button>
              <button className={styles.cancelButton} onClick={() => setIsPopupOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={styles.postsList}>
        {blogs.map((blog) => (
          <div key={blog._id} className={styles.post}>
            <div className={styles.postHeader}>
              <h2 className={styles.postTitle}>{blog.title}</h2>
              <span className={styles.postUser}>by {blog.user}</span>
              <span className={styles.postDate}>
                {new Date(blog.date).toLocaleString()}
              </span>
            </div>
            {blog.img && <img src={blog.img} alt={blog.title} className={styles.postImage} />}
            <p className={styles.postDescription}>{blog.desc}</p>
            <div className={styles.postActions}>
              <button className={styles.editButton} onClick={() => handleUpdateBlog(blog._id)}>
                Edit
              </button>
              <button className={styles.deleteButton} onClick={() => handleDeleteBlog(blog._id)}>
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
