'use strict'


var gNums = createArray(16);
var gCount = 1;
var gTimerCount = 0;
var gIntreval;
var gLevel = 16;

function init() {
    renderBoard(gNums);
}

function levelDifficulty(num) {
    var elTimer = document.querySelector('.timer');
    elTimer.style.display = 'none'
    var elReset = document.querySelector('.restart');
    elReset.style.display = 'none'
    gCount = 1;
    gTimerCount = 0
    gLevel = num;
    gNums = createArray(num)
    renderBoard(gNums);
}


function stopTimer() {
    var elTimer = document.querySelector('.timer');
    clearInterval(gIntreval);
    elTimer.innerText = `congratulations!!
    you won in ${elTimer.innerText} seconds`
}

function runTimer(elTimer) {
    gIntreval = setInterval(function () {
        gTimerCount += 0.001
        elTimer.innerText = gTimerCount.toFixed(3);
    }, 1);
}

function showTimer() {
    var elTimer = document.querySelector('.timer');
    elTimer.style.display = 'block';
    runTimer(elTimer)
}

function cellClicked(elCell) {
    if (gCount === +elCell.innerText) {
        if (gCount === 1) showTimer();
        if (gCount === gLevel) {
            stopTimer();
            var elReset = document.querySelector('.restart');
            elReset.style.display = 'block'
        }
        gCount++
        elCell.className = 'clicked'
    }
}

function renderBoard(nums) {
    const ROWLENGTH = Math.sqrt(nums.length);
    var strHtml = '';
    for (var i = 0; i < ROWLENGTH; i++) {
        strHtml += '<tr>'
        for (var j = 0; j < ROWLENGTH; j++) {
            var className = '';
            strHtml += `<td class="cell" onclick="cellClicked(this)" class="${className}">${gNums.pop()}</td>`;
        }
        strHtml += '</tr>'
    }
    var elTable = document.querySelector('.board');
    elTable.innerHTML = strHtml;
}

function createArray(length) {
    if (Number.isInteger(Math.sqrt(length))) {
        var nums = [];
        for (var i = 0; i < length; i++) {
            nums.push(i + 1)
        }
        shuffle(nums);
        return nums;
    }
}

function shuffle(items) {
    var randIdx, keep, i;
    for (i = items.length - 1; i > 0; i--) {
        randIdx = getRandomInt(0, items.length - 1);

        keep = items[i];
        items[i] = items[randIdx];
        items[randIdx] = keep;
    }
    return items;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}