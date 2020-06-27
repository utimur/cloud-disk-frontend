import React from 'react';
import "./uploadingFile.css"

const UploadingFile = ({file}) => {

    return (
        <div className="uploading-file">
            <div className="uploading-file-name">{file.name} </div>
            <div className="uploading-file-progress">{file.progress}%</div>
        </div>
    );
};

export default UploadingFile;