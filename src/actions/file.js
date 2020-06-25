import axios from "axios";

async function big_file_upload(file, parentId) {
    let formData = new FormData();

    formData.append("file", file);
    formData.append("filename", file);
    formData.append("parent_id", parentId);

    const response = await axios.post("http://localhost:8080/files/upload", formData, {
        headers:{Authorization:"Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1dGltdXIxIiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sImlkIjo1LCJpYXQiOjE1OTMwNzkzNDMsImV4cCI6MTU5MzA4Mjk0M30.UsR3JjOKqtn90xCH8yoaFY7J_mdqpXKHdCCw0l9G34g"},
        onUploadProgress: (progressEvent) => {
            const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
            console.log("onUploadProgress", totalLength);
            if (totalLength !== null) {
                console.log(Math.round( (progressEvent.loaded * 100) / totalLength ));
            }
        }});
    console.log(response)
}