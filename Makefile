K6_VERSION ?= "v0.39.0"

MAKEFLAGS += --silent

all: clean format test build integrations

## help: Prints a list of available build targets.
help:
	echo "Usage: make <OPTIONS> ... <TARGETS>"
	echo ""
	echo "Available targets are:"
	echo ''
	sed -n 's/^##//p' ${PWD}/Makefile | column -t -s ':' | sed -e 's/^/ /'
	echo
	echo "Targets run by default are: `sed -n 's/^all: //p' ./Makefile | sed -e 's/ /, /g' | sed -e 's/\(.*\), /\1, and /'`"

## clean: Removes any previously created build artifacts.
clean:
	rm -f ./k6

prep:
	go install go.k6.io/xk6/cmd/xk6@latest

## build: Builds a custom 'k6' with the local extension. 
build:
	xk6 build ${K6_VERSION} --with $(shell go list -m)=.

## format: Applies Go formatting to code.
format:
	go fmt ./...

## test: Executes any unit tests.
test:
	go test -cover -race

integrations:
	ENV_STRING=value ENV_NUM=22 ENV_FLOAT=3.41 ./k6 run -e VAR_STRING=string -e VAR_NUM=33 -e VAR_FLOAT=2.5 --no-color --no-usage-report test.js

.PHONY: build clean format help test
