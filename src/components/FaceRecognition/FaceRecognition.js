import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl, box }) => {
    return (
        <div className="center ma">
            <div className="absolute mt2">
                <img id="inputPic" src={imageUrl} alt="" width="500px" height="auto" />
                <div
                    className="bounding-box"
                    style={{ top: box.top, left: box.left, bottom: box.bottom, right: box.right }}
                ></div>
            </div>
        </div>
    );
};

export default FaceRecognition;
