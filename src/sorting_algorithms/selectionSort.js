function swap(array, indexOne, indexTwo){
    var temp = array[indexOne];
    array[indexOne] = array[indexTwo];
    array[indexTwo] = temp;
}
 
function selectionSort(array) {
    var i, j, min_idx;
    var animations = [];
    // One by one move boundary of unsorted subarray

    for (i = 0; i < array.length - 1; i++) {
        // Find the minimum element in unsorted array
        min_idx = i;
        animations.push(["check", i, min_idx]);
        for (j = i + 1; j < array.length; j++) {
            if (array[j].props.value < array[min_idx].props.value) {
                animations.push(["uncheck-check", min_idx, j]);
                min_idx = j;
            } else if ((j + 1) === array.length) {
                animations.push(["uncheck-check", j, min_idx]);
            } else {
                animations.push(["uncheck-check", j, j+1]);
            }
        }
        // Swap the found minimum element with the first element
        animations.push(["swap", min_idx, i]);
        swap(array,min_idx, i);
        animations.push(["uncheck", i, i]);
    }
    return animations;
}

export default selectionSort;