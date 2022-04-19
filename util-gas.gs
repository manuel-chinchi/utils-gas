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
  var list1 = Array.isArray(range1) ? range1.join().split(',') : null;
  var list2 = Array.isArray(range2) ? range2.join().split(',') : null;
  var list3 = [];

  if ( ignoreEmpties == true ) {
    list1 = list1.filter(Boolean);
    list2 = list2.filter(Boolean);
  }

  for (let i = 0; i < list1.length; i++) {
    for (let j = 0; j < list2.length; j++) {
      list3.push(list1[i] + separator + list2[j]);
    }
  }

  return list3;
}

/**
 * Performs the permutation of the elements of a list.
 * @param {Array<string>} range Range of values for the permutation.
 * @param {string} separator Separator for each group of swapped values.
 * @returns {Array<string>} List of permutations as strings.
 * @customfunction
 */
function ARRAY_PERMUTATION(range, separator='') {
  var list = Array.isArray(range) ? range.join().split(',').filter(Boolean) : null;

  var permutations = PERMUTATOR(list);

  return JOIN_ITEMS(permutations, separator);
}

/**
 * Converts each of the subgroups of an array to a string. Optionally you can specify a 
 * separator to appear between the union of the elements of each subgroup.
 * @param {Array} cells Range of values.
 * @param {string} separator Separator for each final string value in the array.
 * @returns {Array<string>} List of strings.
 * @customfunction
 */
function JOIN_ITEMS(cells, separator=' ') {
  var list = [];

  for (let i = 0; i < cells.length; i++) {
    // list.push(cells[i].join(',').replaceAll(',', separator)); // old
    list.push(Array(cells[i]).join(',').replace(/,/g, separator));
  };

  return list;
}

/**
 * Creates an array containing each group of permutations of a list of elements.
 * @param {string} range Range of cells at permutate.
 * @returns {Array<Array>} Matrix of arrays.
 * @customfunction
 */
function PERMUTATOR(range) { 
  var set = [];

  function permute(arr, data) {
    var cur, memo = data || []; 

    for (var i = 0; i < arr.length; i++) {
      cur = arr.splice(i, 1)[0];

      if ( arr.length === 0 ) {
        set.push(memo.concat([cur]));
      }

      permute(arr.slice(), memo.concat([cur]));
      arr.splice(i, 0, cur);
    }
    return set;
  }

  return permute(range); 
}