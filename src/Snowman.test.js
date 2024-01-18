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
      words={ENGLISH_WORDS[0]}
      images={[img0, img1, img2, img3, img4, img5, img6]}
      maxWrong={6}/>)
})

it("only allows 6 wrong guesses", function(){
  //make 6 clicks
  const { container, debug } = render (<Snowman
    words={ENGLISH_WORDS[0]}
    images={[img0, img1, img2, img3, img4, img5, img6]}
    maxWrong={6}/>);

  const buttons = Array.from(container.querySelectorAll("button"));
  debug(buttons)

    //make 6 guesses
    fireEvent.click(buttons[1])
    fireEvent.click(buttons[2])
    fireEvent.click(buttons[3])
    fireEvent.click(buttons[5])
    fireEvent.click(buttons[6])
    fireEvent.click(buttons[7])

  expect("You lose").toBeInTheDocument();
  expect(container.querySelector("button")).not.toBeInTheDocument();

})
