import {resetPath} from './Grid'
import {cellSize} from './Cell'

export function readFile(e) {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    if(file.type.includes("image")) {
        const img = new Image();
        const url = window.URL || window.webkitURL;
        const src = url.createObjectURL(file);
        img.src = src;
        img.onload = () => {
            draw(img);
        };
    } else {
        const reader = new FileReader();
        reader.onload = (e) => {
            const contents = e.target.result;
            displayContents(contents);
        };
        reader.onerror = (evt) => {
            alert(evt.target.error.name);
        };
        reader.readAsText(file);
    }
}
  
function displayContents(contents) {
    resetPath();
    const lines = contents.split('\n');
    for(let i = 0; i < lines.length; i++){
        const currLine = lines[i].split('');
        for(let j = 0; j < currLine.length; j++) {
            if(currLine[j] == '1'){
                grid[i][j].obstacle = true;
                grid[i][j].el.style.backgroundColor = '#808080';
                grid[i][j].el.style.border = "0";
            }
        }
    }
}

function draw(img) {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    canvas.display = 'none';
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    img.style.display = 'none';
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const h = imageData.height;  
    const w = imageData.width;
    let arrayLine = [];
    let arrayMatrix = [];
    let delimiter = 0;
    for(let i = 0; i < data.length; i += 4) {
        arrayLine.push({"r" : data[i], "g" : data[i + 1], "b" : data[i + 2], "a" : data[i + 3]});
        delimiter++;
        if(delimiter == w) {
            arrayMatrix.push(arrayLine);
            arrayLine = [];
            delimiter = 0;
        }
    }
    // console.log(arrayMatrix);
    let filteredImage = "";
    for(let i = 0; i < h - cellSize + 1; i += cellSize) {
        for(let j = 0; j < w - cellSize +1; j += cellSize) {
            let filter = 0;
            for(let n = i; n < i + cellSize; n++) {
                for(let m = j; m < j + cellSize; m++) {
                    if(arrayMatrix[n][m].r / 255 <= 0.3 && arrayMatrix[n][m].g / 255 <= 0.3 && arrayMatrix[n][m].b / 255 <= 0.3) {
                        filter++;
                    }
                }
            }
            if(filter >= cellSize**2/2) {
                filteredImage += '1'
            } else filteredImage += '0'
        }
        filteredImage += '\n';
    }
    displayContents(filteredImage);
}


export function saveGrid() {
    let textToSave = "";
    for(let i = 0; i < h; i++) {
        for(let j = 0; j < w; j++) {
            if(grid[i][j].obstacle == true) textToSave += "1";
            else textToSave += "0";
        }
        textToSave += "\r\n";
    }
    const textToSaveAsBlob = new Blob([textToSave], {type:"text/plain"});
    const textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
    const fileNameToSaveAs = "savedGrid";
    const downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.href = textToSaveAsURL;
    downloadLink.onclick = destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
} 

function destroyClickedElement(event) {
    document.body.removeChild(event.target);
}

