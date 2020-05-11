import React from 'react';
import {Link} from 'react-router-dom';
import { FileColumnContainer, FileCardContainer,
    ImageContainer, Image, CardFooter
} from './dashboard.styles.js';

function Card({image, name}){
    return(
        <FileColumnContainer>
            <FileCardContainer>
                <ImageContainer>
                    <Image image = {image}/>
                </ImageContainer>
                <CardFooter>
                    <span>{name}</span>                                    
                    <Link to={`file/${name}`}>View</Link>  
                    {/* <Button><i className="fa fa-download" aria-hidden="true"></i></Button> */}
                </CardFooter>    
            </FileCardContainer>                  
        </FileColumnContainer>                    
    )
}

export default Card;