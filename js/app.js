const SQUARE_SIZE = 100;

const newField = document.querySelector('.new-element');
const gridContainer = document.querySelector('.drop-container__grid');
const freeContainer = document.querySelector('.drop-container__free');

const  getRandomColor = () => "hsl(" + Math.random() * 360 + ", 100%, 75%)";

function createNewSquare(size, container) {
    const square = document.createElement('div');
    square.className = 'square';
    const color = getRandomColor();
    square.style.height = size;
    square.style.width = size;
    square.style.position = 'absolute';
    square.style.zIndex = 100;
    square.style.backgroundColor = color;
    container.appendChild(square);
    return square;
}

function isPointerOnContainer(container, pointerX, pointerY) {
    const leftOffset = container.offsetLeft;
    const fullWidth = container.offsetWidth + leftOffset;
    const isHorizontal = (pointerX - SQUARE_SIZE / 2 > leftOffset) && (pointerX + SQUARE_SIZE / 2 < fullWidth)

    const topOffset = container.offsetTop;
    const fullHeight = container.offsetHeight + topOffset;
    const isVertical = (pointerY - SQUARE_SIZE / 2 > topOffset) && (pointerY + SQUARE_SIZE / 2 < fullHeight)

    return  isHorizontal && isVertical;
}

newField.onpointerdown = function(event) {
    const square = createNewSquare(SQUARE_SIZE, newField);  

    square.style.left = event.clientX - square.offsetWidth / 2 + 'px';
    square.style.top = event.clientY - square.offsetHeight / 2 + 'px';
    document.onpointermove = (event) => {
       square.style.left = event.clientX - square.offsetWidth / 2 + 'px';
       square.style.top = event.clientY - square.offsetHeight / 2 + 'px';
    }

    document.onpointerup = (event) => {
        const pointerX = event.clientX;
        const pointerY = event.clientY;
        const inFreeZone = isPointerOnContainer(freeContainer, pointerX, pointerY);
        const inGridZone = isPointerOnContainer(gridContainer, pointerX, pointerY);

        if (inFreeZone) {
            freeContainer.append(square);
        }
        if (inGridZone) {
            square.style.position = 'relative';
            square.style.inset = 'unset';
            gridContainer.append(square);
        } 
        if (!inFreeZone && !inGridZone) {
            square.remove();
        }

        square.onpointerup = null;
        document.onpointermove = null;
    };
};
  


