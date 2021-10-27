import React ,{ useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actGetPlaylists, actGetPlaylist } from '../../../../Store/actionCreators';
import { convert } from '../../../../helpers';

import img from '../../../../Images/no-img.png';
import './selectForm.css';


const SelectForm = ({SpotifyApi}) => {
    const allPlay = useSelector(state => state.allPlay);
    const dispatch = useDispatch()

    const [playlists, setPlaylists] = useState([]);

    // Recibir las playlist
    useEffect(() => {
        if (!SpotifyApi.getAccessToken()) return 
        
        dispatch(actGetPlaylists(SpotifyApi))

    }, [dispatch, SpotifyApi])
    
    // Una vez recibidas las playlist -> guardar en el state
    useEffect(() => {
        setPlaylists(allPlay);

    }, [allPlay, setPlaylists]);


    const handleClick =  async (key) => {

        // Obtengo la playlist seleccionada
        const selected = playlists[key];

        // Guardo la playlist seleccionada
        await dispatch(actGetPlaylist(SpotifyApi, selected))

        // Realizo un Scroll hacia form-section 
        const valueScroll = document.getElementsByClassName("playlist-section")[0].offsetTop;
        window.scroll({
            top: valueScroll,
            behavior: 'smooth'
        });
    }


    return (
        <div className="select-form">
            <div className="select-form-header">
                <h3>Select a Playlist</h3>
            </div>
            <div className="select-form-list">
            {
                playlists.length ? 
                    playlists.map((play, key) => (
                        <div className="playlist-item"  key={key} onClick={() => handleClick(key)}>
                            <img alt="img" src={play.images.length ? play.images[0].url : img}/>
                            <h4>{convert(play.name, 20)}</h4>
                            <p>{convert(play.description, 20)}</p>
                        </div>
                    ))
                :   
                    <div className="select-form-loading">
                        Just a few seconds ...
                    </div>
            }
            </div>
        </div>
    );
}
 
export default SelectForm;