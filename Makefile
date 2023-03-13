# -----------------------------------------------------------------------------
#                    			Sample Project
# -----------------------------------------------------------------------------

# executables
NPM = $(shell which npm)
ESLINT  = ./node_modules/.bin/eslint
GIT = $(shell which git)


BUILD_DIR = dist

# development
LINT_DIRS = src/
LINT_EXTENSIONS = .js

all: start  

.PHONY: build
build:
	$(NPM) run build

.PHONY: lint
lint:
	$(ESLINT) --color --ext $(LINT_EXTENSIONS) $(LINT_DIRS)

.PHONY: lint-fix
lint-fix:
	$(ESLINT) --color --ext $(LINT_EXTENSIONS) --fix $(LINT_FILES) $(LINT_DIRS)

.PHONY: start
start:
	$(NPM) start

.PHONY: dep
dep:
	$(NPM) install

.PHONY: clean
clean:
	rm -rf $(BUILD_DIR)