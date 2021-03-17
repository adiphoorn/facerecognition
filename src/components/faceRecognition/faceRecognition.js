import React from 'react';
import './FaceRecognition.css';
import BorderBox from './borderbox';

const FaceRecognition = ({ imageUrl, boxAll }) => {
  return (
    <div className='center ma'>
      <div className='relative mt2'>
        <img id='inputimage' alt='' src={imageUrl} width='500px' height='auto'/>
        {
                    boxAll.map((box, i) => {
                        return (
                            <BorderBox
                                key = {i}
                                top={boxAll[i].topRow}
                                right={boxAll[i].rightCol}
                                bottom={boxAll[i].bottomRow}
                                left={boxAll[i].leftCol}
                            />
                        );
                    })
                  }
      </div>
    </div>
  );
}

export default FaceRecognition;