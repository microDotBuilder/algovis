class Node {
  x: number;
  y: number;
  isVisited: boolean;
  isWall: boolean;
  isStart: boolean;
  isEnd: boolean;
  distance: number;
  previous: Node | null;
  neighbors: Node[];
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.isVisited = false;
    this.isWall = false;
    this.isStart = false;
    this.isEnd = false;
    this.distance = Infinity;
    this.previous = null;
    this.neighbors = [];
  }

  setIsWall(isWall: boolean) {
    this.isWall = isWall;
  }

  setIsStart(isStart: boolean) {
    this.isStart = isStart;
  }

  setIsEnd(isEnd: boolean) {
    this.isEnd = isEnd;
  }

  setDistance(distance: number) {
    this.distance = distance;
  }

  setPrevious(previous: Node | null) {
    this.previous = previous;
  }

  setIsVisited(isVisited: boolean) {
    this.isVisited = isVisited;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  getIsVisited() {
    return this.isVisited;
  }

  getIsWall() {
    return this.isWall;
  }

  getIsStart() {
    return this.isStart;
  }

  getIsEnd() {
    return this.isEnd;
  }

  getDistance() {
    return this.distance;
  }

  getPrevious() {
    return this.previous;
  }

  getNeighbors() {
    return this.neighbors;
  }

  setNeighbors(neighbors: Node[]) {
    this.neighbors = neighbors;
  }
}
export default Node;
