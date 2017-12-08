test:
	@NODE_ENV=test mocha \
		--harmony \
		--reporter spec \
		--timeout=10000 \
		./test/*.spec.js

.PHONY: lint test