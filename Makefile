SRC = $(shell find ./models -type f -name '*.js')
JS = $(SRC:src/%.js=lib/%.js)

all:
	echo $(@D)

SRC:
	echo $(JS)
	@mkdir wwwwww