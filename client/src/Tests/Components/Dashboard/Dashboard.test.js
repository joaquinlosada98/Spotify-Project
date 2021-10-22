import React from 'react';
import { shallow } from 'enzyme';
import Dashboard from '../../../Components/Dashboard/Dashboard';
import '@testing-library/jest-dom';


const setUp = (props={}) => {
    const component = shallow(<Dashboard {...props} />);
    return component;
}

describe('Pruebas en <Dashboard/>', () => {

    let component;
    beforeEach(() => {
        component = setUp();
    });


    test('Debe mostrar el componente correctamente', () => {
        expect(component.length).toBe(1);
    })

})