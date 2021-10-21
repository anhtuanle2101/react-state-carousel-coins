import Card from "./Card";
import { render, fireEvent } from "@testing-library/react";
import React from "react";

it("smoke test: component is not failing", function(){
    render( <Card /> );
  })
  
  it("snapshot test: component is working as the last snapshot", function(){
    const { asFragment } = render( <Card /> );
    expect(asFragment()).toMatchSnapshot();
  })
  