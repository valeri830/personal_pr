import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";


function Authentication() {
    const auth_token = sessionStorage.getItem("access_token") || "";
    const navigateTo = useNavigate();
    const currentLocation = useLocation().pathname;


    useEffect(() => {
        if (auth_token === "") {
            if (currentLocation != "/login") {
                navigateTo('/login')
            }
        } else {
            var decodedAccess = jwt_decode(auth_token);

            if (decodedAccess.exp * 1000 <= Date.now()) {
                if (currentLocation != "/login") {
                    navigateTo('/login')
                }
            }
            else {
                if (currentLocation === "/login") {
                    navigateTo('/')
                }
            }
        }
    }, [])


    return null
}
export default Authentication;
