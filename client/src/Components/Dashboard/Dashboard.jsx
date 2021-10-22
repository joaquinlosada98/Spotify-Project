import React, {useEffect} from 'react';
import { Provider } from 'react-redux';
import SpotifyWebApi from 'spotify-web-api-node';
import appStore from '../../Store/store';
import { useAuth } from '../../Hooks/useAuth';

import Form from './Form/Form';
import Main from './Main/Main';
import Playlist from './Playlist/Playlist';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleUp } from '@fortawesome/free-solid-svg-icons';
import "./dashboard.css";

const SpotifyApi = new SpotifyWebApi({
    clientId: process.env.REACT_APP_CLIENT_ID,
}) 

const Dashboard = ({code}) => {
    const accessToken = useAuth(code);

    // Cada vez que cambia el accessToken
    useEffect(() => {
        // Si no existe el accessToken, volver
        if(!accessToken) return;

        SpotifyApi.setAccessToken(accessToken);

    }, [accessToken]);

    const handleTop = () => {
        
        window.scroll({
            top: 0,
            behavior: 'smooth'
        });
    }

    return (
        <Provider store={appStore}>
            <FontAwesomeIcon className="button-top" icon={faArrowCircleUp} onClick={handleTop}/>  

            {/* Elegir la accion a tomar */}
            <Main/>

            {/* formulario para crear o seleccionar la playlist */}
            <Form SpotifyApi={SpotifyApi}/>

            {/* Buscar y seleccionar canciones + contenedor donde muestra la playlist actual*/}
            <Playlist SpotifyApi={SpotifyApi}/>
            
            
        </Provider>
    );
}
 
export default Dashboard;