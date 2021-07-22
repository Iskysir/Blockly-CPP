/**
 * 	@author Joseph Pauplis
 * 	@version 0.1
 */

C_Var = {};

C_Var.get = {};

const classList = new Map();

/**
 * 	A function for returning the data of parameter blocks.
 */
C_Var.get.parameters = function(block){
	let ptr = block;
	const options = [];
	while(ptr)
	{
		/// If the block is not a parameter block, exit loop.
		if (ptr.type !== "func_parameters" && ptr.type !== "class_parameters") {
			return;
		}
		/// If it is, begin streaming variables.
		if (ptr.paramProp_) {
			options.push(ptr.paramProp_);
		}
		/// Get next parameter block.
		ptr = ptr.childBlocks_[0];
	}
	return options;
};

/**
 * A function for returning the data of class parameter blocks,
 *	allowing the copy constructor to pass in a class object,
 *	and be able to call that object's public member functions.
 * @param block
 */
C_Var.get.classParameterMembers = function(block){
	let ptr = block;
	const options = [];
	while (ptr)
	{
		/// Check that the block is a class parameter block.
		if (ptr.type === "class_parameters")
		{
			/// Stream only the public data members.
			options.push([
				ptr.classVarPublic_,
				ptr.classFuncProp_,
				ptr.classFuncParam_
			]);
		}

		/// Get the next parameter block.
		ptr = ptr.childBlocks_[0];
	}
	return options;
};

/**
 * Checks dropdown options for duplicates
 * @param options the list of options to search
 * @param optionName the option to search for
 * @returns {boolean} __True__ if no duplicates
 */
C_Var.get.dropdownCheck = function(options, optionName) {
	let doesNotHaveOption = true;
	for(let i = 0; i < options.length; i++) {
		if(options[i][0] === optionName){
			doesNotHaveOption = false;
			break;
		}
	}
	return doesNotHaveOption;
}
 C_Var.get.arrayCheckDuplicates = function (array) {
	return array.some((val, i) => array.indexOf(val) !== i)
 }