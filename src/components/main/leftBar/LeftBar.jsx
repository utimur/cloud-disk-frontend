import React from 'react';
import "./leftBar.css";

const LeftBar = () => {
    const favorMock = [{name:"Concerts"},{name:"Playbacks"},{name:"Мои документы"},{name:"Видео"},{name:"Фотографии"}]


    return (
        <div className="leftbar">
            <div className="favourites">
                <div className="favourites-header">Избранное</div>
                {favorMock.map(favor =>
                    <div className="favourites-item">{favor.name}</div>
                )}
            </div>
            <div className="memory">
                <div className="fullbar"><div className="freebar" style={{width:"52%"}}/></div>
                <div className="memory-count">Свободно 5.2\10гб</div>
            </div>
        </div>
    );
};

export default LeftBar;