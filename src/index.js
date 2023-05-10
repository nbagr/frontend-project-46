import { readFileSync } from 'node:fs';
import path from 'node:path';
import _ from 'lodash';

const gendiff = (filePath1, filePath2) => {
  const path1 = path.resolve(process.cwd(), filePath1);
  const path2 = path.resolve(process.cwd(), filePath2);

  const file1 = readFileSync(path1, 'utf-8')
  const file2 = readFileSync(path2, 'utf-8')

  const data1 = JSON.parse(file1)
  const data2 = JSON.parse(file2)

  const keys = _.union(Object.keys(data1), Object.keys(data2)).sort()

  const result = ['{'];
  for (let key of keys) {
    if (Object.hasOwn(data1, key) && !Object.hasOwn(data2, key)) {
      result.push(`  - ${key}: ${data1[key]}`)
    } else if (!Object.hasOwn(data1, key) && Object.hasOwn(data2, key)) {
      result.push(`  + ${key}: ${data2[key]}`)
    } else if (Object.hasOwn(data1, key) && Object.hasOwn(data2, key)) {
      if (data1[key] === data2[key]){
        result.push(`    ${key}: ${data2[key]}`)
      } else if (data1[key] !== data2[key]){
        result.push(`  - ${key}: ${data1[key]}`)
        result.push(`  + ${key}: ${data2[key]}`)
      }
    }
  }
  result.push('}')
  return result.join('\n')
}

export default gendiff;
