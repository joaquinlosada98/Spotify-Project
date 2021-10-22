import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { actGetPlaylist } from '../../../../Store/actionCreators';

import img from '../../../../Images/no-img.png'
import './selectForm.css';

const SelectForm = ({SpotifyApi}) => {

    const allPlay = useSelector(state => state.allPlay);
    const dispatch = useDispatch()

    const [playlists, setPlaylists] = useState([]);

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
        <div className="form-select">
            <h3>Select a Playlist</h3>
            <div className="form-select-list">
            {
                playlists.length ? 

                    playlists.map((play, key) => (
                        <div className="playlist" key={key} onClick={(e) => handleClick(key)}>
                            <img alt="IMG" src={play.images.length ? play.images[0].url : img}/>
                            <div className="playlist-values">
                                <h4>{play.name}</h4>
                                <p>{play.description}</p>
                            </div>
                        </div>
                    )) 
                
                :
                    <div className="form-select-loading">
                        Just a few seconds ...
                    </div>
                
            }
            
            </div>
        </div>
    );
}
 
export default SelectForm;