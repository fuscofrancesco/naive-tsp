const NaiveTsp = require ('./NaiveTsp').NaiveTsp;
const repl = require('repl');

const replServer = repl.start({ prompt: '> ' });

const v = ['A', 'B', 'C', 'D'];

/*
 * The below is the representation of this graph:
 *
 *          10               15
 *    +-------------+ A +-------------+
 *    |               +               |
 *    |               |               |
 *    |               |20             |
 *    |               |               |
 *    |               |               |
 *    +     25        +      30       +
 *    B +-----------+ D +-----------+ C
 *    +                               +
 *    |                               |
 *    |                               |
 *    +-------------------------------+
 *                   35
 *
 */
const e = {
  AB: 10,
  AC: 15,
  AD: 20,
  BA: 10,
  BC: 35,
  BD: 25,
  CA: 15,
  CB: 35,
  CD: 30,
  DA: 20,
  DB: 25,
  DC: 30
};

replServer.defineCommand('tsp', {
  help: 'try typing: .tsp <start>, where <start> in { A, B, C, D } representing the initial node.',
  action(start) {
    this.clearBufferedCommand();
    console.log(new NaiveTsp(v, e, start).shortestPath());
    this.displayPrompt();
  }
});

replServer.defineCommand('dectsp', {
  help: 'try typing: .dectsp <length>, where <length> represents the length of the tour.',
  action(len) {
    this.clearBufferedCommand();
    console.log(new NaiveTsp(v, e, 'A').existsShorter(len));
    this.displayPrompt();
  }
});

replServer.on('exit', () => {
  console.log('exiting program...');
  process.exit();
});
