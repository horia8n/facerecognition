import React from 'react';
import './FaceRecognition.css';

const displayBoxes = (boxes) => {
    if (!boxes.length > 0) {
        return null;
    }
    return boxes.map((box, index) => {
        return (
            <div
                className="bounding-box"
                style={{
                    top: box.topRow,
                    right: box.rightCol,
                    bottom: box.bottomRow,
                    left: box.leftCol
                }}
                key={index}
            > </div>
        );
    });
};


const FaceRecognition = ({imageUrl, boxes}) => {
    return (
        <div className="center ma">
            <div className="absolute mt2">
                <img
                    id="inputimage"
                    alt="" src={imageUrl}
                    width="500px"
                    heigh="auto"
                />
                {displayBoxes(boxes)}
            </div>
        </div>
    );
};

export default FaceRecognition;