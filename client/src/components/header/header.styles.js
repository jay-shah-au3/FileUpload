import styled from 'styled-components';

export const NavbarContainer = styled.nav` 
    background-color: white;
    font-size:1.5em; 
    font-family:  monospace;   
    box-shadow:0px 2px whitesmoke;
    .navbar-brand {
        color:black;
        font-size:1.2em;
        letter-spacing:5px;
    }

    a {
        color:black;        
    }
    .active{
        background:none;
        background: #DA22FF;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #9733EE, #DA22FF);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #9733EE, #DA22FF); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;        
    }
    a:hover {
        background: #DA22FF;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #9733EE, #DA22FF);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #9733EE, #DA22FF); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;        
    }

    span.navbar-toggler-icon{
        background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgb(0,0,0)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/%3E%3C/svg%3E");
    }

`

export const ImageContainer = styled.img`
    width:32px;
    height:32px;
    margin-right:10px;
`;

export const UnOrderedListContainer = styled.ul`
    align-items:center;
    li {
        padding-right:10px;
        @media (max-width:768px){
            padding-left:0px;
            padding-right:0px;
            margin-right:0px;    
        }
    }
`
export const ButtonContainer = styled.button`
    border:none;
    background:none;
    float:right;
    padding:10px;
    cursor:pointer;

    &:focus{
        outline:none;
    }
    &:hover{
        background: #DA22FF;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #9733EE, #DA22FF);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #9733EE, #DA22FF); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;        
    }
`;