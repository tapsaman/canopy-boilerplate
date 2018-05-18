var GrammarParser = require('./grammar.js');

module.exports = Parser

const _stringToParse = process.argv[2]

var canopyActions = {
	make_object: function (input, start, end, elements) {
		var object = {}

		//console.log( elements[1].elements )

		var firstKeyVarPair = elements[1].elements[0]
		if ( firstKeyVarPair )
			object[ firstKeyVarPair.key.value || firstKeyVarPair.key.text ]
				= firstKeyVarPair.var.value || firstKeyVarPair.var.text

		elements[1].elements[1].elements.forEach(function(element, i) {
			console.log("åååå", element)
			var objectElement = element.elements[2]
			object[ objectElement.key.value || objectElement.key.text ]
				= objectElement.var.value || objectElement.var.text
		})

		return { 
			value: object
		}
	},
	make_array: function (input, start, end, elements) {
		var array = []

		var firstArrayElement = elements[1].elements[0]
		if ( firstArrayElement )
			array[0] = firstArrayElement.value || firstArrayElement.text

		elements[1].elements[1].elements.forEach(function(element, i) {
			var arrayElement = element.elements[2]
			array.push( arrayElement.value || arrayElement.text )
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