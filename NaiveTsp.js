/*
 * Class defining a naive travelling salesman problem solver.
 * This solver models this problem using the graph representation.
 * 
 * In the specfic it will make use of:
 * - an array of nodes
 * - a list containing the weights of the edges
 * - a starting node
 * 
 * notice: this solver makes the non restrictive assumption that
 * the graph is complete.
 * 
 * For more info on the travelling salesman problem
 * see: {@link https://en.wikipedia.org/wiki/Travelling_salesman_problem}
 * 
 */
class NaiveTsp {
  /*
   * The naive travelling salesman problem solver will be initialized given:
   *
   * @param { array } vtx - an array of strings listing the nodes, ex. ['A', 'B', 'C'].
   * @param { Object } edg - an object representing the weights of graph's edges, ex.
   * { AB: 12, AC: 5, BA: 12, BC: 2, CA: 5, CB: 2 }.
   * @param { string } start - the staring node, ex. 'A'.
   *
   */
  constructor(vtx, edg, start) {
    this.vtx = vtx.slice(0);
    this.edg = edg;
    this.start = start
  }

  /*
   * Calculates if a tour exists shorter then len.
   *
   * @param { int } len - the length of the tour.
   *
   */
  existsShorter(len) {
    // make sure the starting element is included twice to allow to close the loop
    this.vtx.push(this.start);

    // generate all permutations
    let permuts = [];
    this.getAllPossiblePermuts(this.vtx, permuts);

    // iterate permutations. A for loop is used here instead of forEach since we might need early exit
    for(let i = 0; i < permuts.length; i++) {
      let sum = 0;
      let el = permuts[i];
      for (let j = 0; j < el.length-1; j++) {
        let key = el[j] + el[j + 1];
        sum = sum + this.edg[key];
      }
      // return true only if path is shorter, starts and ends in the same node
      if (sum < parseInt(len)  && el[0] === el[el.length - 1]) {
        return {
          exists: true,
          path: el,
          length: sum
        };
      }
    }
    return {
      exists: false
    };
  }

  /*
   * Calculates the shortest possible path that visits each node and returns to the origin.
   *
   */
  shortestPath() {
    // make sure the starting element is included twice to allow to close the loop
    this.vtx.push(this.start);

    // generate all permutations
    let permuts = [];
    this.getAllPossiblePermuts(this.vtx, permuts);
    
    // iterate permutations and calculate path length
    let pathLength = Number.MAX_VALUE;
    let path = [];
    permuts.forEach(el => {
      let sum = 0;
      for (let i = 0; i < el.length-1; i++) {
        let key = el[i] + el[i + 1];
        sum = sum + this.edg[key];
      }
      // only update pathLength and path if it is shorter, starts and ends in the right node
      if (sum < pathLength && el[0] === this.start && el[el.length - 1] === this.start) {
        pathLength = sum;
        path = el;
      }
    });
    return {
      path: path,
      length: pathLength
    };
  }

  /*
   * Utility function calculating (sub)set's permutations.
   *
   * @param { array } array - the input array.
   * @param { integer } start - the starting element.
   * @param { array } result - the resultin array of permutations.
   *
   */
  getPermuts(array, start, result) {
    if (start >= array.length) {
      const arr = array.slice(0); 
      result.push(arr);
    } else {
      let i;
      for (i = start; i < array.length; ++i) {
        this.swap(array, start, i); 
        this.getPermuts(array, start + 1, result);  
        this.swap(array, start, i); 
      }
    }
  }
  
  /*
   * Utility function calculating all possible set's permutations.
   *
   * @param { array } array - the input array.
   * @param { array } result - the resultin array of permutations.
   *
   */
  getAllPossiblePermuts(array, result) {
    this.getPermuts(array, 0, result);
  }
  
  /*
   * Utility function swapping elements of an array.
   *
   * @param { array } array - the input array.
   * @param { integer } from - element from which to swap.
   * @param { integer } to - element where to swap.
   *
   */
  swap(array, from, to) {
    const tmp = array[from];
    array[from] = array[to];
    array[to] = tmp;
  }

}

exports.NaiveTsp = NaiveTsp;
