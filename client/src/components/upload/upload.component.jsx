import React from 'react';
import axios from 'axios';
import {Progress} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Upload extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            file :'',
            fileName:'Only Json File and Max File Size 500KB',
            sizeError:'',
            typeError:'',
            btnDisable:true,
            error:'',     
            loaded:0
        }
    }

    toastFailure = (msg) => {
        toast.error(msg, {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
        });
    }

    handleChange = (e) => {
        const MIME_TYPES = ["application/json"];
        //MAX SIZE 500 KB
        const MAX_SIZE = 500000;
        if(e.target.files[0]){
            const {name, size, type} = e.target.files[0];
            if(MIME_TYPES.includes(type) && size<=MAX_SIZE){
                this.setState({loaded:0,error:'',sizeError:'', typeError:'', file:e.target.files[0], fileName:name, btnDisable:false});
            }
            else if(!MIME_TYPES.includes(type)){
                this.toastFailure('Not a Json File');
                this.setState({loaded:0,typeError:'Not a Json File', error:'',fileName:name, sizeError:'', btnDisable:true});
            }
            else{
                this.toastFailure('File size must be less than 500 Kb')
                this.setState({loaded:0,error:'',sizeError:'File size must be less than 500 Kb', fileName:name, typeError:'', btnDisable:true});                
            }
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const {typeError, sizeError, file , btnDisable,error} = this.state;
        if(!btnDisable && sizeError.length===0 && typeError.length===0 && error.length===0){
            const formData = new FormData();
            formData.append("fileData", file);
            const details = JSON.parse(localStorage.getItem('user-auth-token'));
            const token = details.token;        
            const url = "http://localhost:5000/api/file/upload"
            try{
                this.setState({btnDisable:true});            
                await axios.post(url, formData, 
                    {
                        headers:{
                            'Content-Type':'multipart/form-data',
                            Authorization : `Bearer ${token}`
                        },
                        onUploadProgress: ProgressEvent => {
                            this.setState({
                                loaded: (ProgressEvent.loaded / ProgressEvent.total*100),
                            })
                        }
                    },
                );
                toast.success('File Uploaded Successfully!', {
                    position: "bottom-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                });                
            }
            catch(e){
                const {error} = e.response.data;
                this.toastFailure(error);
                this.setState({error});                
            }
            this.setState({btnDisable:false});            
        }       
    }

    render(){
        const {btnDisable, fileName, error, loaded} = this.state;
        return(
            <div className="container" style={{marginTop:"50px"}}>
                <form onSubmit={(e)=>this.handleSubmit(e)} style={{textAlign:"center"}}>
                    <div className="input-group">
                        {/* <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroupFileAddon01">Upload</span>
                        </div> */}
                        <div className="custom-file">
                            <input type="file" onChange={(e)=>this.handleChange(e)} className="custom-file-input" id="inputGroupFile01"
                            aria-describedby="inputGroupFileAddon01"/>
                            <label className="custom-file-label" htmlFor="inputGroupFile01">{fileName}</label>
                        </div>
                    </div>
                    <div>
                        {loaded!==0 ?<Progress style={{marginTop:"20px"}} max="100" color="success" value={this.state.loaded} >{Math.round(this.state.loaded,2) }%</Progress>
                        :null} 
                    </div>                     
                    {/* {typeError.length > 0 ? <div><small>{typeError}</small></div>:null}
                    {sizeError.length > 0 ? <div><small>{sizeError}</small></div>:null} */}
                    {error.length > 0 ? <div><small>{error}</small></div>:null}
                    <button className="btn btn-success" disabled={btnDisable} style={{marginTop:"30px"}}>Save</button>
                </form>
                <ToastContainer/>
            </div>
        )
    }
}

export default Upload;