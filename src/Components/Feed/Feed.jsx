import React, { useEffect, useState } from 'react';
import './Feed.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_KEY, BASE_URL } from '../../data';

const Feed = ({ category }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}`, {
        params: {
          part: 'snippet,statistics',
          chart: 'mostPopular',
          maxResults: 500,
          // regionCode: 'US',
          videoCategoryId: category,
          key: API_KEY,
        },
      });
      setData(response.data.items);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();                                             
  }, [category]);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="feed">
      {data.map((item) => (
        <Link
          to={`video/${item.snippet.channelId}/${item.id}`}
          className="card"
          key={item.id}
        >kkkkkkkk
          <img
            src={item.snippet.thumbnails.medium.url}
            alt={item.snippet.title}
          />
          <h2>{item.snippet.title}</h2>
          <h3>{item.snippet.channelTitle}</h3>
          <p>
            {item.statistics.viewCount} views; {new Date(item.snippet.publishedAt).toDateString()}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default Feed;
