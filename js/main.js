"use strict";

import Arrow from './classes';

document.addEventListener('DOMContentLoaded', () => {
    const scrollOne = document.querySelector('one'),
          scrollTwo = document.querySelector('two'),
          scrollThree = document.querySelector('three'),
          scrollFour = document.querySelector('four');


    const newArrow = new Arrow(scrollOne, 'left', 10);
    newArrow.render();
    console.log(1);


});