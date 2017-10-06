import _ from 'lodash';

/**
 * @param a affect statistical properties
 * @param r0 affect statistical properties
 * @param m affects statistical properties repeat period
 */
export default class Generator {
  constructor({a, r0, m}, size = 1000000, numOfIntervals = 20) {
    this.numOfIntervals = numOfIntervals;
    this.size = size;

    this.a = a;
    const maxR0 = Math.pow(2, this.size) - 1;
    this.r0 = r0 > maxR0 ? maxR0 : r0;
    this.m = m;

    this.list = [];
    this.entries = [];
    this.labels = [];
  }

  generateList() {
    for (let i = 0, prev = this.r0; i < this.size; i++) {
      prev = (this.a * prev) % this.m;
      this.list.push(prev / this.m);
    }
  }

  spliceList() {
    const min = _.min(this.list);
    const max = _.max(this.list);
    const delta = (max - min) / this.numOfIntervals;
    let leftBorder = min;
    let rightBorder = min + delta;

    for (let i = 0; i < this.numOfIntervals; i++, leftBorder += delta, rightBorder += delta) {
      this.labels.push(leftBorder.toFixed(2) + ' - ' + rightBorder.toFixed(2));
      this.entries.push(this.list.filter(item => item >= leftBorder && item < rightBorder).length);
    }

    this.entries[this.numOfIntervals - 1] += this.list.reduce(item => item === max ? 1 : 0, 0);
  }

  getExpectation(precision = 9) {
    return (_.sum(this.list) / this.size).toFixed(precision);
  }

  getDispersion(precision = 9) {
    const expectation = this.getExpectation();

    return (this.list.reduce((sum, item) => sum + Math.pow(item, 2) - Math.pow(expectation, 2), 0) /(this.size - 1)).toFixed(precision);
  }

  getSKO(precision = 9) {
    const expectation = this.getExpectation();

    return (this.list.reduce((sum, item) => sum + Math.pow(item - expectation, 2), 0) /(this.size - 1)).toFixed(precision);
  }

  getUniformity(precision = 9) {
    let pairsCount = _.chunk(this.list, 2).filter(pair => (Math.pow(pair[0], 2) + Math.pow(pair[1], 2)) < 1).length;

    return (2 * pairsCount / this.size).toFixed(precision);
  }

  getStandartUniformity(precision = 9) {
    return (Math.PI / 4).toFixed(precision);
  }

  getPeriod() {
    const lastItem = this.list[this.size - 1];

    const firstIndex = this.list.indexOf(lastItem);
    const secondIndex = ~firstIndex ? this.list.indexOf(lastItem, firstIndex + 1) : -1;

    return ~firstIndex && ~secondIndex ? secondIndex - firstIndex : 0;
  }

  getAperiod() {
    const period = this.getPeriod();

    for (let i = 0; i < this.list.length - period; i++) {
      if (this.list[i] === this.list[i + period]) {
        return i + period;
      }
    }

    return 0;
  }
}
