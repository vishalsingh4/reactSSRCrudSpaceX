import React from "react";
import { mount } from "enzyme";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import Home from "../../home";

describe('Filter page component', () => {
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
        },
        history: {
            push: jest.fn(),
        },
      };
   wrapper = mount(<Home store={store} {...mockProps} />);
 });

 it('should render valid wrapper', () => {
     expect(wrapper).toBeDefined();
 });

 it('should render home component', () => {
   expect(wrapper.find('Filters')).toBeDefined();
 });

 it('should render Filter header', () => {
    expect(wrapper.find('.card-title').first().text()).toBe('Filters');
  });
 
  it('should render Filter sub section component', () => {
     expect(wrapper.find('.card-subtitle').first().text()).toBe('Launch Year');
   });
 
   it('should render Filter buttons', () => {
     expect(wrapper.find('[type="button"]').first().text()).toBe('2006');
   });

   it('should call handleFilterClick function on button click', () => {
    wrapper.find('[type="button"]').first().props().onClick();
    expect(wrapper.instance().props.history.push).toHaveBeenCalled();
  });
});