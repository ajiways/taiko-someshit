"use sctrict";

export default class Arrow {
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
