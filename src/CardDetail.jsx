import React  from 'react';
import DataViewer from './dataViewer';
import DataDownloader from './dataDownloader';
import { useEffect, useState } from 'react';
import CardList from './CardList';

function SinglePost({ postId }) {
  const [post, setPost] = useState(null);
  console.log(postId)

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then((response) => response.json())
      .then((data) => setPost(data))
      .catch((error) => console.error("Error fetching post:", error));
  }, [postId]);

  if (!post) return <p>Loading...</p>;

  return (
    <div>
      <h1>{post.id}</h1>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </div>
  );
}

function CardDetail({onBack, card}) {
  console.log(card)
   return (
      <div className="card-detail">
        <button onClick={onBack}>Back</button>
        <h1>Single Post</h1>
        <SinglePost postId={card.id} /> {/* 불러오고 싶은 포스트 ID 지정 */}
        
      </div>
    );
}

export default CardDetail;
