import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { convert } from '../../../helpers';


import { actAddTrack, actRemoveTrack } from '../../../Store/actionCreators';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import img from '../../../Images/no-img.png';
import './playlist.css';

const Playlist = ({SpotifyApi}) => {

    const dispatch = useDispatch();
    const playlist = useSelector(state => state.selectedPlay);

    const showPlaylist = useSelector(state => state.showPlaylist);

    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleChange = (e) => {
        setSearch(e.target.value)
    }
    
    const handleAdd = (uri) => {
        dispatch(actAddTrack(SpotifyApi, playlist.id, uri))
    }

    const handleRemove = (uri) => {
        dispatch(actRemoveTrack(SpotifyApi, playlist.id, uri))
    }
    
    // Search
    useEffect(() => {
        if(!search) return setSearchResults([])
        if (!SpotifyApi.getAccessToken()) return 

        let cancel = false
        SpotifyApi.searchTracks(search).then(res => {
            if(cancel) return 

            setSearchResults(
                res.body.tracks.items.map(track => {
                    return {
                        artist: track.artists[0].name,
                        title: track.name,
                        img: track.album.images[0].url,
                        uri: track.uri
                    }
                })
            )
        
        })
    
        return () => cancel = true;
    }, [search, SpotifyApi])



    if(!showPlaylist) return null


    return (
        <section className="playlist-section">
            <div className="container">

                <div className="lists">

                    <div className="search-container">
                        <div className="search-bar">
                            <input placeholder="Search Something!" value={search} onChange={handleChange}/>
                        </div>
                        <div className="search-list">
                            <div className="search-header">
                                <h3>Search Results</h3>
                                <em>*Click to add to your Playlist</em>
                            </div>
                            


                            <div className="search-tracks">
                            {
                                searchResults.map((item, key) => (
                                    <div className="track" key={key} onClick={() => handleAdd(item.uri)}>
                                        <img alt="IMG" src={item.img ? item.img : img}/>
                                        <div className="track-values">
                                            <h4>{item.title}</h4>
                                            <p>{item.artist}</p>
                                        </div>
                                    </div>
                                ))

                            }
                            </div>
                        </div>
                    </div>
                   

                    <div className="playlist-container">
                        <div className="playlist-header">
                            <img alt="img" src={playlist.images.length ? playlist.images[0].url : img}></img>
                            <h4>{playlist.name}</h4>
                        </div>
                        <div className="playlist-tracks">

                            {
                                playlist?.tracks?.items?.map((item, key) => (
                                    <div className="track" key={key}>
                                        <img alt="IMG" src={item.track.album.images[0].url}/>
                                        <div className="track-values">
                                            <h4>{convert(item.track.name, 25)}</h4>
                                            <p>{item.track.artists[0].name}</p>
                                        </div>
                                        <FontAwesomeIcon 
                                            icon={faMinusCircle}
                                            className="minus-icon"
                                            onClick={() => handleRemove(item.track.uri)}
                                        />
                                    </div>
                                ))
                            }

                        </div>
                    </div>
                </div>

            </div>
            
        </section>
    );
}
 
export default Playlist;