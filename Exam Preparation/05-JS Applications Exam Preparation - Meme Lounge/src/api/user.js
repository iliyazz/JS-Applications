import { clearUserData, setUserData } from "../util.js";
import { get, post } from "./api.js";
const endpoints = {
    'login': '/users/login',
    'register': '/users/register',
    'logout': '/users/logout'
}

export async function login(email, password) {
    let user = await post(endpoints.login, { email, password });
    setUserData(user)
    //const { _id, email: resultEmail, accessToken } = await post(endpoints.login, { email, password });
    // setUserData({
    //     _id,
    //     email: resultEmail,
    //     accessToken
    // });
}
export async function register(username, email, password, gender) {
    const user = await post(endpoints.register, { username, email, password, gender });
    setUserData(user);

//     const { _id, email: resultEmail, accessToken } = await post(endpoints.register, { username, email, password, gender });
//     setUserData({
//         _id,
//         email: resultEmail,
//         accessToken,
//         username,
//         gender
//     });
}
/*
{
  username,
  email,
  password,
  gender
}
*/
export async function logout() {
    get(endpoints.logout);
    clearUserData();
}
