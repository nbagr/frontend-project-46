import path from 'node:path';
import parser from './parsers.js';
import buildAST from './buildAST.js';
import formatter from './formatters/index.js';

const resolvePath = (filePath) => (filePath.includes('__fixtures__')
  ? path.resolve(process.cwd(), filePath)
  : path.resolve(process.cwd(), `__fixtures__/${filePath}`));

const gendiff = (filePath1, filePath2, format = 'stylish') => {
  const path1 = resolvePath(filePath1);
  const path2 = resolvePath(filePath2);

  const data1 = parser(path1);
  const data2 = parser(path2);

  return formatter(buildAST(data1, data2), format);
};

export default gendiff;
