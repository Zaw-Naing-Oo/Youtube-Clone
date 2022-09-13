import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { format } from 'timeago.js'


const Container = styled.div`
  width: ${(props) => props.type === "sm" ? "230px" : "245px"};
  // width: 360px;
  margin-bottom: ${(props) => (props.type === "sm" ? "14px" : "45px")};
  cursor: pointer;
  display: ${(props) => props.type === "sm" && "flex"};
  flex-direction: ${ (props) => props.type === "sm" ? "column" : ""};
  gap: 10px;


  // width: 240px;
  // margin-bottom: 45px;
  // cursor: pointer;
`;

const Image = styled.img`
  width: 100%;
  height: ${(props) => (props.type === "sm" ? "120px" : "190px")};
  background-color: #999;
  
`;

const Details = styled.div`
  display: flex;
  margin-top: ${(props) => props.type !== "sm" && "16px"};
  gap: 12px;
  flex: 1;
`;

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  display: ${(props) => props.type === "sm" && "none"};
`;

const Texts = styled.div``;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin: 3px 0px;
`;

const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;



const Card = ({ type, video }) => {

  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchChannelUser = async () => {
      // dynamatically change url depend on type
      const getUser = await axios.get(`/users/find/${video.userId}`)
      setChannel(getUser.data);
      // console.log(getUser.data)
    }
    fetchChannelUser();
  }, [video.userId])

  // console.log(type);
  return (
    <Link to={`/videos/${video._id}`} style={{ textDecoration: "none" }}>
       
      <Container type={type}>
        
        <Image
          type={type}
          src={video.imgUrl}
        />
        
        <Details type={type}>
        
          <ChannelImage
           type={type}
            src={channel.img}
          />
          <Texts>
            <Title>{ video.title }</Title>
            <ChannelName>{channel.name}</ChannelName>
            <Info>{video.views} views • {format(video.createdAt)}</Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
};

export default Card;