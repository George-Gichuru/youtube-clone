import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import {BounceLoader} from "react-spinners";

const override = {
    display: "block",
    margin: "100px auto",
    borderColor: "red",
};

const Container = styled.div`
    display: flex;
    justify-content: flex-start;
    gap: 40px;
    flex-wrap: wrap;
    `;

const Home = () => {
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        const options = {
            method: "GET",
            headers: {
                "X-RapidAPI-Key": "6e565a9039mshf37d6114f076b0cp167befjsndf53e379abdb",
                "X-RapidAPI-Host": "youtube-data8.p.rapidapi.com"
            },
        };

        let res = await fetch(
            "https://youtube-data8.p.rapidapi.com/search/?q=new",
            options
        );

        let data = await res.json();
        console.log(data);
        console.log(data.contents);
        setResult(data.contents);
        setLoading(false);
        console.log(result)
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Container>
            <BounceLoader
                color={"#1E3A8A"}
                speedMultiplier={2}
                loading={loading}
                cssOverride={override}
                size={60}
                 
            />

            {result ? (
                result.map((item, index) => (
                    <Card
                    key={index}
                    videoId={item.video.videoId}
                    title={item.video.title}
                    authorTitle={item?.video?.author?.title}
                    avatarImg={item.video.author.avatar[0].url}
                    thumbImg={item.video.thumbnails[0].url}
                    totalViews={item.video.stats.views}
                    publishedTime={item.video.publishedTimeText}
                />
                ))
            ):(
                <h2>Results not found</h2>
            )}
            
        </Container>
    );

};


export default Home