import React from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const SingleBlog = ({ blogs }) => {
  const { id } = useParams(); // Get the blog ID from the URL
  const blog = blogs.find((b) => b.id === parseInt(id)); // Find the blog post by ID

  if (!blog) {
    return <h2>Blog not found</h2>; // Handle case when blog is not found
  }

  return (
    <div className="single-blog">
      <Helmet>
        <title>{blog.title}</title>
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.content.slice(0, 100) + '...'} />
        <meta property="og:image" content={blog.image} /> {/* Open Graph Image */}
        <meta property="og:url" content={`https://yourdomain.com/blog/${blog.id}`} /> {/* Ensure to replace with actual URL */}
        <meta property="og:site_name" content="React News Blog" />
      </Helmet>

      <h2>{blog.title}</h2>
      <img src={blog.image} alt={blog.title} style={{ width: '100%', height: 'auto' }} />
      <p>{blog.content}</p>
      <p><strong>Author:</strong> {blog.author}</p>
      <p><strong>Date:</strong> {blog.date}</p>
    </div>
  );
};

export default SingleBlog;
