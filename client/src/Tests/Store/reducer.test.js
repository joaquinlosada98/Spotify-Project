import * as types from '../../Store/actionTypes';
import mainReducer from '../../Store/reducer';

const defaultData = {
    formType: '',
    allPlay: [],
    selectedPlay: {},
    showPlaylist: false
}

describe('Main Reducer', () => {
    test('Debe retornar el state default', () => {
        const newState = mainReducer(undefined, {});
        expect(newState).toEqual(defaultData);
    });

    test('Debe retornar el state si recibe un type', () => {

        const MutatedData = {
            formType: 'create',
            allPlay: [],
            selectedPlay: {},
            showPlaylist: false
        }
    
        const newState = mainReducer(undefined, {
            type: types.SET_FORM,
            payload: 'create'
        });

        expect(newState).toEqual(MutatedData);

    });

})