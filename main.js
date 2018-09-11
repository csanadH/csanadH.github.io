let sortButtons;
let val = 60;
let currentlySelected;
let numbers = [];
let started = false;
let spacing;
let bar_width;
let i = 0;
let j = 0;
let noSwapHappened = false;
let swapCount = 0;
let fps = 30;
let arr_length;
let bool = false;

function setup() {

    for (let i = 0; i < val; i++) {
        numbers.push(1 + Math.floor(Math.random() * 580));
    }
    
    spacing = (screen.width / 1.160) / (3 * numbers.length + 1);
    bar_width = spacing * 2;
    let canvas = createCanvas(screen.width / 1.160, 600);
    canvas.parent('canvas-div');
}

function draw() {

    frameRate(+fps);
    drawRects();
    
    if (started) {
        if (currentlySelected) {
            addClassLists();
            switch (currentlySelected) {
                case 'insertion':
                    insertionSort();
                break;
                case 'selection':
                    selectionSort();
                break;
                case 'bubble':
                    bubbleSort();
                break;
                case 'quick':
                    quickSort(0, numbers.length - 1);
                break;
                case 'merge':
                    alert("Not yet implemented!");
                    noSwapHappened = true;
                break;
                case 'heap':
                    heapSort();
                break;
                case 'shell':
                    alert("Not yet implemented!");
                    noSwapHappened = true;
                break;
                case 'comb':
                    alert("Not yet implemented!");
                    noSwapHappened = true;
                break;
                case 'counting':
                    alert("Not yet implemented!");
                    noSwapHappened = true;
                break;
            }
            if (noSwapHappened === true) {
                i = 0;
                j = 0;
                removeClassLists();
                started = false;
                swapCount = 0;
                noSwapHappened = false;
            }
        }
    }
}

function insertionSort() {
    if (i < numbers.length) {
        value = numbers[i];
        j = i - 1

        while (j >= 0 && numbers[j] > value) {
            numbers[j+1] = numbers[j];
            j--;
            swapCount++;
        }
        numbers[j+1] = value;
    } else {
        noSwapHappened = true;
    }
    i++;

    drawRects();
}

function selectionSort() {
    if (i < numbers.length) {    
        let min = i;

        for (let j = i + 1; j < numbers.length; j++) {
            if (numbers[j] < numbers[min]) {
                min = j;
            }
        }

        if (i != min) {
            let temp = numbers[i];
            numbers[i] = numbers[min];
            numbers[min] = temp;
            swapCount++;
        }
    } else {
        noSwapHappened = true;
    }
    i++;

    drawRects();
}

function bubbleSort() {
    if (i < numbers.length) {
        if (numbers[i] > numbers[i + 1]) {
            swapNumbers();
        } 
    } else {
        i = -1;
        if (swapCount == 0) {
            noSwapHappened = true;
        } else {
            swapCount = 0;
        }
    }
    i++;
    drawRects();
}

function quickSort(left, right) {
    let index = quickPartition(left, right);

    if (swapCount > numbers.length * 25) {
        noSwapHappened = true;
        return;
    }

    if (left < index - 1) {
        quickSort(left, index - 1);
    }

    if (index < right) {
        quickSort(index, right);
    }

    drawRects();
}

function quickPartition(left, right) {
    let pivot = numbers[Math.floor((right + left) / 2)];
    i = left;
    j = right;

    while (numbers[i] < pivot) {
        i++;
    }

    while (numbers[j] > pivot) {
        j--;
    }

    if (i <= j) {
        quickSwap(i, j);
        i++;
        j--;
    }
    return i;
}

function quickSwap(firstIndex, secondIndex) {
    let temp = numbers[firstIndex];
    numbers[firstIndex] = numbers[secondIndex];
    numbers[secondIndex] = temp;
    swapCount++;
}

function drawRects() {
    clear();
    for (let k = 0; k < numbers.length; k++) {
        if (started === true) {
            if (k === i) {
                noStroke();
                fill(255, 0, 0);
                rect(5 + (spacing * (k * 3)), 600, bar_width, -numbers[k]);
            } else {
                noStroke();
                fill(100, 100, 100);
                rect(5 + (spacing * (k * 3)), 600, bar_width, -numbers[k]);
            }
        } else {
            noStroke();
            fill(100, 100, 100);
            rect(5 + (spacing * (k * 3)), 600, bar_width, -numbers[k]);
        }
    }
}

function swapNumbers() {
    let temp = numbers[i];
    numbers[i] = numbers[i + 1];
    numbers[i + 1] = temp;
    swapCount++;
}

function addClassLists() {
    for (let i = 0; i < sortButtons.length; i++) {
        sortButtons[i].classList.add('disabled');
    }
    document.getElementById('range').classList.add('disabled');
    document.getElementsByClassName('number-span')[0].classList.add('disabled');
}

function removeClassLists() {
    for (let i = 0; i < sortButtons.length; i++) {
        sortButtons[i].classList.remove('disabled');
    }
    document.getElementById('range').classList.remove('disabled');
    document.getElementsByClassName('number-span')[0].classList.remove('disabled');
}

function onStartButtonClick() {
    if (!currentlySelected) {
        alert('Please select a sort type');
    }
    started = true;
}

function onSortButtonClick() {
    for (let i = 0; i < sortButtons.length; i++) {
        const sortButton = sortButtons[i];
        sortButton.style.background = 'white';
        sortButton.style.color = 'black';
        sortButton.setAttribute('selected', 'false');
    }

    this.setAttribute('selected', 'true');
    this.style.background = 'black';
    this.style.color = 'orange';
    currentlySelected = this.id;
    started = false;
}

function onSortButtonHover() {
    this.style.background = 'black';
    this.style.color = 'orange';
}

function onSortButtonLeave() {
    if (this.getAttribute('selected') != 'true') {
        this.style.background = 'white';
        this.style.color = 'black';
    }
}

function rangeChange(value) {
    val = value;
    numbers = [];
    setup();
    redraw();
    document.getElementsByClassName("number-span")[0].textContent = 'Numbers to sort: ' + val;
}

function rangeChangeFPS(value) {
    fps = value;
    document.getElementsByClassName("number-span")[1].textContent = "FPS: " + fps;
}

document.addEventListener('DOMContentLoaded', () => {
    sortButtons = document.getElementsByClassName("sort-button");
    for (let i = 0; i < sortButtons.length - 1; i++) {
        const sortButton = sortButtons[i];
        sortButton.addEventListener('click', onSortButtonClick);
        sortButton.addEventListener('mouseover', onSortButtonHover);
        sortButton.addEventListener('mouseout', onSortButtonLeave);
        sortButton.setAttribute('selected', 'false');
    }

    sortButtons[sortButtons.length - 1].addEventListener('click', onStartButtonClick);
    sortButtons[sortButtons.length - 1].addEventListener('mouseover', onSortButtonHover);
    sortButtons[sortButtons.length - 1].addEventListener('mouseout', onSortButtonLeave);
    document.getElementsByClassName("number-span")[0].textContent = 'Numbers to sort: ' + val;
    document.getElementsByClassName("number-span")[1].textContent = 'FPS: ' + fps;
});