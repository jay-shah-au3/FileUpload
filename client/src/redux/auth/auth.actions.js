const authSignInStart = () => ({
    type:'AUTH_SIGN_IN_START',
    isLoading : true
});

const authSignInSuccess = (user) => ({
    type:'AUTH_SIGN_IN_SUCCESS',
    payload: user,
    isAuthenticated : true,
    isLoading : false
});

const authSignInFailure = (msg) => ({
    type: 'AUTH_SIGN_IN_FAILURE',
    isAuthenticated : false,
    isLoading : false,
    error : msg
});

const authSignOut = () => ({
    type:'AUTH_SIGN_OUT',
    isAuthenticated : false,
})

export const OAuthSignIn = (url, data) => {

    return async dispatch => {
        try{
            dispatch(authSignInStart());
            let response = await fetch(url, {
                method: "POST",
                headers : {
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify(data)
            });            
            let jwt_decode = require('jwt-decode');
            let result = await response.json();     
            let token = result.token
            let decodedJWT = jwt_decode(token);
            decodedJWT["token"] = token;
            decodedJWT["isAuthenticated"] = true;
            localStorage.setItem('user-auth-token', JSON.stringify(decodedJWT));
            dispatch(authSignInSuccess(decodedJWT));
        }
        catch(error){
            dispatch(authSignInFailure("Invalid Email or Password"));
        }        
    }
}

export const OAuthSignOut = () => {
    return dispatch => {
        localStorage.clear();
        dispatch(authSignOut());
    }
}