import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // Notice we use Routes now
import { Helmet } from 'react-helmet';
import SingleBlog from './SingleBlog'; // Import SingleBlog component

const App = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Fetch data from the JSON file
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => setBlogs(data));
  }, []);

  return (
    <Router>
      <div className="App">
        <Helmet>
          <title>React News Blog</title>
          <meta name="description" content="Latest news and updates in the React and JavaScript ecosystem" />
        </Helmet>

        <header>
          <h1>React News Blog</h1>
        </header>

        <div className="blog-list">
          {/* Notice the Routes component here */}
          <Routes>
            <Route 
              path="/" 
              element={
                blogs.map((blog) => (
                  <div key={blog.id} className="blog-post">
                    <Helmet>
                      <meta property="og:title" content={blog.title} />
                      <meta property="og:description" content={blog.content.slice(0, 100) + '...'} />
                      <meta property="og:type" content="article" />
                      <meta property="og:image" content={blog.image} />
                    </Helmet>

                    <Link to={`/blog/${blog.id}`}>
                      <h2>{blog.title}</h2>
                      <img src={blog.image} alt={blog.title} style={{ width: '100%', height: 'auto' }} />
                    </Link>
                    <p>{blog.content.slice(0, 100) + '...'}</p>
                    <p><strong>Author:</strong> {blog.author}</p>
                    <p><strong>Date:</strong> {blog.date}</p>
                  </div>
                ))
              } 
            />

            {/* Route for single blog */}
            <Route path="/blog/:id" element={<SingleBlog blogs={blogs} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
