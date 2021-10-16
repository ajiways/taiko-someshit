"use strict";

const input = document.querySelector('.file__input');

console.log(input);

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
        console.log(hitObjects[1]);
    };
}

