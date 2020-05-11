import styled from 'styled-components';

export const DisplayContainer = styled.div`
    margin-top:50px;
    margin-bottom:50px;
    padding:5px;
    table {
        font-weight:bold;
        background-color:white;
        thead {
            font-size: 1.2em;   
            th{
                background-color:#55BCC9;
                text-align:center !important;
                top:0;
                position : sticky !important;
                span {
                    font-size:1.5em;
                    color:white !important;
                }
            }
        }
        tbody{
            tr:nth-of-type(odd) { 
                background-color: #f2f2f2;
            }              
            th, td {
            border:2px solid white!important;
            text-align: center !important;
                span {
                    color:black !important;        
                }
            }
        }
    }
`;

export const TitleContainer = styled.div`
    text-align:center;
    font-size:2em;
    font-weight:bold;
`;