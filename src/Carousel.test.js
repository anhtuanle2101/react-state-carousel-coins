import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

it("works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});

it("smoke test: component is not failing", function(){
  render( <Carousel /> );
})

it("snapshot test: component is working as the last snapshot", function(){
  const { asFragment } = render( <Carousel /> );
  expect(asFragment()).toMatchSnapshot();
})

it("the left arrow is working", function(){
  const { queryByAltText, queryByTestId } = render(<Carousel />);

  //move to second image
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);
  
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();

  // Click on the Left Arrow
  const leftArrow = queryByTestId("left-arrow");
  fireEvent.click(leftArrow);

  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
})

it("the left arrow is missing on the first image and right arrow is missing on the last image", function(){
  const { queryByTestId } = render( <Carousel /> );

  // First image: left arrow is missing, right arrow is shown
  let leftArrow = queryByTestId("left-arrow");
  let rightArrow = queryByTestId("right-arrow");
  
  expect(leftArrow).not.toBeInTheDocument();
  expect(rightArrow).toBeInTheDocument(); 

  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);

  // Last image: right arrow is missing, left arrow is shown
  leftArrow = queryByTestId("left-arrow");
  expect(leftArrow).toBeInTheDocument();
  expect(rightArrow).not.toBeInTheDocument();
})