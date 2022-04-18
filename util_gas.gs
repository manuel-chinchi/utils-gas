function TO_ARRAY(cells) {
  var array = [];
  for (let i=0; i < cells.length; i++) {
    array.push(cells[i][0]);
  }
  return array;
}

function DELETE_CELLS_EMPTIES(cells) {
  var clear_cells = [];
  for (let i=0; i < cells.length; i++) {
    if (cells[i][0] != '') { /** string NO vacio */
      clear_cells.push(cells[i]);
    } else {
      continue;
    }
  }
  return clear_cells;
}

/**
 * @public Combines the values of 2 columns in a single.
 * 
 * @param range1 Range of cells. (string)
 * @param range2 Range of cells. (string)
 * 
 * @customfunction
 */
function COMBINE_COLS(range1, range2) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var cells1, cells2;
  var array1, array2;
  var array_combinated = [];
  var item_concat;

  cells1=sheet.getRange(
    range1.toString()
    ).getValues(); // -> cuando se llama a la funcion desde una hoja usar 'toString' // INVESTIGAR 'String(range)'
  cells2=sheet.getRange(
    range2.toString()
  ).getValues(); // -> cuando se llama a la funcion desde una hoja usar 'toString'

  cells1=DELETE_CELLS_EMPTIES(cells1);
  cells2=DELETE_CELLS_EMPTIES(cells2);

  // array1=TO_ARRAY(cells1);
  // array2=TO_ARRAY(cells2);

  for (let j=0; j < array1.length; j++) {
    for (let k=0; k < array2.length; k++) {
      item_concat = array1[j] + " " + array2[k];
      array_combinated.push(item_concat);
    }
  }

  return array_combinated;
}

/**
 * Combines the values of 2 columns in a single. 
 * 
 * @param {string|Array<string>} range1 Range of cells.
 * @param {string} range2 Range of cells.
 * @param {number} randon_number Random number for update function automatically. (ref https://stackoverflow.com/questions/17341399/refresh-data-retrieved-by-a-custom-function-in-google-sheet)
 * @return List of combined elements.
 * @customfunction
 */
function COMBINE_COLS_EX(range1, range2, randon_number=33) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var cells1, cells2;
  var array1, array2;
  var array_combinated = [];
  var item_concat;

  if ( Array.isArray(range1) == true ) {
    array1=range1;
  } else {
    cells1=sheet.getRange(
    range1.toString()
    ).getValues();
    cells1=DELETE_CELLS_EMPTIES(cells1);
    array1=TO_ARRAY(cells1);
  }

  if ( Array.isArray(range2) == true ) {
    array2=range2;
  } else {
    cells2=sheet.getRange(
    range2.toString()
    ).getValues();
    cells2=DELETE_CELLS_EMPTIES(cells2);
    array2=TO_ARRAY(cells2);
  }

  for (let j=0; j < array1.length; j++) {
    for (let k=0; k < array2.length; k++) {
      item_concat = array1[j] + " " + array2[k];
      array_combinated.push(item_concat);
    }
  }

  return array_combinated;
}

//#region New Functions
/**
 * Combines the elements of two lists into a single list
 * 
 * @param {string} range1 Range of cells at combine.
 * @param {string} range2 Range of cells at combine.
 * @param {string} separator Separator for each pair of combined values.
 * @param {boolean} ignoreEmpties Flag indicating if empty values are to be considered.
 * @return List of concatenated values.
 * 
 * @customfunction
 */
 function ARRAY_COMBINE(range1, range2, separator = '', ignoreEmpties = true) {
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
 * Realiza la permutacion con los elementos de dos listas.
 * 
 * @param {Array<string>} range Range of cells at permutate.
 * @param {string} separator Separator.
 * @param {boolean} withRepetitions Flag indicating whether permutations with repetition are to be considered.
 * @return List of values.
 * 
 * @customfunction
 */
function ARRAY_PERMUTATIONS(range, separator='', withRepetitions=false) {
  var list = Array.isArray(range) ? range.join().split(',').filter(Boolean) : null;
  var permutations = PERMUTATOR(list);
  return JOIN_ITEMS(permutations, separator);
}

/**
 * Convierte cada uno de los elementos (listas) del conjunto a una cadena.
 * 
 * @param {Array} cells Rango de celdas.
 * @param {string} separator Separador.
 * @return Lista de elementos
 * 
 * @customfunction
 */
function JOIN_ITEMS(cells, separator=' ') {
  var list = [];

  for (let i = 0; i < cells.length; i++) {
    list.push(cells[i].join(',').replaceAll(',', separator));
  };

  return list;
}

/**
 * Crea una lista que contiene las permutaciones por grupo.
 * 
 * @param {string} range Rango de valores.
 * @return {Array<Array>} Lista de listas.
 * 
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
//#endregion