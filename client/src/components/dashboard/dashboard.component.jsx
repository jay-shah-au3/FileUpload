import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import Card from './card.component';
import image from '../../assets/json.png';
import { FileContainer, FileRowContainer } from './dashboard.styles.js';
class Dashboard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            files:null
        }
    }
    async componentDidMount(){
        const url = "http://localhost:5000/api/file/all";
        try{
            const response = await axios.get(url,{
                headers:{
                    'Content-Type':'application/json',
                    Authorization : `Bearer ${this.props.token}`
                },
            });
            const data = await response.data;
            console.log(data);
            this.setState({files:data})

        }
        catch(error){
            console.log("error")
        }
    }
    render(){
        const {files} = this.state;
        return(
            <FileContainer>
                <FileRowContainer>
                    {
                        files ? 
                        files.length > 0 ?
                            files.map((f)=><Card key={f.file_id} image={image} name = {f.file_name}/>)
                            :
                            <h3>No files Uploaded!</h3>
                        :
                        null
                    }        
                </FileRowContainer>
            </FileContainer>
        )
    }
}

const mapStateToProps = (state) => ({
    token: state.auth.token
})

export default connect(mapStateToProps)(Dashboard);
