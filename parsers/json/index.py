# JSON-parsing example written for canopy-boilerplate #
# =================================================== #
# repo: https://github.com/tapsaman/canopy-boilerplate.git
# auth: tapsaman
# date: 2018/05/19
# file: Defines Canopy-parsing logic for Python JSON-parser

import grammar
import sys		# for cli
import json		# for pretty printing results

# Test string to parse given via cli.
__cli_string = None
# Remove this to disable cli-usage.
if len( sys.argv ) > 1: __cli_string = sys.argv[1]

class CanopyActions:

	def make_object (self, input, start, end, elements):
		obj = {}

		if len( elements[2].elements ):
			firstObjectElement = elements[2].elements[0]

			obj[ firstObjectElement.key['value'] ] \
				= firstObjectElement.var['value']

		if len( elements[2].elements ) > 2:
			for element in elements[2].elements[2]:
				objectElement = element.elements[2]

				obj[ objectElement.key['value'] ] \
					= objectElement.var['value']

		return {
			'value': obj
		}

	def make_array (self, input, start, end, elements):
		array = []

		if len( elements[2].elements ):
			firstArrayElement = elements[2].elements[0]
			array.append( firstArrayElement['value'] )

		if len( elements[2].elements ) > 2:
			for element in elements[2].elements[2]:
				arrayElement = element.elements[2]
				array.append( arrayElement['value'] )

		return {
			'value': array
		}
 
	def make_string (self, input, start, end, elements):
		return {
			'value': elements[1].text,
			'text': input[start : end],
			'offset': start,
			'elements': elements
		}

	def make_number (self, input, start, end, elements):
		
		try:
			num = int( input[start : end] )
		except:
			num = float( input[start : end] )
		return {
			'value': num
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

	try:
		result = grammar.parse(stringToParse, actions=CanopyActions())

		if doLog:
			print(">>> Result")
			#print (result)
			print( json.dumps(result, indent=4, separators=(',', ': ')) )
	
	except Exception as e:
		print(">>> PARSE ERROR")
		print(str(e))

	return result


if __cli_string:
	Parser(__cli_string, True)