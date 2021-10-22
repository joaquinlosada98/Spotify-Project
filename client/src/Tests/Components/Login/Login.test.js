import React from 'react';
import { shallow } from 'enzyme';
import Login from '../../../Components/Login/Login';
import { findByTestAttr } from '../../Utils';

import '@testing-library/jest-dom';


const setUp = (props={}) => {
    const component = shallow(<Login {...props} />);
    return component;
}
 
describe('Pruebas en <Login/>', () => { 

    let component;
    beforeEach(() => {
        component = setUp();
    });

    test('Debe mostrar el componente correctamente', () => {

        const wrapper = findByTestAttr(component, 'LoginComponent');
        expect(wrapper.length).toBe(1);

    });

    test('la variable AUTH_URL debe estar preparado correctamente para usarse en el btn-login', () => {
        const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&scope=streaming%20playlist-modify-private%20playlist-modify-public%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`

        const wrapper = findByTestAttr(component, 'LoginComponent');
        const href = wrapper.find('.btn-login').prop('href');

        expect(href).toBe(AUTH_URL);

    });
})