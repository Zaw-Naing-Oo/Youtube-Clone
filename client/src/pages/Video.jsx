import React, {useState, useEffect} from "react";
import styled from "styled-components";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import Comments from "../components/Comments";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Recommendation from "../components/Recommendation";
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from "react-router-dom";
import axios from "axios";
import { dislike, fetchSuccess, like } from "../features/video/videoSlice";
import { subscription } from "../features/user/userSlice";
import { format } from "timeago.js";

const Container = styled.div`
  display: flex;
  gap: 24px;
`;

const Content = styled.div`
  flex: 5;
`;
const VideoWrapper = styled.div`
    z-index: 1;
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
`;

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;

const VideoFrame = styled.video`
  max-height: 720px;
  width: 100%;
  object-fit: cover;
  z-index: 1;
`;

const Video = () => {

  const [video, setVideo] = useState({})
  const [userInfo, setUserInfo] = useState({})

  const dispatch = useDispatch();
  // console.log(useSelector( state => state));
  const { user } = useSelector(state => state.user);
  const { currentVideo } = useSelector(state => state.video);

  const { } = useSelector(state => state.user);

  // const path = useLocation();
  // console.log(path);

  const path = useLocation().pathname.split("/")[2]; 
  // console.log(path);
  const videosRes =  axios.get(`videos/find/${path}`).then(res => res.data);
  // console.log(videosRes);

  const handleLike = async () => {
    console.log("liking");
    await axios.put(`/users/like/${currentVideo?._id}`);
    dispatch(like(currentVideo._id))
  };

  const handleDislike = async () => {
    console.log("disliking")
    await axios.put(`/users/disLike/${currentVideo?._id}`);
    dispatch(dislike(currentVideo._id))

  };

  const handleSubscribe = async () => {
    console.log("clicking");
    user.subScribedUsers.includes(userInfo._id) ? 
    await axios.put(`/users/unsub/${userInfo._id}`) : 
    await axios.put(`/users/sub/${userInfo._id}`);
    dispatch(subscription(userInfo._id));

  }


  useEffect(() => {
    const fetchData = async () => {
      try {
      const video =  (await axios.get(`/videos/find/${path}`)).data;
      const getUser = ( await axios.get(`/users/find/${video.userId}`)).data;
      // console.log(video)
      // console.log(getUser)
      setUserInfo(getUser)
      dispatch(fetchSuccess(video))
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [path, dispatch])
  

  return (
    <Container>
      <Content>
        <VideoWrapper>
          {/* <iframe
            width="100%"
            height="400"
            src="https://www.youtube.com/embed/k3Vfj-e1Ma4"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            frameborder="0"
          ></iframe> */}
          <VideoFrame src={ currentVideo.videoUrl} controls />
        </VideoWrapper>
        <Title>{ currentVideo?.title }</Title>
        <Details>
          <Info> { currentVideo?.views } views • { format(currentVideo?.createdAt)}</Info>
          <Buttons>
            <Button onClick={handleLike}>
              {currentVideo?.likes?.includes(userInfo?._id) ? (
                  <ThumbUpIcon />
                ) : (
                  <ThumbUpOutlinedIcon />
              )}{" "}
                {currentVideo?.likes?.length}
            </Button>
            <Button onClick={handleDislike}>
              {currentVideo?.dislikes?.includes(userInfo?._id) ? (
                  <ThumbDownIcon />
                ) : (
                  <ThumbDownOffAltOutlinedIcon />
              )}{" "}
               {currentVideo?.dislikes?.length}
            </Button>
            <Button>
              <ReplyOutlinedIcon /> Share
            </Button>
            <Button>
              <AddTaskOutlinedIcon /> Save
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src= { currentVideo?.imgUrl} />
            <ChannelDetail>
              <ChannelName>{ userInfo?.name } </ChannelName>
              <ChannelCounter>{ userInfo?.subScribers } subscribers</ChannelCounter>
              <Description>
               { currentVideo?.description }
              </Description>
            </ChannelDetail>
          </ChannelInfo>
          <Subscribe onClick={handleSubscribe}>
            { user?.subScribedUsers?.includes(userInfo?._id) ? "SUBSCRIBED" : "SUBSCRIBE" }
          </Subscribe>
        </Channel>
        <Hr />
        <Comments currentVideo={currentVideo} />
      </Content>
      <Recommendation tags={currentVideo.tags}  />
    </Container>
  );
};

export default Video;
