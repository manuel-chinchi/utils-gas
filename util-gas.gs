//#region Constants ----------------------------------------------------------------------
const UTC_ZONES = [
  'UTC-11',
  'UTC-10',
  'UTC-9',
  'UTC-8',
  'UTC-7',
  'UTC-6',
  'UTC-5',
  'UTC-4',
  'UTC-3',
  'UTC-2:30',
  'UTC-2',
  'UTC-1',
  'UTC+0',
  'UTC+1',
  'UTC+2',
  'UTC+3',
  'UTC+4',
  'UTC+4:30',
  'UTC+5',
  'UTC+5:30',
  'UTC+5:45',
  'UTC+6',
  'UTC+6:30',
  'UTC+7',
  'UTC+8',
  'UTC+9',
  'UTC+9:30',
  'UTC+10',
  'UTC+11',
  'UTC+12',
  'UTC+13'
]
//#endregion

//#region Clases -------------------------------------------------------------------------
class Clock {
  /**
   * This object represent the global time according to the configuration with UTC+0.
   * @param {string} utc String indicating the coordinated universal time (UTC) of a specific area.
   */
  constructor(utc='UTC+0') {
    this.utc = utc.toUpperCase();
    this.time = null;
  }

  get UTC() {
    return this.utc;
  }

  set UTC(UTC) {
    this.utc = UTC.toUpperCase();
  }

  /**
   * Calculate the current time according to the UCT indicated, by default it takes UTC+0.
   * @param utc String indicating the coordinated universal time (UTC) of a specific area.
   * @returns Time in text format
   */
  getTime(utc=this.UTC) {
    utc = utc.toUpperCase();
    var date = new Date();

    if ( UTC_ZONES.indexOf(utc) > -1 ) { // check valid UTC string
      var hoursAndMinutes = utc.split(/\+|\-/g)[1].split(':');
      
      if (hoursAndMinutes.length == 1) { // only hours
        var hours = parseInt(hoursAndMinutes);
        
        if (utc.indexOf('-') >- 1) { // substraction
          hours = (-1)*hours;
        }
        
        date.setUTCHours(hours);
      } else { // hours and minutes
        var hours = parseInt(hoursAndMinutes[0]);
        var minutes = parseInt(hoursAndMinutes[1]);
        
        if (utc.indexOf('-') > -1) {
          hours = (-1)*hours;
          minutes = (-1)*minutes;
        }

        date.setUTCHours(hours);
        date.setUTCMinutes(minutes);
      }
    }
    
    return `${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}`;
    // return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  }
}
//#endregion

/**
 * Calculate the current time according to the UCT indicated, by default it takes UTC+0.
 * @param utc String indicating the coordinated universal time (UTC) of a specific area.
 * @returns Time in text format.
 * @customfunction
 */
// function CLOCK_TIME(utc) {
//   return (new Clock(utc)).getTime();
// }

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

// FUNCIONA pero no me gusta el orden de salida
function ARRAY_SUB_SETS(range, separator='') {
  var list = Array.isArray(range) ? range.join().split(',') : null;
  
  var result=[];
  function fork(i,t) {
    if (i === list.length) {
      result.push(t);
      return;
    }
    fork(i+1, t.concat([list[i]]));
    fork(i+1,t);
  }
  fork(0, []);
  return ORDER_SUB_SETS(result, result.length);
}

function ORDER_SUB_SETS(list, maxSizeGroups) {
  list.pop();
  var orderList = [];
  var i = 1;
  var j = 0;

  while (i <= maxSizeGroups) {
    while (j < list.length) {
      if (list[j].length == i) { // size sub set
        orderList.push(list[j]);
      }
      j++;
    }
    i++; j=0;
  }

  return orderList;
}

var arr = [1, 2, 3];
console.log(ARRAY_SUB_SETS(arr));
// [
//   [ '1' ],
//   [ '2' ],
//   [ '3' ],
//   [ '1', '2' ],
//   [ '1', '3' ],
//   [ '2', '3' ],
//   [ '1', '2', '3' ]
// ]