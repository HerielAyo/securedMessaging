import  axios from "axios";

import { main } from "./main";

export async function callback(platform, jtoken){
    axios.get(
        "http://develop.wetribe.io/napi/latest/auth/user/info/current?jtoken=" + jtoken
    )
    .then((response) => {
        console.log(response);
        if (response.data.result.code === "000"){
            console.log(response.data.result.data)
            
            main(platform);
        }else{
            console.log("User is not Found")
        }
    })
    .catch((error) => {
        console.log(error);
    });
}
