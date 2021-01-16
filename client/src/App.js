import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getBlogPosts();
  }, []);

  const getBlogPosts = () => {
    axios
      .get('/api')
      .then((res) => {
        const data = res.data;
        setPosts(data);
        console.log('Data has been recieved from DB.');
      })
      .catch((err) => {
        alert('Error retrieving data!');
      });
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (name === 'title') {
      setTitle(value);
    } else if (name === 'body') {
      setBody(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const payload = {
      title: title,
      body: body,
    };

    axios({
      url: '/api/save',
      method: 'POST',
      data: payload,
    })
      .then(() => {
        console.log('Data has been sent to the server');
        setTitle('');
        setBody('');
        getBlogPosts();
      })
      .catch(() => {
        console.log('Internal server error');
      });
  };

  // console.log(title);
  // console.log(body);
  return (
    <div>
      <h1>Mern Blog Application</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-input">
          <input
            name="title"
            type="text"
            placeholder="Title"
            value={title}
            onChange={handleChange}
          />
        </div>
        <div className="form-input">
          <textarea
            name="body"
            rows="5"
            col="30"
            placeholder="body"
            value={body}
            onChange={handleChange}
          ></textarea>
        </div>
        <button>Submit</button>
      </form>

      <div className="post">
        {posts.map((post) => {
          return (
            <div key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
