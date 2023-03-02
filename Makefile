install:
	npm ci

gendiff:
	node/gendiff.js

publish:
	npm publish --dry-run