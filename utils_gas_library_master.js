/**
 * This script file contains the signature of the UtilGasLibray library functions.
 * @author Manuel Chinchi
 * @version 1.0.0
 */

/**
 * Combines the elements of two lists 1:1.
 * @param {string} range1 Range of values to be combined.
 * @param {string} range2 Range of values to be combined.
 * @param {string} separator Separator for each pair of combined values.
 * @param {boolean} ignoreEmpties Flag indicating if empty values are to be considered.
 * @return {Array<string>} List of combinated values.
 * @customfunction
 */
function ARRAY_COMBINATION(range1, range2, separator='', ignoreEmpties=true) {
  return UtilGasLibrary.ARRAY_COMBINE(range1, range2, separator, ignoreEmpties);
}

/**
 * Performs the permutation of the elements of a list.
 * @param {Array<string>} range Range of values for the permutation.
 * @param {string} separator Separator for each group of swapped values.
 * @returns {Array<string>} List of permutations as strings.
 * @customfunction
 */
function ARRAY_PERMUTATION(range, separator='') {
  return UtilGasLibrary.ARRAY_PERMUTATOR(range, separator);
}
  