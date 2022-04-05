import  axios from "axios";
import  url from "url";

import { main } from "./main";

export async function callback(platform, url){
    console.log("Here is the url",url)
    const current_url = new URL(url);
    const search_params = current_url.searchParams;
    const jtoken = search_params.get('jtoken');
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
