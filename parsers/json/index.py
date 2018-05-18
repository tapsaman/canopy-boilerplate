import grammar

def combineElements(treenode):

	if type(treenode) is str:
		return treenode
	if type(treenode) is int:
		return str(treenode)
	#if not hasattr(treenode, "elements") or len(treenode["elements"]) == 0:
	if not hasattr(treenode, "elements") or len(treenode.elements) == 0:
		return treenode.text


	s = ""
	for i in range(0,len(treenode.elements)):
		s += combineElements(treenode.elements[i])
	return s

