import React from 'react';
import Snowman from './Snowman';
import { render, fireEvent} from "@testing-library/react";
import {ENGLISH_WORDS} from './words';
import img0 from "./0.png";
import img1 from "./1.png";
import img2 from "./2.png";
import img3 from "./3.png";
import img4 from "./4.png";
import img5 from "./5.png";
import img6 from "./6.png";

it("renders without crashing", function (){
  render (<Snowman
      words={["apple"]}
      images={[img0, img1, img2, img3, img4, img5, img6]}
      maxWrong={6}/>)
})

it("only allows 6 wrong guesses", function(){
  const { container, debug } = render (<Snowman
    words={["apple"]}
    images={[img0, img1, img2, img3, img4, img5, img6]}
    maxWrong={6}/>);

  const buttons = Array.from(container.querySelectorAll("button"));

    //make 6 guesses
    fireEvent.click(buttons[1]);
    expect(container.querySelector('.Snowman-gameResult')).not.toBeInTheDocument();
    fireEvent.click(buttons[2]);
    expect(container.querySelector('.Snowman-gameResult')).not.toBeInTheDocument();
    fireEvent.click(buttons[3]);
    expect(container.querySelector('.Snowman-gameResult')).not.toBeInTheDocument();
    fireEvent.click(buttons[5]);
    expect(container.querySelector('.Snowman-gameResult')).not.toBeInTheDocument();
    fireEvent.click(buttons[6]);
    expect(container.querySelector('.Snowman-gameResult')).not.toBeInTheDocument();
    fireEvent.click(buttons[7]);

  expect(container.querySelector('.Snowman-gameResult')).toContainHTML('You Lose.');
  expect(container.querySelector(".Snowman-letters")).not.toBeInTheDocument();

})

it("only allows 2 wrong guesses", function(){
  const { container, debug } = render (<Snowman
    words={["apple"]}
    images={[img0, img1, img2, img3, img4, img5, img6]}
    maxWrong={2}/>);

  const buttons = Array.from(container.querySelectorAll("button"));

    //make 2 guesses
    fireEvent.click(buttons[1]);
    expect(container.querySelector('.Snowman-gameResult')).not.toBeInTheDocument();
    fireEvent.click(buttons[2]);
    expect(container.querySelector('.Snowman-gameResult')).toContainHTML('You Lose.');

    expect(container.querySelector(".Snowman-letters")).not.toBeInTheDocument();

});

it("it shows the correct image after 1 wrong guess", function(){

  const { container, debug } = render (<Snowman
    words={["apple"]}
    images={[img0, img1, img2, img3, img4, img5, img6]}
    maxWrong={2}/>);

    expect(container.querySelector('img')).toContainHTML('0.png');
    const buttons = Array.from(container.querySelectorAll("button"));
    fireEvent.click(buttons[1]);
    //expect(container.querySelector('img')).toContainHTML('3.png');
    expect(container.querySelector('img')).toContainHTML('alt="1"');
    //look me up!?!?

});

it("does not change image on correct guess", function(){
  const { container, debug } = render (<Snowman
    words={["apple"]}
    images={[img0, img1, img2, img3, img4, img5, img6]}
    maxWrong={2}/>);

  expect(container.querySelector('img')).toContainHTML("0.png");

  const buttons = Array.from(container.querySelectorAll("button"));
  debug(buttons[0])
  fireEvent.click(buttons[0]);

  expect(container.querySelector('img')).toContainHTML("0.png");
  expect(container.querySelector('img')).not.toContainHTML("1.png");


})

it("should match the snapshot of 6 wrong guesses", function(){
  const { container, debug } = render (<Snowman
    words={["apple"]}
    images={[img0, img1, img2, img3, img4, img5, img6]}
    maxWrong={6}/>);

  const buttons = Array.from(container.querySelectorAll("button"));

    //make 6 guesses
    fireEvent.click(buttons[1]);
    fireEvent.click(buttons[2]);
    fireEvent.click(buttons[3]);
    fireEvent.click(buttons[5]);
    fireEvent.click(buttons[6]);
    fireEvent.click(buttons[7]);

  expect(container).toMatchSnapshot();
});
