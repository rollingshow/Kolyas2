var done = 0;
var picture = "https://sun9-51.userapi.com/c204524/v204524368/1974/GIIiot2uoiw.jpg";

function getCoords(elem) {
    let box = elem.getBoundingClientRect();
    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    };
}

function startgame() {
    let index = 0;
    let over = document.querySelector("#over");
    let board = document.querySelector("#board");
    board.style.width = 50 * 9;

    for (let r = 0; r < 6; r++) {
        let tr = '<tr class="row" data-row="' + r + '"></tr>';
        board.insertAdjacentHTML('beforeend', tr);

        for (let c = 0; c < 9; c++) {
            index = c + (r * 9);

            let td = '<td class="tile" data-id="' + index + '"></td>';

            let ar = document.querySelector('tr[data-row="' + r + '"]');
            ar.insertAdjacentHTML('beforeend', td);

            let ac = document.querySelector('td[data-id="' + index + '"]');

            let block = '<div class="block" style="background-position: ' + c * -50 + "px " + r * -50 + 'px" data-id="' + index + '"></div>';
            over.insertAdjacentHTML('beforeend', block);

            let ab = over.querySelector('div[data-id="' + index + '"]');
            ab.style.backgroundImage = 'url("' + picture + '")';
            ab.addEventListener("mousedown", down);
            ab.style.left = Math.random() * (document.documentElement.clientWidth / 2 - 50) + "px";
            ab.style.top = Math.random() * (document.documentElement.clientHeight - 50) + "px";
            ab.dataset.left = getCoords(ab).left;
            ab.dataset.top = getCoords(ab).top;
        }
    }
}

function isCollide(orig, tile) {
    let b = getCoords(tile);
    let a = getCoords(orig);
    return !(
        ((a.top + 50) < (b.top)) ||
        (a.top > (b.top + 50)) ||
        ((a.left + 50) < b.left) ||
        (a.left > (b.left + 50))
    );
}

function down(e) {
    cell = e.target;
    if (cell.classList.contains("complete")) {
        return;
    }
    let coords = getCoords(cell);
    let shiftX = e.pageX - coords.left;
    let shiftY = e.pageY - coords.top;

    cell.style.position = 'absolute';
    moveAt(e);

    cell.style.zIndex = 1000;

    function moveAt(e) {
        cell.style.left = (e.pageX - shiftX) + 'px';
        cell.style.top = (e.pageY - shiftY) + 'px';
    }

    document.onmousemove = function(e) {
        moveAt(e);
    };

    cell.onmouseup = function() {
        document.onmousemove = null;
        cell.onmouseup = null;
        cell.style.zIndex = 500;
        field = document.querySelector("td[data-id='" + cell.dataset.id + "']");
        if (isCollide(cell, field)) {
            let temp = getCoords(field);
            cell.style.left = temp.left + "px";
            cell.style.top = temp.top + "px";
            cell.classList.add("complete");
            done++;
            if (done===54) alert("You win!");
        } else {
            if (!isCollide(cell, document.querySelector("#pieces"))) {
                cell.style.left = cell.dataset.left + "px";
                cell.style.top = cell.dataset.top + "px";
            }
        }

    };

    cell.ondragstart = function() {
        return false;
    };

}

startgame();