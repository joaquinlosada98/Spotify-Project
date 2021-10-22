import React from 'react';
import { useDispatch } from 'react-redux';
import {actSetForm} from '../../../Store/actionCreators';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './main.css';

const Main = () => {
    const dispatch = useDispatch();

    const handleClick = async (value) => {

        let valueScroll;
        await dispatch(actSetForm(value));

        // Envio accion al store 
        if(value === "select"){
            valueScroll = document.getElementsByClassName("select-form-header")[0].offsetTop;
            // valueScroll = 822;
        }else{
            valueScroll = document.getElementsByClassName("form-section")[0].offsetTop;
        }

        window.scroll({
            top: valueScroll,
            behavior: 'smooth'
        });
    } 

    return (
        <section className="main-section">
            <div className="main-cards">
                <div className="card"  onClick={() => handleClick("create")}>
                    <h3>Create a Playlist</h3>
                    <FontAwesomeIcon className="icon" icon={faPlusSquare} size="4x"/>
                </div>
                <div className="card" onClick={() => handleClick("select")}>
                    <h3>Select a Playlist</h3>
                    <FontAwesomeIcon className="icon" icon={faBars} size="4x"/>
                </div>
            </div>
        </section>
    );
}
 
export default Main;