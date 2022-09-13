import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from 'axios'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Home = ({type}) => {

  const [ videos, setVideos ] = useState([]);
  // console.log(type);

  useEffect(() => {
    const fetchVideos = async () => {
      // dynamatically change url depend on type
      const res = await axios.get(`/videos/${type}`)
      setVideos(res.data);
      // console.log(res.data)
    }
    fetchVideos();
  }, [type])
  

  return (
    <Container>

      { videos.map((video,index) => (<Card  key={video._id} video={video} /> ))}


      {/* <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card /> */}

    </Container>
  );
};

export default Home;
