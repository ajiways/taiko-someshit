"use strict";

const input = document.querySelector('.file__input');

class Arrow {
    constructor(parentScroll, keyName, scrollSpeed){
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
        this.scrollDown = function scrollDown(){
            let coordsY = temp.getBoundingClientRect().y;
            let pos = 0;
            const scroll = setInterval(move, scrollSpeed);
            function move() {
                if (coordsY <= 775){
                    pos = pos + 6;
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

let hitObjectsList,
    hitObjectsListLength; // 1 - last с 1 а не с 0 
let noteArr = [];
// let note = {
//     note: {
//         posX:'',
//         posY:'',
//         timing:'',
//         isRed: false,
//         isBlue: false,
//         isBig: false,
//         isSmall: false
//     },
//     spinner: {
//         posX:'',
//         posY:'',
//         timingStart:'',
//         timingEnd: '',
//     },
// };


function readOsuFile(){
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
        // console.log(hitObjects[1]);
        hitObjectsList = hitObjects;
        hitObjectsListLength = hitObjectsList.length - 2;
        console.log(hitObjectsList[2]);
        console.log(hitObjectsList[hitObjectsListLength]);
    };
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
    for(let i = 1; i < 2; i++) {
        let temp;
        console.log(hitObjectsList);
        temp = hitObjectsList[i];
        // console.log(temp);
        let noteTemp = temp.split('\r\n');
        // console.log(noteTemp);
        let noteArr = noteTemp[counter].split(',');
        counter++;
        console.log(noteArr);
        console.log(noteArr[0]);
        console.log(noteArr[1]);
        console.log(noteArr[2]);
        console.log(noteArr[3]);
        console.log(noteArr[5]);
        if(noteArr[5] == '0:0:0:0:') {
            note.posX = noteArr[0];
            note.posY = noteArr[1];
            note.timing = noteArr[2];
            if (noteArr[4] == 0) {
                note.isRed = true;
                note.isSmall = true;
            } else if (noteArr[4] == 4) {
                note.isRed = true;
                note.isBig = true;
            } else if (noteArr[4] == 8) {
                note.isBlue = true;
                note.isSmall = true;
            } else if (noteArr[4] == 12) {
                note.isBlue = true;
                note.isBig = true;
            }
            return note;
        } else {
            spinner.posX = noteArr[0];
            spinner.posY = noteArr[1];
            spinner.timingStart = noteArr[2];
            spinner.timingEnd = noteArr[5];
            return spinner;
        }
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const scrollOne = document.querySelector('.one'),
          scrollTwo = document.querySelector('.two'),
          scrollThree = document.querySelector('.three'),
          scrollFour = document.querySelector('.four'); 
          
});