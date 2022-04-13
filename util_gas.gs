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
 * @param {string|Array<string>}range1 Range of cells.
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
