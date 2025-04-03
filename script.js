const imageUrl = 'aman.jpeg'; // Replace with your image
const puzzleBoard = document.getElementById("puzzleBoard");
const piecesBoard = document.getElementById("piecesBoard");
let positions = [];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createPuzzle() {
    for (let i = 0; i < 9; i++) {
        positions.push(i);
        
        let dropzone = document.createElement("div");
        dropzone.classList.add("dropzone");
        dropzone.dataset.index = i;
        dropzone.ondrop = drop;
        dropzone.ondragover = allowDrop;
        puzzleBoard.appendChild(dropzone);
    }
    shuffle(positions);
    for (let i = 0; i < 9; i++) {
        let piece = document.createElement("div");
        piece.classList.add("piece");
        piece.style.backgroundImage = `url(${imageUrl})`;
        piece.style.backgroundPosition = `-${(positions[i] % 3) * 100}px -${Math.floor(positions[i] / 3) * 100}px`;
        piece.draggable = true;
        piece.dataset.index = positions[i];
        piece.ondragstart = drag;
        piecesBoard.appendChild(piece);
    }
}

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.dataset.index);
}

function drop(event) {
    event.preventDefault();
    let draggedIndex = event.dataTransfer.getData("text");
    let targetIndex = event.target.dataset.index;
    if (draggedIndex === targetIndex) {
        let piece = document.querySelector(`.piece[data-index='${draggedIndex}']`);
        event.target.appendChild(piece);
        piece.draggable = false;
    }
}

createPuzzle();