import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Card from '../components/Card';
import MoonLoader from 'react-spinners/MoonLoader';
import { useParams } from 'react-router-dom';

const override = {
  display: 'block',
  margin: '100px auto',
  borderColor: 'red',
};

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 40px;
  flex-wrap: wrap;
`;

const Feed = () => {
    const [ result, setResult ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const { name } = useParams();
    console.log(name);
    console.log(result);

    const fetchData = async() => {
        setLoading(true);
        const options = {
            method: "GET",
            headers: {
                "X-RapidAPI-Key": "6e565a9039mshf37d6114f076b0cp167befjsndf53e379abdb",
                "X-RapidAPI-Host": "youtube-data8.p.rapidapi.com"
            },
        };

        let res = await fetch(
            `https://youtube-data8.p.rapidapi.com/search/?q=${name}`,
            options
        );
        let data = await res.json();
        console.log(data);
        console.log(data.contents);
        let finalRes = data.contents.filter((items) => items.type === "video");
        setResult([...finalRes]);
        setLoading(false)
        console.log(result);
        console.log(result);
    };

    useEffect(() => {
        fetchData();
        return () => setResult([]);

    }, [name]);
    console.log(result)

    return (
        <Container>
          <MoonLoader
            color={'blue'}
            loading={loading}
            cssOverride={override}
            size={80}
          />
          {result ? (
            result.map((item, index) => (
              <Card
                key={index}
                videoId={item?.video?.videoId}
                title={item?.video?.title}
                authorTitle={item?.video?.author?.title}
                avatarImg={item?.video?.author?.avatar[0]?.url}
                thumbImg={item?.video?.thumbnails[0]?.url}
                totalViews={item?.video?.stats?.views}
                publishedTime={item?.video?.publishedTimeText}
              />
            ))
          ) : (
            <h2>Results not found</h2>
          )}
        </Container>
      );
    };
    
    export default Feed;
