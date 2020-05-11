import React from 'react';
import {HomePageContainer, ImageContainer } from './home.styles';
import imageUrl from '../../assets/background_img.png'; 

const Home = () => {
    return(
        <HomePageContainer>
            <ImageContainer src={imageUrl}/>
        </HomePageContainer>

    );    
}

export default Home;