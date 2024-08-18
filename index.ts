const TILE_SIZE = 30;
const FPS = 30;
const SLEEP = 1000 / FPS;

interface FallingState {
    isFalling(): boolean;
    moveHorizontal(tile: Tile, dx: number): void;
}

class Falling implements FallingState {
    isFalling(): boolean {
        return true;
    }
    moveHorizontal(tile: Tile, dx: number): void {
    }
}

class Resting implements FallingState {
    isFalling(): boolean {
        return false
    }
    moveHorizontal(tile: Tile, dx: number): void {
        if (map[playery][playerx + dx + dx].isAir()
            && !map[playery + 1][playerx + dx].isAir()) {
            map[playery][playerx + dx + dx] = tile;
            moveToTile(playerx + dx, playery);
        }
    }
}

enum RawTile {
    AIR,
    FLUX,
    UNBREAKABLE,
    PLAYER,
    STONE, FALLING_STONE,
    BOX, FALLING_BOX,
    KEY1, LOCK1,
    KEY2, LOCK2
}

interface Tile {
    isAir(): boolean;
    isLock1(): boolean;
    isLock2(): boolean;
    color(g: CanvasRenderingContext2D): void;
    draw(y: number, x: number, g: CanvasRenderingContext2D): void;
    moveHorizontal(dx: number): void;
    moveVertical(dy: number): void;
    isBoxy(): boolean;
    isStony(): boolean;
    drop(): void;
    rest(): void;
    isFalling(): boolean;
}

class Air implements Tile {
    isFalling(): boolean {
        return false;
    }
    drop(): void {
    }
    rest(): void {
    }
    isStony(): boolean {
        return false;
    }
    isBoxy(): boolean {
        return false;
    }
    moveVertical(dy: number) {
        moveToTile(playerx, playery + dy);
    }
    moveHorizontal(dx: number) {
        moveToTile(playerx + dx, playery);
    }
    draw(y: number, x: number, g: CanvasRenderingContext2D) {
        this.color(g);
    }
    color(g: CanvasRenderingContext2D) {
    }
    isAir() {
        return true;
    }
    isLock1() {
        return false;
    }
    isLock2() {
        return false;
    }
}

class Flux implements Tile {
    isFalling(): boolean {
        return false;
    }
    drop(): void {
    }
    rest(): void {
    }
    isStony(): boolean {
        return false;
    }
    isBoxy(): boolean {
        return false;
    }
    moveVertical(dy: number) {
        moveToTile(playerx, playery + dy);
    }
    moveHorizontal(dx: number) {
        moveToTile(playerx + dx, playery);
    }
    draw(y: number, x: number, g: CanvasRenderingContext2D) {
        this.color(g);
        g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    }
    color(g: CanvasRenderingContext2D) {
        g.fillStyle = "#ccffcc";
    }
    isAir() {
        return false;
    }
    isLock1() {
        return false;
    }
    isLock2() {
        return false;
    }
}

class Unbreakable implements Tile {
    isFalling(): boolean {
        return false;
    }
    drop(): void {
    }
    rest(): void {
    }
    isStony(): boolean {
        return false;
    }
    isBoxy(): boolean {
        return false;
    }
    moveVertical(dy: number) {
    }
    moveHorizontal(dx: number) {
    }
    draw(y: number, x: number, g: CanvasRenderingContext2D) {
        this.color(g);
        g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    }
    color(g: CanvasRenderingContext2D) {
        g.fillStyle = "#999999";
    }
    isAir() {
        return false;
    }
    isLock1() {
        return false;
    }
    isLock2() {
        return false;
    }
}

class Player implements Tile {
    isFalling(): boolean {
        return false;
    }
    drop(): void {
    }
    rest(): void {
    }
    isStony(): boolean {
        return false;
    }
    isBoxy(): boolean {
        return false;
    }
    moveVertical(dy: number) {
    }
    moveHorizontal(dx: number) {
    }
    draw(y: number, x: number, g: CanvasRenderingContext2D) {
        this.color(g);
    }
    color(g: CanvasRenderingContext2D) {
    }
    isAir() {
        return false;
    }
    isLock1() {
        return false;
    }
    isLock2() {
        return false;
    }
}

class Stone implements Tile {
    constructor(private falling: FallingState) {
    }
    isFalling(): boolean {
        return this.falling.isFalling();
    }
    drop(): void {
        this.falling = new Falling();
    }
    rest(): void {
        this.falling = new Resting();
    }
    isStony(): boolean {
        return true;
    }
    isBoxy(): boolean {
        return false;
    }
    moveVertical(dy: number) {
    }
    moveHorizontal(dx: number) {
        this.falling.moveHorizontal(this, dx);
    }
    draw(y: number, x: number, g: CanvasRenderingContext2D) {
        this.color(g);
        g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    }
    color(g: CanvasRenderingContext2D) {
        g.fillStyle = "#0000cc";
    }
    isAir() {
        return false;
    }
    isLock1() {
        return false;
    }
    isLock2() {
        return false;
    }
}

class Box implements Tile {
    constructor(private falling: FallingState) {
    }
    isFalling(): boolean {
        return this.falling.isFalling();
    }
    drop(): void {
        this.falling = new Falling();
    }
    rest(): void {
        this.falling = new Resting();
    }
    isStony(): boolean {
        return false;
    }
    isBoxy(): boolean {
        return true;
    }
    moveVertical(dy: number) {
    }
    moveHorizontal(dx: number) {
        this.falling.moveHorizontal(this, dx);
    }
    draw(y: number, x: number, g: CanvasRenderingContext2D) {
        this.color(g);
        g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    }
    color(g: CanvasRenderingContext2D) {
        g.fillStyle = "#8b4513";
    }
    isAir() {
        return false;
    }
    isLock1() {
        return false;
    }
    isLock2() {
        return false;
    }
}

class Key1 implements Tile {
    isFalling(): boolean {
        return false;
    }
    drop(): void {
    }
    rest(): void {
    }
    isStony(): boolean {
        return false;
    }
    isBoxy(): boolean {
        return false;
    }
    moveVertical(dy: number) {
        removeLock1();
        moveToTile(playerx, playery + dy);
    }
    moveHorizontal(dx: number) {
        removeLock1();
        moveToTile(playerx + dx, playery);
    }
    draw(y: number, x: number, g: CanvasRenderingContext2D) {
        this.color(g);
        g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    }
    color(g: CanvasRenderingContext2D) {
        g.fillStyle = "#ffcc00";
    }
    isAir() {
        return false;
    }
    isLock1() {
        return false;
    }
    isLock2() {
        return false;
    }
}

class Lock1 implements Tile {
    isFalling(): boolean {
        return false;
    }
    drop(): void {
    }
    rest(): void {
    }
    isStony(): boolean {
        return false;
    }
    isBoxy(): boolean {
        return false;
    }
    moveVertical(dy: number) {
    }
    moveHorizontal(dx: number) {
    }
    draw(y: number, x: number, g: CanvasRenderingContext2D) {
        this.color(g);
        g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    }
    color(g: CanvasRenderingContext2D) {
        g.fillStyle = "#ffcc00";
    }
    isAir() {
        return false;
    }
    isLock1() {
        return true;
    }
    isLock2() {
        return false;
    }
}

class Key2 implements Tile {
    isFalling(): boolean {
        return false;
    }
    drop(): void {
    }
    rest(): void {
    }
    isStony(): boolean {
        return false;
    }
    isBoxy(): boolean {
        return false;
    }
    moveVertical(dy: number) {
        removeLock2();
        moveToTile(playerx, playery + dy);
    }
    moveHorizontal(dx: number) {
        removeLock2()
        moveToTile(playerx + dx, playery);
    }
    draw(y: number, x: number, g: CanvasRenderingContext2D) {
        this.color(g);
        g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    }
    color(g: CanvasRenderingContext2D) {
        g.fillStyle = "#00ccff";
    }
    isAir() {
        return false;
    }
    isLock1() {
        return false;
    }
    isLock2() {
        return false;
    }
}

class Lock2 implements Tile {
    isFalling(): boolean {
        return false;
    }
    drop(): void {
    }
    rest(): void {
    }
    isStony(): boolean {
        return false;
    }
    isBoxy(): boolean {
        return false;
    }
    moveVertical(dy: number) {
    }
    moveHorizontal(dx: number) {
    }
    draw(y: number, x: number, g: CanvasRenderingContext2D) {
        this.color(g);
        g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    }
    color(g: CanvasRenderingContext2D) {
        g.fillStyle = "#00ccff";
    }
    isAir() {
        return false;
    }
    isLock1() {
        return false;
    }
    isLock2() {
        return true;
    }
}

interface Input {
    handle(): void;
}

class Right implements Input {
    handle() {
        map[playery][playerx + 1].moveHorizontal(1);
    }
}

class Left implements Input {
    handle() {
        map[playery][playerx - 1].moveHorizontal(-1);
    }
}

class Up implements Input {
    handle() {
        map[playery - 1][playerx].moveVertical(-1);
    }
}

class Down implements Input {
    handle() {
        map[playery + 1][playerx].moveVertical(1);
    }
}


let playerx = 1;
let playery = 1;
let rawMap: RawTile[][] = [
    [2, 2, 2, 2, 2, 2, 2, 2],
    [2, 3, 0, 1, 1, 2, 0, 2],
    [2, 4, 2, 6, 1, 2, 0, 2],
    [2, 8, 4, 1, 1, 2, 0, 2],
    [2, 4, 1, 1, 1, 9, 0, 2],
    [2, 2, 2, 2, 2, 2, 2, 2],
];

let map: Tile[][];

function assertExhausted(x: never): never {
    throw new Error("Unexpected object: " + x);
}

function transformTile(tile: RawTile) {
    switch (tile) {
        case RawTile.AIR:
            return new Air();
        case RawTile.PLAYER:
            return new Player();
        case RawTile.UNBREAKABLE:
            return new Unbreakable();
        case RawTile.STONE:
            return new Stone(new Resting());
        case RawTile.FALLING_STONE:
            return new Stone(new Falling());
        case RawTile.BOX:
            return new Box(new Resting());
        case RawTile.FALLING_BOX:
            return new Box(new Falling());
        case RawTile.FLUX:
            return new Flux();
        case RawTile.KEY1:
            return new Key1();
        case RawTile.LOCK1:
            return new Lock1();
        case RawTile.KEY2:
            return new Key2();
        case RawTile.LOCK2:
            return new Lock2();
        default:
            assertExhausted(tile);
    }
}

function transformMap() {
    map = new Array(rawMap.length);
    for (let y = 0; y < rawMap.length; y++) {
        map[y] = new Array(rawMap[y].length);
        for (let x = 0; x < rawMap[y].length; x++) {
            map[y][x] = transformTile(rawMap[y][x]);
        }
    }
}

let inputs: Input[] = [];

function removeLock1() {
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x].isLock1()) {
                map[y][x] = new Air();
            }
        }
    }
}

function removeLock2() {
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x].isLock2()) {
                map[y][x] = new Air();
            }
        }
    }
}

function moveToTile(newx: number, newy: number) {
    map[playery][playerx] = new Air();
    map[newy][newx] = new Player();
    playerx = newx;
    playery = newy;
}

function handleInputs() {
    while (inputs.length > 0) {
        let input = inputs.pop();
        input.handle();
    }
}

function updateTile(y: number, x: number) {
    if (map[y][x].isStony()
        && map[y + 1][x].isAir()) {
        map[y + 1][x] = new Stone(new Falling());
        map[y][x] = new Air();
    } else if (map[y][x].isBoxy()
        && map[y + 1][x].isAir()) {
        map[y + 1][x] = new Box(new Falling());
        map[y][x] = new Air();
    } else if (map[y][x].isFalling()) {
        map[y][x].rest();
    }
}

function updateMap() {
    for (let y = map.length - 1; y >= 0; y--) {
        for (let x = 0; x < map[y].length; x++) {
            updateTile(y, x);
        }
    }
}

function update() {
    handleInputs();
    updateMap();
}

function drawMap(g: CanvasRenderingContext2D) {
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            map[y][x].draw(y, x, g);
        }
    }
}

function drawPlayer(g: CanvasRenderingContext2D) {
    g.fillStyle = "#ff0000";
    g.fillRect(playerx * TILE_SIZE, playery * TILE_SIZE, TILE_SIZE, TILE_SIZE);
}

function createGraphics() {
    let canvas = document.getElementById("GameCanvas") as HTMLCanvasElement;
    let g = canvas.getContext("2d");
    g.clearRect(0, 0, canvas.width, canvas.height);
    return g;
}

function draw() {
    let g = createGraphics();
    drawMap(g);
    drawPlayer(g);
}

function gameLoop() {
    let before = Date.now();
    update();
    draw();
    let after = Date.now();
    let frameTime = after - before;
    let sleep = SLEEP - frameTime;
    setTimeout(() => gameLoop(), sleep);
}

window.onload = () => {
    transformMap();
    gameLoop();
}

const LEFT_KEY = "ArrowLeft";
const UP_KEY = "ArrowUp";
const RIGHT_KEY = "ArrowRight";
const DOWN_KEY = "ArrowDown";
window.addEventListener("keydown", e => {
    if (e.key === LEFT_KEY || e.key === "a") inputs.push(new Left());
    else if (e.key === UP_KEY || e.key === "w") inputs.push(new Up());
    else if (e.key === RIGHT_KEY || e.key === "d") inputs.push(new Right());
    else if (e.key === DOWN_KEY || e.key === "s") inputs.push(new Down());
});

