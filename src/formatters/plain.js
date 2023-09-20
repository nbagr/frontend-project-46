import _ from 'lodash';

const getPath = (nodeNames) => nodeNames.flat().join('.');

const getFormattedValue = (value) => {
  switch (typeof value) {
    case 'object': {
      return !value ? 'null' : '[complex value]';
    }
    case 'string': {
      return `'${value}'`;
    }
    default: {
      return `${value}`;
    }
  }
};

export function makePlainDiff(tree) {
  const iter = (node, path) => node.map((child) => {
    const currentPath = getPath([path, child.key]);
    switch (child.type) {
      case 'nested': {
        return iter(child.children, currentPath);
      }
      case 'added': {
        return `Property '${currentPath}' was added with value: ${getFormattedValue(child.value)}`;
      }
      case 'removed': {
        return `Property '${currentPath}' was removed`;
      }
      case 'changed': {
        return `Property '${currentPath}' was updated. From ${getFormattedValue(child.oldValue)} to ${getFormattedValue(child.newValue)}`;
      }
      case 'unchanged': {
        return null;
      }
      default: {
        throw Error('Uncorrect data');
      }
    }
  });
  return iter(tree.children, []);
}

export default function makePlain(data) {
  const result = makePlainDiff(data);
  return _.flattenDeep(result).filter((el) => el).join('\n');
}
