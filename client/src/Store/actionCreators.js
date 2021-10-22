import * as types from './actionTypes';

export function actSetForm(formType){
    return {
        type: types.SET_FORM,
        payload: formType 
    }
}

export const actCreatePlaylist = (SpotifyApi, form) => async(dispatch) => {
    try {
        
        const data = await SpotifyApi.createPlaylist(
            form.name, { 'description': form.description, 'public': true }
        )
            
        dispatch({type: types.SET_PLAYLIST, payload: data.body})

    } catch (error) {
        console.log(error)
    }
}

export const actGetPlaylists = (SpotifyApi) => async(dispatch) => {
    try {
        var data = await SpotifyApi.getMe();
        data = await SpotifyApi.getUserPlaylists(data.body.id, {
            limit: 12,
        })
        dispatch({type: types.SET_PLAYLISTS, payload: data.body.items})

    } catch (error) {
        console.log(error)
    }
}



export const actGetPlaylist = (SpotifyApi, playlist) => async(dispatch) => {
    try {
        const data = await SpotifyApi.getPlaylist(playlist.id);
        dispatch({type: types.SET_PLAYLIST, payload: data.body});

    } catch (error) {
        console.log(error)
    }
}


export const actAddTrack = (SpotifyApi, playlist_id, track_uri) => async(dispatch) => {
    try {
        await SpotifyApi.addTracksToPlaylist(playlist_id, [track_uri]);
        const data = await SpotifyApi.getPlaylist(playlist_id);
        dispatch({type: types.SET_PLAYLIST, payload: data.body});

    } catch (error) {
        console.log(error)
    }
}

export const actRemoveTrack = (SpotifyApi, playlist_id, track_uri) => async(dispatch) => {
    try {
        var track = [{ uri : track_uri }];

        await SpotifyApi.removeTracksFromPlaylist(playlist_id, track);
        const data = await SpotifyApi.getPlaylist(playlist_id);
        dispatch({type: types.SET_PLAYLIST, payload: data.body});

    } catch (error) {
        console.log(error)
    }
}