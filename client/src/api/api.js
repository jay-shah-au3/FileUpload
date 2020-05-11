export const API_ORIGIN_URL = process.env.NODE_ENV === "production"
    ? "https://xpense-jay.herokuapp.com/api"
    : "http://localhost:5000/api";

// GET REQUESTS

export const getResults = async (link) =>
{
    const details = JSON.parse(localStorage.getItem('user-auth-token'));
    const token = details.token;
    const response = await fetch(`${API_ORIGIN_URL}/${link}`, {
        method: "GET",
        headers : {
            Authorization : `Bearer ${token}`
        }				
    });
    const result = await response.json();
    return result;
}

// POST REQUESTS

export const postResults = async (data, link) =>
{
    const details = JSON.parse(localStorage.getItem('user-auth-token'));
    const token = details.token;
    const response = await fetch(`${API_ORIGIN_URL}/${link}`, {
        method: "POST",
        headers : {
            Authorization : `Bearer ${token}`,
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify(data)
    });
    const result = await response.json();
    return result;
}


// PUT REQUESTS

// export const updateResults = async (data, link) =>
// {
//     const details = JSON.parse(localStorage.getItem('user-auth'));
//     const token = details.token;
//     const response = await fetch(`${API_ORIGIN_URL}/${link}`, {
//         method: "PUT",
//         headers : {
//             Authorization : `Bearer ${token}`,
//             'Content-Type' : 'application/json',
//         },
//         body : JSON.stringify(data)
//     });
//     const result = await response.json();
//     return result;
// }

// DELETE REQUESTS

// export const deleteResult = async (link) =>
// {
//     const details = JSON.parse(localStorage.getItem('user-auth'));
//     const token = details.token;
//     const response = await fetch(`${API_ORIGIN_URL}/${link}`, {
//         method: "DELETE",
//         headers : {
//             Authorization : `Bearer ${token}`,
//             'Content-Type' : 'application/json',
//         },
//     });
//     const result = await response.json();
//     return result;
// }