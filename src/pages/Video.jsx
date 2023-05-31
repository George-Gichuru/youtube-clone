import React from 'react';
import styled from 'styled-components';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';
import Comments from '../components/Comments';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import viewCount from '../utils/ViewCount';

const Container = styled.div`
  display: flex;
  gap: 30px;
`;

const Content = styled.div`
  flex: 5;
`;
const VideoWrapper = styled.div``;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 900;
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

const Recommendation = styled.div`
  flex: 3;
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
  font-weight: 700;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 18px;
`;

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 900;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;

const Video = () => {
  const { id } = useParams();
  const [details, setDetails] = useState({});
  const [comments, setComments] = useState({});

  const detailsUrl = `https://youtube-data8.p.rapidapi.com/video/details/?id=${id}&hl=en&gl=US`;
  const relatedUrl = `https://youtube-data8.p.rapidapi.com/video/related-contents/?id=${id}&hl=en&gl=US`;
  const commentsUrl = `https://youtube-data8.p.rapidapi.com/video/comments/?id=${id}&hl=en&gl=US`;

  const fetchData = (url, callBackFunc) => {
    const options = {
      method: 'GET',
      headers: {
        "X-RapidAPI-Key": "6e565a9039mshf37d6114f076b0cp167befjsndf53e379abdb",
        "X-RapidAPI-Host": "youtube-data8.p.rapidapi.com"
      },
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        callBackFunc(response);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchData(detailsUrl, setDetails);
    fetchData(commentsUrl, setComments);
  }, [id]);

  return (
    <Container>
      <Content>
        <VideoWrapper>
          <iframe
            width='100%'
            height='520'
            src={`https://www.youtube.com/embed/${id}`}
            title='YouTube video player'
            frameBorder='0'
            autoPlay='0'
            allow='accelerometer;  clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          ></iframe>
        </VideoWrapper>
        <Title>{details.title}</Title>
        <Details>
          <Info>
            {viewCount(details?.stats?.views)} views • {details?.publishedDate}
          </Info>
          <Buttons>
            <Button>
              <ThumbUpOutlinedIcon /> {viewCount(details?.stats?.likes)}
            </Button>
            <Button>
              <ThumbDownOffAltOutlinedIcon /> Dislike
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
            <Image src={details?.author?.avatar[0].url} />
            <ChannelDetail>
              <ChannelName>{details?.author?.title}</ChannelName>
              <ChannelCounter>
                {details?.author?.stats?.subscribersText}
              </ChannelCounter>
              <Description>{details?.description}</Description>
            </ChannelDetail>
          </ChannelInfo>
          <Subscribe>SUBSCRIBE</Subscribe>
        </Channel>
        <Hr />
        {comments && <Comments data={comments.comments} />}
      </Content>
      <Recommendation>
       
        <div>
          <h5>Recomended will appear here</h5>
        </div>
      </Recommendation>
    </Container>
  );
};

export default Video;