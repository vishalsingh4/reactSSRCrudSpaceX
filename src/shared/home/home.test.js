import React from "react";
import { mount } from "enzyme";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import Home from "./index";

describe('Home page component', () => {
 let wrapper;
 let store;

 beforeEach(() => {
    store = configureStore([thunk])({
        launches: [],
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
   expect(wrapper.find('Home')).toBeDefined();
 });

 it('should render Space X header', () => {
   expect(wrapper.find('.page-header').text()).toBe('SpaceX Launch Programs');
 });

 it('should render Filter component', () => {
    expect(wrapper.find('Filters')).toBeDefined();
  });

  it('should render Flight component', () => {
    expect(wrapper.find('Flights')).toBeDefined();
  });
});