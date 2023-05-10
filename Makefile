install:
	npm ci

gendiff:
	node/gendiff.js

publish:
	npm publish --dry-run

run:
	node bin/gendiff file1.json file2.json

test:
	npm test

test-coverage:
	npm test --coverage --coverageProviderv8

lint:
	npx eslint .
