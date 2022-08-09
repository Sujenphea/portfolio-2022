.PHONY: run
run:
	npm run dev

.PHONY: lint
lint:
	npm run lint

.PHONY: export
export:
	npx next build && npx next export