# Variables
PNPM = pnpm

# Targets
prepare:
	$(PNPM) install

dev:
	$(PNPM) run dev

build:
	$(PNPM) run build

serve:
	$(PNPM) run preview

lint:
	$(PNPM) run lint

test:
	$(PNPM) run test

clean:
	rm -rf node_modules dist

.PHONY: prepare dev build serve lint test clean
