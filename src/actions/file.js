import axios from "axios";
import {API_URL} from "../config";
import {addNewFile, setFiles} from "../reducers/fileReducer";

export const uploadFile = (file, parentId) => {
    const authorization = localStorage.getItem("rememberMe") === "true" ? localStorage.getItem("token") : sessionStorage.getItem("token")
    return async (dispatch) => {
        let formData = new FormData();

        formData.append("file", file);
        formData.append("filename", file.name);
        if (parentId != null) {
            formData.append("parent_id", parentId);
        }

        const response = await axios.post("http://localhost:8080/files/upload", formData, {
            headers: {Authorization: `Bearer ${authorization}`},
            onUploadProgress: (progressEvent) => {
                const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
                console.log("onUploadProgress", totalLength);
                if (totalLength !== null) {
                    console.log(Math.round((progressEvent.loaded * 100) / totalLength));
                }
            }
        });
        dispatch(addNewFile(response.data))
    }
}


export const getFiles = (parentId) => {
    const authorization = localStorage.getItem("rememberMe") === "true" ? localStorage.getItem("token") : sessionStorage.getItem("token")
    return async (dispatch) => {
        const response = await axios.get(`${API_URL}/files`, {headers:{Authorization: `Bearer ${authorization}`}})
        dispatch(setFiles(response.data))
    }
}


export const createDir = (parentId, dirName) => {
    const authorization = localStorage.getItem("rememberMe") === "true" ? localStorage.getItem("token") : sessionStorage.getItem("token")
    return async (dispatch) => {
        try {
            const response = await axios.post(`${API_URL}/files/dir`,{
                name:dirName,
                type:"dir",
                parentId
            }, {headers:{Authorization: `Bearer ${authorization}`}})
            dispatch(addNewFile(response.data))
        } catch (e) {
            alert(e)
        }

    }
}


export const sizeFormater = (size) => {
    if(size > 1024*1024*1024) {
        return Math.ceil(size/(1024*1024*1024))+"Gb"
    }
    if(size > 1024*1024) {
        return Math.ceil(size/(1024*1024))+"Mb"
    }
    if(size > 1024) {
        return Math.ceil(size/(1024))+"Kb"
    }
    return size+"B"
}


