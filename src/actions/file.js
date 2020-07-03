import axios from "axios";
import {API_URL} from "../config";
import {
    addNewFile,
    addUploadingFile,
    changeUploadingProgress, deleteFile,
    setFiles, setParentId,
    setUploaderDisplay
} from "../reducers/fileReducer";
import {userLogin} from "../reducers/userReducer";

export const uploadFile = (file, parentId) => {
    const authorization = localStorage.getItem("rememberMe") === "true" ? localStorage.getItem("token") : sessionStorage.getItem("token")
    return async (dispatch) => {
        const uploadingFile = {name:file.name,parentId,progress:0}
        dispatch(addUploadingFile(uploadingFile))

        let formData = new FormData();
        formData.append("file", file);
        formData.append("filename", file.name);
        if (parentId != null) {
            formData.append("parent_id", parentId);
        }
        dispatch(setUploaderDisplay("flex"))
        const response = await axios.post("http://localhost:8080/files/upload", formData, {
            headers: {Authorization: `Bearer ${authorization}`},
            onUploadProgress: (progressEvent) => {
                const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
                console.log("onUploadProgress", totalLength);
                if (totalLength !== null) {
                    uploadingFile.progress = (Math.round((progressEvent.loaded * 100) / totalLength))
                    dispatch(changeUploadingProgress(uploadingFile))
                }
            }
        });
        dispatch(addNewFile(response.data.file))
        dispatch(userLogin(response.data.user))
    }
}


export const getFiles = (parentId) => {
    const authorization = localStorage.getItem("rememberMe") === "true" ? localStorage.getItem("token") : sessionStorage.getItem("token")
    return async (dispatch) => {
        const response = await axios.get(`${API_URL}/files${parentId != null ? `?parent_id=${parentId}` : ""}`, {headers:{Authorization: `Bearer ${authorization}`}})
        dispatch(setFiles(response.data))
        dispatch(setParentId(parentId))
    }
}

export const getFilesOrderByName = (parentId, desc) => {
    const authorization = localStorage.getItem("rememberMe") === "true" ? localStorage.getItem("token") : sessionStorage.getItem("token")
    return async (dispatch) => {
        const response = await axios.get(`${API_URL}/files/order/name?${parentId != null ? `parent_id=${parentId}&` : ""}desc=${desc}`, {headers:{Authorization: `Bearer ${authorization}`}})
        dispatch(setFiles(response.data))
        dispatch(setParentId(parentId))
    }
}

export const getFilesOrderByType = (parentId, desc) => {
    const authorization = localStorage.getItem("rememberMe") === "true" ? localStorage.getItem("token") : sessionStorage.getItem("token")
    return async (dispatch) => {
        const response = await axios.get(`${API_URL}/files/order/type?${parentId != null ? `?parent_id=${parentId}&` : ""}desc=${desc}`, {headers:{Authorization: `Bearer ${authorization}`}})
        dispatch(setFiles(response.data))
        dispatch(setParentId(parentId))
    }
}

export const getFilesOrderByDate = (parentId, desc) => {
    const authorization = localStorage.getItem("rememberMe") === "true"? localStorage.getItem("token") : sessionStorage.getItem("token")
    return async (dispatch) => {
        const response = await axios.get(`${API_URL}/files/order/date?${parentId != null? `parent_id=${parentId}&`:""}desc=${desc}`, {headers: {Authorization: `Bearer ${authorization}`}})
        dispatch(setFiles(response.data))
        dispatch(setParentId(parentId))
        console.log("OrderByDate:", response.data)
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
            console.log(response.data)
        } catch (e) {
            alert(e)
        }

    }
}

export const downloadFile = async (file) => {
    const authorization = localStorage.getItem("rememberMe") === "true" ? localStorage.getItem("token") : sessionStorage.getItem("token")
    const response = await fetch(`http://localhost:8080/files/download?file_id=${file.id}`,{headers:{Authorization: `Bearer ${authorization}`}});
    if (response.status === 200) {
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = `${file.name}`;
        document.body.appendChild(link);
        link.click();
        link.remove();
    }
}

export const deleteFileFromServer = (file) => {
    const authorization = localStorage.getItem("rememberMe") === "true" ? localStorage.getItem("token") : sessionStorage.getItem("token")
    return async (dispatch) => {
        await axios.delete(`${API_URL}/files?file_id=${file.id}`, {headers:{Authorization: `Bearer ${authorization}`}})
        dispatch(deleteFile(file))
    }
}


export const sizeFormater = (size) => {
    if(size > 1024*1024*1024) {
        return (size/(1024*1024*1024)).toFixed(1)+"Gb"
    }
    if(size > 1024*1024) {
        return (size/(1024*1024)).toFixed(1)+"Mb"
    }
    if(size > 1024) {
        return (size/(1024)).toFixed(1)+"Kb"
    }
    return size+"B"
}


