import React, { useContext } from 'react';
import { GoogleLogin } from "@react-oauth/google";
import { UserContext } from "../Context/userContext";
import axios from 'axios';
import {parseJwt} from "../utils/helper";

const GoogleAuth = ({handleRedirect}) => {
    const {setUser} = useContext(UserContext);
    async function onGoogleLoginSuccess(response) {
        try {
            const { credential } = response;
            const { email, name } = parseJwt(credential);
            const { data } = await axios.post(`/user/auth`, { email, name });
            setUser(data);
            handleRedirect("/");
        } catch (err) {
            console.error(err.message);
        }
    }
    function onGoogleLoginError(error) {
        console.log(error);
        return toast.error("Erorr while logging with google");
    }
    return (
        <>
            <GoogleLogin onSuccess={onGoogleLoginSuccess} onError={onGoogleLoginError} />
        </>
    )
}

export default GoogleAuth