# Variables
PNPM = pnpm

# Targets
prepare:
	$(PNPM) install

dev: prepare
	$(PNPM) run dev

build: prepare
	$(PNPM) run build

serve: prepare
	$(PNPM) run preview

lint: prepare
	$(PNPM) run lint

test: prepare
	$(PNPM) run test

clean:
	rm -rf node_modules dist

.PHONY: prepare dev build serve lint test clean
