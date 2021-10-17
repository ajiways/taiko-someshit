"use strict";

const input = document.querySelector('.file__input'),
      scrollOne = document.querySelector('.one'),
      scrollTwo = document.querySelector('.two'),
      scrollThree = document.querySelector('.three'),
      scrollFour = document.querySelector('.four');

class Arrow {
    constructor(parentScroll, keyName, scrollSpeed) {
        this.parentScroll = parentScroll;
        this.keyName = keyName; // left down etc.
        const temp = document.createElement('img');
        this.render = function render(){
            temp.classList.add('Arrow');
            switch(keyName) {
                case 'left':
                    temp.src = 'images/left.png';
                    break;
                case 'down':
                    temp.src = 'images/down.png';
                    break;
                case 'up':
                    temp.src = 'images/up.png';
                    break;
                case 'right':
                    temp.src = 'images/right.png';
                    break;
                default: 
                    console.log('Неверно указано имя стрелочки');
                }
            parentScroll.append(temp);
        };
        this.scrollDown = function scrollDown() {
            let coordsY = temp.getBoundingClientRect().y;
            let pos = 0;
            const scroll = setInterval(move, scrollSpeed);
            function move() {
                if (coordsY <= 775){
                    pos = pos + 8;
                    temp.style.top = pos + 'px';
                    coordsY = temp.getBoundingClientRect().y;
                }
                if(coordsY > 775){
                    clearInterval(scroll);
                    temp.remove();
                }
            }
        };
    }
}

// const arrow = new Arrow(scrollOne, 'left', 4);
// arrow.render();
// arrow.scrollDown();
// const arrow2 = new Arrow(scrollTwo, 'up', 4);
// arrow2.render();
// arrow2.scrollDown();
// const arrow3 = new Arrow(scrollThree, 'down', 4);
// arrow3.render();
// arrow3.scrollDown();
// const arrow4 = new Arrow(scrollFour, 'right', 4);
// arrow4.render();
// arrow4.scrollDown();

let hitObjectsList,
    hitObjectsListLength; // 1 - last с 1 а не с 0 
let notesArr = [];


function readOsuFile() {
    let file = input.files[0];
    let reader = new FileReader();
    reader.readAsBinaryString(file);

    reader.onload = function () {
        let tempArrResult = reader.result;
        let index =  tempArrResult.indexOf('[HitObjects]') + 12;
        let newTempArr = tempArrResult.split('');
        newTempArr.splice(0, index);
        let newTempArr2 = newTempArr.join('');
        let hitObjects = newTempArr2.split('\r\n');
        hitObjectsList = hitObjects;
        hitObjectsListLength = hitObjectsList.length - 2;
        console.log(hitObjectsList[1]);
        console.log(hitObjectsList[hitObjectsListLength]);
    };
}

class Note {
    constructor(posX, posY, timing, isRed, isBlue, isSmall, isBig) {
        this.posX = posX;
        this.posY = posY;
        this.timing = timing;
        this.isRed = isRed;
        this.isBlue = isBlue;
        this.isSmall = isSmall;
        this.isBig = isBig;
    }
}
class Spinner {
    constructor(posX, posY, timingStart, timingEnd) {
        this.posX = posX;
        this.posY = posY;
        this.timigStart = timingStart;
        this.timingEnd = timingEnd;
    }
}

function createNote() {
    let note = {
        posX: 0,
        posY: 0,
        timing: 0,
        isRed: false,
        isBlue: false,
        isBig: false,
        isSmall: false
        };

    let spinner = {
        posX: 0,
        posY: 0,
        timingStart: 0,
        timingEnd: '',
    };
    let counter = 0;
    for(let i = 1; i <= hitObjectsListLength; i++) {
        let temp;
        temp = hitObjectsList[i];
        let noteTemp = temp.split('\r\n');
        let noteArr = noteTemp[0].split(',');
        console.log(noteArr);
        counter++;
        if(noteArr[5].length > 15) {
            continue;
        } else if(noteArr[5] == '0:0:0:0:') {
            let posX = noteArr[0],
                posY = noteArr[1],
                timing = noteArr[2],
                isRed = false,
                isSmall = false,
                isBlue = false,
                isBig = false;
            if (noteArr[4] == 0) {
                isRed = true;
                isSmall = true;
            }
            if (noteArr[4] == 4) {
                isRed = true;
                isBig = true;
            }
            if (noteArr[4] == 8) {
                isBlue = true;
                isSmall = true;
            }
            if (noteArr[4] == 12) {
                isBlue = true;
                isBig = true;
            }
            let note = new Note(posX, posY, timing, isRed, isBlue, isSmall, isBig);
            notesArr.push(note);
        } else {
            let posX = noteArr[0],
                posY = noteArr[1],
                timingStart = noteArr[2],
                timingEnd = noteArr[5];
            let spinner = new Spinner(posX, posY, timingStart, timingEnd);
            notesArr.push(spinner);
        }
    }
    console.log(notesArr);
}


document.addEventListener('DOMContentLoaded', () => {
    const scrollOne = document.querySelector('.one'),
          scrollTwo = document.querySelector('.two'),
          scrollThree = document.querySelector('.three'),
          scrollFour = document.querySelector('.four'); 
          
});