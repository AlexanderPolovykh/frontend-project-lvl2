install: install-deps

install-deps:
	npm ci
	npm link
	npm link @hexlet/code

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

lint:
	npx eslint .
	
.PHONY: test
