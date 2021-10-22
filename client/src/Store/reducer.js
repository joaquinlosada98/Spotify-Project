import * as types from './actionTypes';

const defaultData = {
    formType: '',
    allPlay: [],
    selectedPlay: {},
    showPlaylist: false
}

export default function mainReducer(state = defaultData, action){
    const newState = {...state}

    switch(action.type){
        //Para botonera Main
        case(types.SET_FORM):
            newState.formType = action.payload
            newState.showPlaylist = false
            break;

        
        case(types.SET_PLAYLISTS):
            newState.allPlay = action.payload
            break;
        
        case(types.SET_PLAYLIST):
            newState.selectedPlay = action.payload
            newState.showPlaylist = true 
            break;

        default:
            break;
    }

    return newState;
}