test:
	@NODE_ENV=test mocha \
		--harmony \
		--reporter spec \
		./test/*.spec.js

.PHONY: lint test