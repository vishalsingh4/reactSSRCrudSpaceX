import React from "react";
import { mount } from "enzyme";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import Home from "../../home";

describe('Flight page component', () => {
    let wrapper;
    let store;

    beforeEach(() => {
        store = configureStore([thunk])({
            launches: [
                {
                    flight_number: 1,
                    launch_year: 2020,
                    mission_name: 'Test',
                    links:
                    {
                        mission_patch_small: 'https://testimages.com'
                    },
                    mission_id: [
                        '#12345',
                        '#65434'
                    ],
                }
            ],
            isLoading: false,
        });
        const mockProps = {
            location: {
                pathname: '/launch',
                search: '?100&launch_year=2007',
            }
        };
        wrapper = mount(<Home store={store} {...mockProps} />);
    });

    it('should render valid wrapper', () => {
        expect(wrapper).toBeDefined();
    });

    it('should render home component', () => {
        expect(wrapper.find('Filghts')).toBeDefined();
    });

    it('should render correct image file', () => {
        expect(wrapper.find('.rocket-image').prop('src')).toBe('https://testimages.com');
    });

    it('should render mission name', () => {
        expect(wrapper.find('.mission-name').text()).toBe('Test #1');
    });

    it('should render mission ids', () => {
        expect(wrapper.find('.mission-ids').text().includes('Mission Ids:')).toBe(true);
    });

    it('should render mission id list', () => {
        expect(wrapper.find('.mission-list').length).toEqual(2);
    });

    it('should render launch year', () => {
        expect(wrapper.find('.launch-year').text().includes('Launch Year:')).toBe(true);
    });

    it('should render launch sucess', () => {
        expect(wrapper.find('.success-launch').text().includes('Successful Launch:')).toBe(true);
    });

    it('should render land sucess', () => {
        expect(wrapper.find('.success-land').text().includes('Successful Landing: ')).toBe(true);
    });
});