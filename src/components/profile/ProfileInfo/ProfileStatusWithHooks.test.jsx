import React from "react";
import TestRenderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';
import NavBar from "../../nav/NavBar";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import {Provider} from "react-redux";
import configureStore from 'redux-mock-store'


describe("NavBar", () => {
  test("component should display name", () => {
    const testRenderer = TestRenderer.create(<NavBar name={"Test"}/>);
    const testInstance = testRenderer.root;
    expect(testInstance.findByType(NavBar).props.name).toBe('Test');
  });
});

describe("Profile", () => {
  const initialState = {status: 'Test'}
  const mockStore = configureStore()
  let store, wrapper
  store = mockStore(initialState)

  test("component should display name", () => {
    const testRenderer = TestRenderer.create(<Provider store={store}> <ProfileStatusWithHooks status={'Test'}/> </Provider>);
    const testInstance = testRenderer.root;
    expect(testInstance.findByType(ProfileStatusWithHooks).props.status).toBe('Test');
  });
  test("component should display span", () => {
    const testRenderer = TestRenderer.create(<Provider store={store}> <ProfileStatusWithHooks status={'Test'}/> </Provider>);
    const testInstance = testRenderer.root;
    let span = testInstance.findByType("span");
    expect(span).not.toBeNull();
  });

  test("after creation <span> should contains correct status", () => {
    const testRenderer = TestRenderer.create(<NavBar name='Test'/>);
    const testInstance = testRenderer.root;
    let span = testInstance.findByType(NavBar);
    expect(span).not.toBeNull();
  });
  test("after creation <input> shouldn't be displayed", () => {
    const testRenderer = TestRenderer.create(<NavBar name='Test'/>);
    const testInstance = testRenderer.root;
    expect(() => {
      let input = testInstance.findByType("input");
    }).toThrow();
  });
});






describe('PanelHead test suites', () => {
  const initialState = {}
  const mockStore = configureStore()
  let store,wrapper

  it('t-1', () => {
    store = mockStore(initialState)
    const renderer = new ShallowRenderer();
    renderer.render(<Provider store={store}> <ProfileStatusWithHooks /> </Provider> )
    const result = renderer.getRenderOutput();
    expect(result.type).toBe('div');
  });

});