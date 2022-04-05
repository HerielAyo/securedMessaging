import  axios from "axios";
import  url from "url";

import { main } from "./main";
// import {Platform} from "./Platform";

const current_url = new URL(
    "http://3.81.55.206/hydrogen-client/?jtoken=eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJsb2dpbl93ZWJfeHh4IjoyLCJncm91cElkIjoyLCJyYW5nZSI6ImRlZmF1bHRSYW5nZSIsImlhdCI6MTY0OTA3NDM4OCwiZXhwIjoxNjQ5MTYwNzg4fQ.DN12OoMDOoPu-oavdCoPxqGkIdcB6wo7DJTUPLJyJ66-ABTLcFjrA3_zkIHSKcxAZ5VnsG_vMrerPdaWMep8lA#/session/4161759551863411"
);

const search_params = current_url.searchParams;
const jtoken = search_params.get('jtoken');
console.log("this is Jtoken",jtoken)
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
            // const platform = new Platform(
            //     document.body,
            //     assetPaths,
            //     JSON.parse(configJSON),
            //     {development: import.meta.env.DEV}
            // );
            main(platform);
        }else{
            console.log("User is not Found")
        }
    })
    .catch((error) => {
        console.log(error);
    });
}
