import sys
import grammar

# Test string to parse given via cli.
__cli_string = None
# Remove this to disable cli-usage.
if len( sys.argv ) > 1: __cli_string = sys.argv[1]

class CanopyActions:

	def make_object (self, input, start, end, elements):
		obj = {}

		if elements[2].elements[0]:
			firstObjectElement = elements[2].elements[0]

			obj[ firstObjectElement['key']['value'] ] \
				= firstObjectElement['var']['value']

		if elements[2].elements[2]:
			for element in elements[2].elements[2]:
				objectElement = element.elements[2]

				obj[ objectElement['key']['value'] ] \
					= objectElement['var']['value']

		return {
			'value': obj
		}

	def make_string (self, input, start, end, elements):
		return {
			'value': elements[1].text,
			'text': input[start : end],
			'offset': start,
			'elements': elements
		}

	# Included for reference;
	# This is the form of Treenode-objects that Canopy creates
	def make_default (self, input, start, end, elements):
		return {
			'text': input[start : end],
			'offset': start,
			'elements': elements
		}


def Parser (stringToParse, doLog):

	result = None

	if doLog:
		print(">>> Parsing")
		print(stringToParse)

	result = grammar.parse(stringToParse, actions=CanopyActions())


	print (result)

	return result


if __cli_string:
	Parser(__cli_string, True)



