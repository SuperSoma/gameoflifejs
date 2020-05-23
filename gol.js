const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let globalMap = [];
const blockSize = 10;
const mapWidth = Math.floor(canvas.width/blockSize), mapHeight = Math.floor(canvas.height/blockSize);

for (let i =0; i < mapWidth * mapHeight; i++) {
    globalMap.push(getRandomInt(5) == 0);
}

update();

function update() {
    //clone map to base proper map updates off of
    const clone = globalMap.slice(0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let x=0;x < mapWidth;x++) {
        for(let y=0;y < mapHeight;y++) {
            const alive = checkAliveNeighbors(x,y,clone);
            const ind = (y * mapHeight) + x;
            
            if (globalMap[ind] == 1) {
                globalMap[ind] = (alive == 2 || alive == 3);
            } else {
                globalMap[ind] = (alive == 3);
            }
            
            if(globalMap[ind]) 
                ctx.fillRect(x*blockSize,y*blockSize,blockSize,blockSize);
        }
    }
    //ctx.fillRect(0,0,blockSize,blockSize);

    //ctx.fill();

    setTimeout(update, 1000 / 10);
} 

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function validPosition(x,y) {
    return (x >= 0 && x < mapWidth && y >= 0 && y < mapHeight);
}

function checkAliveNeighbors(x, y, map) {
    let alive = 0;
    for (let i=x-1;i <= x+1; i++) {
        for(let j=y-1;j <= y+1; j++) {
            if(validPosition(i, j) && !(i==x && j == y)) {
                alive += map[j * mapWidth + i];
            }
        }
    }

    return alive;
}