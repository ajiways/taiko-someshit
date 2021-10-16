"use strict";
import Arrow from './_classes.js';

document.addEventListener('DOMContentLoaded', () => {
    const scrollOne = document.querySelector('.one'),
          scrollTwo = document.querySelector('.two'),
          scrollThree = document.querySelector('.three'),
          scrollFour = document.querySelector('.four');

    // const arrow = document.querySelector('.Arrow');
    const newArrow = new Arrow(scrollOne, 'left', 4);
    const newArrow2 = new Arrow(scrollFour, 'right', 500);
    newArrow.render();
    newArrow.scrollDown();
    newArrow2.render();
    // console.log(arrow.getBoundingClientRect().y);
    // arrow.style.top = '10px';


});