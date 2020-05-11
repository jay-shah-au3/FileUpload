import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import Header from "./components/header/header.component";
import Home from "./components/home/home.component";
import Login from "./components/auth/login.component";
import Signup from "./components/auth/signup.component";
import Upload from "./components/upload/upload.component";
import Dashboard from "./components/dashboard/dashboard.component.jsx";
import FileC from './components/file/file.component';
import withAuthentication from "./components/HOC/authenticate.hoc";
import './App.css';

class App extends React.Component {
	render(){
		const {isAuthenticated } = this.props
		return(
			<Router>
				<Header title="UPLOADER"/>
				<Switch>
					<Route exact path='/' render = {()=> !isAuthenticated ? <Home/> : (<Redirect to='/upload'/>)  }/>
					<Route exact path='/login' render = {()=> !isAuthenticated ? <Login/> : (<Redirect to='/upload'/>)  }/>
					<Route exact path='/signup' render = {()=> !isAuthenticated ? <Signup/> : (<Redirect to='/upload'/>)  }/>
					<Route exact path = '/upload' component ={ withAuthentication(Upload) } />
					<Route exact path = '/dashboard' component ={ withAuthentication(Dashboard) } />
					<Route path = '/file/:name' component ={withAuthentication(FileC)} />
					<Route path='*' render = {()=> !isAuthenticated ? <Home/> : (<Redirect to='/upload'/>)  }/>
				</Switch>
			</Router>
		);
	}
}

const mapStateToProps = (state) =>({
	isAuthenticated : state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(App);
