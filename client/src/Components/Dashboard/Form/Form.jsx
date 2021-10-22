import React from 'react';
import { useSelector } from 'react-redux';

import CreateForm from './CreateForm/CreateForm';
// import SelectForm from './SelectForm/SelectForm';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

import './form.css';
import SelectForm from './SelectForm/SelectForm';


const Form = ({SpotifyApi}) => {


    const formType = useSelector((state) => state.formType);

    const message = <div className="container message">
        <h3>Please</h3><h4>Choose between Create or Select a Playlist <FontAwesomeIcon className="icon-message" icon={faArrowUp}/></h4> 
    </div>

    return (
        <section className="form-section">
        
                {
                    formType.length ? (

                        formType === "create" ? <CreateForm SpotifyApi={SpotifyApi}/> : <SelectForm SpotifyApi={SpotifyApi}/>

                    ) : message
                }

        </section>
        
    );
}
 
export default Form;