import React, { useState } from 'react';
import { actCreatePlaylist } from '../../../../Store/actionCreators';
import { useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
import './createForm.css';

const CreateForm = ({SpotifyApi}) => {

    const dispatch = useDispatch();

    const defaultData = {
        name:'',
        description:'',
        error: false
    };

    const [form, setForm] = useState(defaultData);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleClick = async () => {

        if(form.name.length > 0){

            // Envio accion al store 
            await dispatch(actCreatePlaylist(SpotifyApi, form));

            // Limpio el form
            setForm(defaultData);

            // Realizo un Scroll hacia playlist-section -> este componente solo aparece cuando realizo el dispatch 
            const valueScroll = document.getElementsByClassName("playlist-section")[0].offsetTop;
            window.scroll({
                top: valueScroll,
                behavior: 'smooth'
            });


        }else{
            setForm({...form, error: true});
        }
    }

    return (
        <div className="container">
            <div className="form-create">
                <h3>Create a Playlist</h3>
                <div className="form-create-flex">
                    <div className="col">
                        <FontAwesomeIcon icon={faMusic}/>
                    </div>
                    <div className="col inputs">
                        <input placeholder="Add a Tittle" name="name" onChange={handleChange} value={form.name}/>
                        <textarea placeholder="Add a Description (optional)" name="description" onChange={handleChange} value={form.description}/>
                    </div>
                </div>
                <div className="form-create-button">
                    <p>{form.error ? "*You have to insert a Tittle first" : null}</p>
                    <button onClick={handleClick}>
                        Create a Playlist
                    </button>
                </div>
            </div>
        </div>
        
    );
}
 
export default CreateForm;