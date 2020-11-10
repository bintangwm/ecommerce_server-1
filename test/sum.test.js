const { test, expect } = require('@jest/globals');
const sum = require('../helpers/sum');

// test('adds 1 + 2 to equal 3', () => {
//   expect(sum(1, 2)).toBe(3);
// });

// test('object assignment', () => {
//   const data = {one: 1};
//   data['two'] = 2;
//   expect(data).not.toEqual({one: 1, two: 2});
// });

test('is Nan', () => {
  const i = '3s'
  expect(+i).toBeNaN()
})