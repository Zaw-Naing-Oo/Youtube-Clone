import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Comment from "./Comment";
import axios from "axios";
import { useSelector } from "react-redux";

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;

const Comments = ({currentVideo}) => {

  const { user } = useSelector(state => state.user);
  // console.log(user);

  const [ comments, setComments ] = useState([]);
  // console.log(currentVideo); 

  const addComment = () => {};

  useEffect( () => {
    const fetchComment = async () => {
      try {
        const res = await axios.get(`/comments/${currentVideo._id}`);
        // console.log(res.data && 'comment not found');
        setComments(res.data);
      } catch (error) {
         console.log(error);
      }
    };
    fetchComment();
  }, [currentVideo._id]);

  return (
    <Container>
      <NewComment>
        {/*  you need to fix this url to be dynamic if you want  */}
        <Avatar src="https://yt3.ggpht.com/yti/APfAmoE-Q0ZLJ4vk3vqmV4Kwp0sbrjxLyB8Q4ZgNsiRH=s88-c-k-c0x00ffffff-no-rj-mo" />
        <Input placeholder="Add a comment..." onClick={addComment} />
      </NewComment>

     { comments?.map( comment => ( <Comment comment={ comment } user={user}  />  ))}

      {/* <Comment/>
      <Comment/>
      <Comment/>
      <Comment/>
      <Comment/>
      <Comment/>
      <Comment/> */}
    </Container>
  );
};

export default Comments;
