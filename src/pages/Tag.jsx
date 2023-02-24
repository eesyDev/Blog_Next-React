import { useState, useEffect } from 'react';

function Tag({ id }) {
  const [tagData, setTagData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`http://127.0.0.1:8000/api/v1/tags/${id}`);
      const data = await response.json();
      setTagData(data);
    }
    fetchData();
  }, [id]);

  if (!tagData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{tagData.name}</h1>
      {tagData.posts.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
      tag
    </div>
  );
}

export default Tag;
