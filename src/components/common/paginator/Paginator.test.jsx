import React from "react";
import Paginator from "./Paginator";
import TestRenderer from "react-test-renderer";

describe("paginator component test", () => {
  test("page count is 11 but should be showed only 10",  () => {
    const component = TestRenderer.create(<Paginator totalItemsCount={11} pageSize={1} portionSize={10} onPageChanged={() => {}} currentPage={1}/>)
    const instance = component.root
    let buttons = instance.findAllByType("button");
    expect(buttons.length).toBe(11)
  })
  test("if pages count is more then 10 button NEXT should be present",  () => {
    const component = TestRenderer.create(<Paginator totalItemsCount={33} pageSize={2} portionSize={10} onPageChanged={() => {}} currentPage={1}/>)
    const instance = component.root
    let buttons = instance.findAllByType("button");
    expect(buttons.length).toBe(11)
  })
})
