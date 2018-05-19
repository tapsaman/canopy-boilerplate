Minimal boilerplate for creating parsers with the awesome [jcoglan/canopy](https://github.com/jcoglan/canopy)-parser generator.

**Nothing** in this project shows a definitive way of doing things with Canopy nor is approved by its creators.

Includes 
* JSON-parsing (strings, numbers, objects, arrays) example for JavaScript and Python
* package.json to take advantage of npm dependency system and scripts

# Instructions

1. Clone or download project from git. 

2. Only node dependencies are Canopy and babel.
Babel is used for translating ES6 JavaScipt parsers to ES5.

If you don't need to do this and plan to use a gloabl install of Canopy (get it with ```npm i -g canopy```), **you will not need to install dependencies**.
Otherwise run 
```npm install```

3. Create a folder including the grammar.peg-file and index-files in target languages.
[Read the tutorial](http://canopy.jcoglan.com/) on creating Canopy-files from its official site.
index-files in [parsers/json](parsers/json) demonstrate how to implement parser logic, importable parsing functions and cli-tests.

4. ```scripts``` defined in package.json give examples on how to
	- create parsers with Canopy
	- translate ES6 to ES5 with babel
	- run tests on JavaScript or python parsers