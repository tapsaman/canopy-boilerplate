var GrammarParser = require('./grammar.js');

module.exports = Parser

const _stringToParse = process.argv[2]

var canopyActions = {
	make_object: function (input, start, end, elements) {
		var object = {}

		var firstKeyVarPair = elements[1].elements[0]
		if ( firstKeyVarPair )
			object[ firstKeyVarPair.key.value ]
				= firstKeyVarPair.var.value

		elements[1].elements[1].elements.forEach(function(element, i) {
			var objectElement = element.elements[2]
			object[ objectElement.key.value ] = objectElement.var.value
		})

		return { 
			value: object
		}
	},
	make_array: function (input, start, end, elements) {
		var array = []

		var firstArrayElement = elements[1].elements[0]
		if ( firstArrayElement )
			array[0] = firstArrayElement.value

		elements[1].elements[1].elements.forEach(function(element, i) {
			var arrayElement = element.elements[2]
			array.push( arrayElement.value )
		})

		return { 
			value: array
		}
	},
	make_string: function (input, start, end, elements) {
		return {
			value: elements[1].text,
			text: input.slice(start, end),
			offset: start,
			elements: elements
		}
	},
	make_number: function (input, start, end, elements) {
		return {
			value: Number(input.slice(start, end))
		}
	},
	// Included for reference;
	// This is the form of Treenode-objects that Canopy creates
	make_default: function (input, start, end, elements) {
		return {
			text: input.slice(start, end),
			offset: start,
			elements: elements
		}
	}
}

if (_stringToParse) {
	Parser(_stringToParse)
}

function combineElements(treenode)
{
	if (typeof treenode === "string")
		return treenode
	if (treenode.elements.length === 0)
		return treenode.text

	var str = ""
	for (var i=0; i < treenode.elements.length; i++)
	{
		str += combineElements(treenode.elements[i])
	}
	return str;
}

function Parser(stringToParse) {

	var result = null

	console.log(">>> Parsing")
	console.log(stringToParse)

	try {
		console.log("asdasdA")
		console.log(canopyActions.make_array)
		result = GrammarParser.parse(stringToParse, {actions: canopyActions});
		console.log( ">>> Result" )
		console.log( result )

		console.log( JSON.stringify(result, null, 4) )


	}
	catch(err)
	{
		console.error( err )
	}

	return result
}

function ParserClass(stringToParse) {

	var result = null

	console.log(">>> Parsing")
	console.log(stringToParse)

	try {
		result = GrammarParser.parse(stringToParse, {actions: canopyActions});
		console.log( ">>> Result" )
		console.log( result )
	}
	catch(err)
	{
		console.error( err )
	}

	return result
}