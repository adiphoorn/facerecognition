import React from 'react';
import "./imageLinkform.css";


const ImageLinkForm = ({ onInputChange , onPictureSubmit}) =>{
 return(
     <div>
       <p className="f3"> 
        {'Dit magische brein laat een vierkant zien om het gezicht op de foto. Copieer een afbeeldingslocatie van het internet en plak deze in de balk. Bevestig vervolgens met de button "Detect"...'}
       </p>
       <div className="center form">
           <div className="center form pa4 br3 shadow-5">
            <input className="f4 pa2 w-70 center" type="text" onChange={onInputChange}  />
            
            <button className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple" onClick={onPictureSubmit}>Detect</button>
            </div>
       </div>
     </div>


 );

}

export default ImageLinkForm;