"use strict";

const input = document.querySelector('.file__input'),
      scrollOne = document.querySelector('.one'),
      scrollTwo = document.querySelector('.two'),
      scrollThree = document.querySelector('.three'),
      scrollFour = document.querySelector('.four');
      let counterForTestFunc = 15;
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
        createNote();
        createTimeLine();
    };
}

class Note {
    constructor(posX, posY, timing, isRed, isBlue, isSmall, isBig, isNote) {
        this.posX = posX;
        this.posY = posY;
        this.timing = timing;
        this.isRed = isRed;
        this.isBlue = isBlue;
        this.isSmall = isSmall;
        this.isBig = isBig;
        this.isNote = isNote;
    }
}
class Spinner {
    constructor(posX, posY, timingStart, timingEnd, isSpinner) {
        this.posX = posX;
        this.posY = posY;
        this.timigStart = timingStart;
        this.timingEnd = timingEnd;
        this.isSpinner = isSpinner;
    }
}
let slidersCount = 0;
function createNote() {
    let counter = 0;
    for(let i = 1; i <= hitObjectsListLength; i++) {
        let temp;
        temp = hitObjectsList[i];
        let noteTemp = temp.split('\r\n');
        let noteArr = noteTemp[0].split(',');
        counter++;
        if(noteArr[5].search('B') != -1|| noteArr[5].search('L') != -1) {
            slidersCount++;
        } else if(noteArr[5] == '0:0:0:0:') {
            let posX = noteArr[0],
                posY = noteArr[1],
                timing = noteArr[2],
                isRed = false,
                isSmall = false,
                isBlue = false,
                isBig = false,
                isNote = true;
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
            let note = new Note(posX, posY, timing, isRed, isBlue, isSmall, isBig, isNote);
            notesArr.push(note);
            } else {
                let posX = noteArr[0],
                    posY = noteArr[1],
                    timingStart = noteArr[2],
                    timingEnd = noteArr[5],
                    isSpinner = true;
                let spinner = new Spinner(posX, posY, timingStart, timingEnd, isSpinner);
                notesArr.push(spinner);
            }
    }
}

function convert(milliseconds) {
    let minutes = Math.floor((milliseconds / 1000) / 60),
        seconds = Math.floor((milliseconds / 1000) % 60),
        mSecs = Math.floor((milliseconds % 1000)),
        result = `${getZero(minutes)}:${getZero(seconds)}:${getMSZero(mSecs)}`;
        function getZero (num) {
            if (num <= 1 && num < 10) {
                return `0${num}`;
            } else {
                return num;
            }
        }
        function getMSZero(num){
            if (num <= 99){
                return `0${num}`;
            } else {
                return num;
            }
        }
        return result;
}
function oneSmallRed() {
    let smallRed = new Arrow(scrollTwo, 'up', 4);
    smallRed.render();
    smallRed.scrollDown();
}
function twoSmallReds() {
    let smallRedD = new Arrow(scrollThree, 'down', 4);
    smallRedD.render();
    smallRedD.scrollDown();
}
function oneSmallBlue() {
    let smallBlueD = new Arrow(scrollOne, 'left', 4);
    smallBlueD.render();
    smallBlueD.scrollDown();
}
function twoSmallBlues() {
    let smallBlue = new Arrow(scrollFour, 'right', 4);
    smallBlue.render();
    smallBlue.scrollDown();
}
function bigRed() {
    let bigRed = new Arrow(scrollTwo, 'up', 4);
    bigRed.render();
    bigRed.scrollDown();
    let bigRedD = new Arrow(scrollThree, 'down', 4);
    bigRedD.render();
    bigRedD.scrollDown();
}
function bigBlue() {
    let bigBlue = new Arrow(scrollOne, 'left', 4);
    bigBlue.render();
    bigBlue.scrollDown();
    let bigBlueD = new Arrow(scrollFour, 'right', 4);
    bigBlueD.render();
    bigBlueD.scrollDown();
}
class SpawnNote {
    constructor(noteName, timingNote, SR, SB) {
        this.noteName = noteName;
        this.timingNote = timingNote;
        this.SR = SR;
        this.SM = SB;
        this.run = setTimeout(function run(){
            switch (noteName){
                case 'sr':
                    switch (SR){
                        case 1:
                            oneSmallRed();
                            break;
                        case 2:
                            twoSmallReds();
                            break;
                    }
                    break;
                case 'sb':
                    switch (SB){
                        case 1:
                            oneSmallBlue();
                            break;
                        case 2:
                            twoSmallBlues();
                            break;
                    }
                    break;
                case 'br':
                    bigRed();
                    break;
                case 'bb':
                    bigBlue();
                    break;
            }
        }, timingNote);
    }
}

let timing = [];
let timeLine = [];

function createTimeLine() {
    const startTiming = '00:00:015';
    let temp = hitObjectsListLength - slidersCount - 1;
    let tempTiming;

    if(notesArr[temp].isSpinner) {
        tempTiming = notesArr[temp].timingEnd;
    } else if (notesArr[temp].isNote) {
        tempTiming = notesArr[temp].timing;
    } else {
        console.log("ошибка");
    }

    const endTiming = convert(tempTiming);
    function pushTiming() {
        for(let i = 15; i <= tempTiming; i++){
            timing.push(i);
        }
    }
    pushTiming();

    function pushTimeLine() {
        for (let i = 0; i <= notesArr.length - 1; i ++){
            if (notesArr[i].isSpinner){
                let spinner = {
                    start: notesArr[i].timigStart,
                    end: notesArr[i].timingEnd
                };
                timeLine.push(spinner);
            } else if (notesArr[i].isNote){
                if (notesArr[i].isRed && notesArr[i].isSmall){
                    let smallRedNote = {
                        timing: notesArr[i].timing,
                        isSmall: true,
                        isRed: true
                    };
                    timeLine.push(smallRedNote);
                } else if(notesArr[i].isBlue && notesArr[i].isSmall) {
                    let smallBlueNote = {
                        timing: notesArr[i].timing,
                        isSmall: true,
                        isblue: true
                    };
                    timeLine.push(smallBlueNote);
                } else if(notesArr[i].isRed && notesArr[i].isBig) {
                    let bigRedNote = {
                        timing: notesArr[i].timing,
                        isBig: true,
                        isRed: true
                    };
                    timeLine.push(bigRedNote);
                } else if(notesArr[i].isBlue && notesArr[i].isBig){
                    let bigBlueNote = {
                        timing: notesArr[i].timing,
                        isBig: true,
                        isBlue: true
                    };
                    timeLine.push(bigBlueNote);
                }
                // timeLine.push(notesArr[i].timing);
            } else {
                console.log("Ошибка");
            }
        }
    }
    pushTimeLine();
}

function play() {
    let noteCounter = 0;
    let timingCounter2 = 0;
    let counterSR = 0;
    let counterSB = 0;
    let note;
    let timingNote;
    for(let i = 15; i <= timing[timing.length - 1]; i++){
        if (timeLine[noteCounter].start == timing[timingCounter2]){
            let sliderStart = timeLine[noteCounter].start,
                sliderEnd = timeLine[noteCounter].end;
                noteCounter++;
        } else if (timeLine[noteCounter].timing == timing[timingCounter2]) {
            if(timeLine[noteCounter].isRed && timeLine[noteCounter].isSmall){
                counterSB = 0;
                counterSR++;
                timingNote = timeLine[noteCounter].timing;
                note = 'sr';
                let createArrow = new SpawnNote(note, timingNote, counterSR, counterSB);
                if(counterSR == 2){
                    counterSR = 0;
                }
            } else
            if (timeLine[noteCounter].isblue && timeLine[noteCounter].isSmall) {
                counterSR = 0;
                counterSB++;

                timingNote = timeLine[noteCounter].timing;
                note = 'sb';
                let createArrow = new SpawnNote(note, timingNote,  counterSR, counterSB);
                if(counterSB == 2){
                    counterSB = 0;
                }
            } else
            if (timeLine[noteCounter].isRed && timeLine[noteCounter].isBig) {
                timingNote = timeLine[noteCounter].timing;
                note = 'br';
                let createArrow = new SpawnNote(note, timingNote);
             
            } else
            if (timeLine[noteCounter].isBlue && timeLine[noteCounter].isBig) {
                timingNote = timeLine[noteCounter].timing;
                note = 'bb';
                let createArrow = new SpawnNote(note, timingNote);
            }
            noteCounter++;
        }
        timingCounter2++;
        counterForTestFunc++;
    }
}
const brn = document.querySelector('button');
brn.addEventListener('click', ()=>{
    counter();
    setTimeout(play, 4600);

});
function counter() {
    let counterNum = 2;
    console.log('Нажми через : 3');
    let id = setInterval(()=>{
        if(counterNum == 0){
            clearInterval(id);
        }
        console.log(`Нажми через : ${counterNum}`);
        counterNum--;
    }, 1000);
}