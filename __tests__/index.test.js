import path from 'node:path';
import resultStylish from '../__fixtures__/result';
import resultPlain from '../__fixtures__/resultPlain.js';
import resultJSON from '../__fixtures__/resultJSON.js';
import gendiff from '../src/index.js';

const testList = [
  'yml',
  'json',
];

const resolvePath = (filePath) => path.resolve(process.cwd(), `__fixtures__/${filePath}`);

describe('gendiff', () => {
  test.each(testList)('gendiff %s', (format) => {
    const filepath1 = resolvePath(`file1.${format}`);
    const filepath2 = resolvePath(`file2.${format}`);

    expect(gendiff(filepath1, filepath2)).toEqual(resultStylish);
    expect(gendiff(filepath1, filepath2, 'stylish')).toEqual(resultStylish);
    expect(gendiff(filepath1, filepath2, 'plain')).toEqual(resultPlain);
    expect(gendiff(filepath1, filepath2, 'json')).toEqual(resultJSON);
  });
});
