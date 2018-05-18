"use strict";

var Grammar = require('./grammar.js');
//import Grammar from './grammar.js'

module.exports = Parser;

// Test string to parse given via cli.
// Remove this to disable cli-usage.
var __cli_string = process.argv[2];

var canopyActions = {
	make_object: function make_object(input, start, end, elements) {
		var object = {};

		var firstObjectElement = elements[2].elements[0];

		if (firstObjectElement) object[firstObjectElement.key.value] = firstObjectElement.var.value;

		if (elements[2].elements[2]) elements[2].elements[2].elements.forEach(function (element, i) {
			var objectElement = element.elements[2];
			object[objectElement.key.value] = objectElement.var.value;
		});

		return {
			value: object
		};
	},
	make_array: function make_array(input, start, end, elements) {
		var array = [];

		var firstArrayElement = elements[2].elements[0];
		if (firstArrayElement) array[0] = firstArrayElement.value;

		elements[2].elements[2].elements.forEach(function (element, i) {
			var arrayElement = element.elements[2];
			array.push(arrayElement.value);
		});

		return {
			value: array
		};
	},
	make_string: function make_string(input, start, end, elements) {
		return {
			value: elements[1].text,
			text: input.slice(start, end),
			offset: start,
			elements: elements
		};
	},
	make_number: function make_number(input, start, end, elements) {
		return {
			value: Number(input.slice(start, end))
		};
	},
	// Included for reference;
	// This is the form of Treenode-objects that Canopy creates
	make_default: function make_default(input, start, end, elements) {
		return {
			text: input.slice(start, end),
			offset: start,
			elements: elements
		};
	}
};

if (__cli_string) {
	Parser(__cli_string, true);
}

function Parser(stringToParse, doLog) {

	var result = null;

	if (doLog) {
		console.log(">>> Parsing");
		console.log(stringToParse);
	}

	try {
		result = Grammar.parse(stringToParse, { actions: canopyActions });
		if (doLog) {
			console.log(">>> Result");
			console.log(JSON.stringify(result, null, 4));
		}
	} catch (err) {
		if (doLog) {
			console.log(">>> PARSE ERROR");
			console.error(err);
		}
	}

	return result;
}
