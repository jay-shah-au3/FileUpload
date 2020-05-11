import React from 'react';
import {connect} from 'react-redux';
import JSONViewer from 'react-json-viewer';
import axios from 'axios';
import { DisplayContainer, TitleContainer } from './file.styles.js';

class FileC extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            fileData:null,
            error:'',
        }
    }
    async componentDidMount(){
        const {name} = this.props.match.params;      
        console.log("name",name);  
        const url = `http://localhost:5000/api/file/${name}`;
        try{
            const response = await axios.get(url,{
                headers:{
                    Authorization : `Bearer ${this.props.token}`
                }
            });
            this.setState({fileData:response.data})
        }
        catch(e){
            this.setState({error:e.response.data.error});
        }
    }
    render(){
        const {fileData,error} = this.state;
        const {name} = this.props.match.params
        return(
            <DisplayContainer>
                {fileData ? <TitleContainer><span>{name}</span></TitleContainer> : null}
                {fileData ? <div style={{overflowX:"auto"}}><JSONViewer json={fileData}/></div> : null}                
                {error.length>0 ? error : null}
            </DisplayContainer>
        )
    }
}

const mapStateToProps = (state) => ({
    token: state.auth.token
})

export default connect(mapStateToProps)(FileC);
