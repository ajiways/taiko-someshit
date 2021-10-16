"use sctrict";

export default class Arrow {
    constructor(parentScroll, keyName, scrollSpeed){
        this.parentScroll = parentScroll;
        this.keyName = keyName; // left down etc.
        this.scrollSpeed = scrollSpeed;
        const render = function(){
            const temp = parentScroll.createElement('img');
            temp.classList.add(Arrow);
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
    }
}
