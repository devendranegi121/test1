import Axios from "axios"; 
import envermentUrls from "../appEnv/appEnvUrl";
import { getApiHeader } from "../common/commonFunctions";

export const apiGETRequest = async ({ endpoint }) => {

    
    try {
        let response = await Axios({
            url: `${envermentUrls.apiBaseUrl}${endpoint}`,
            method: 'GET',
           // headers: getApiHeader()
        }).then((response) => {
            if (response.status !== 200) {
                throw response
            }
            if (response.data) {
                return response.data;
            }
            return response.json();
        });
        return response;
    } catch (e) {
       
        return Promise.reject(e);
    }
}

export const apiPOSTRequest = async ({ endpoint, payload, method }) => {
    const callMethod= method ? method : "POST";
    try {
        let response = await Axios({
            url: `${envermentUrls.apiBaseUrl}${endpoint}`,
            method: callMethod,
            data: payload,
          //  headers: getApiHeader()
        }).then((response) => {
            if (response.status !== 200) {
                throw response
            }
            if (response.data) {
                return response.data;
            }
            return response.json();
        });
        return response;
    } catch (e) {
       
        return Promise.reject(e);
    }
}

export const apiDELETERequest = async ({ endpoint }) => {
    try {
        let response = await Axios({
            url: `${envermentUrls.apiBaseUrl}${endpoint}`,
            method: "DELETE",
          //  headers: getApiHeader()
        }).then((response) => {
            if (response.status !== 200) {
                throw response
            }
            if (response.data) {
                return response.data;
            }
            return response.json();
        });
        return response;
    } catch (e) {
       
        return Promise.reject(e);
    }
}