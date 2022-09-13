import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import styled from 'styled-components'
import { useLocation } from 'react-router-dom';
import Card from '../components/Card';


const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
`;

const Search = () => {

    const query = useLocation().search;
    console.log(query);

    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            const res = await axios.get(`/videos/search${query}`)
            setVideos(res.data);
        };
        fetchVideos();
    }, [query]);

  return (
    <div>
        { videos.map( video => (
            <Card key={video._id} video={video} />
        ))}
    </div>
  )
}

export default Search