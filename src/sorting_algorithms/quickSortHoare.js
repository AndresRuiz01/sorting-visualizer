function swap(array, indexOne, indexTwo){
    var temp = array[indexOne];
    array[indexOne] = array[indexTwo];
    array[indexTwo] = temp;
}

function partitionHoare(array, left, right) {
    var animations = [];
    var pivot_index = Math.floor((right + left) / 2);
    var pivot = array[Math.floor((right + left) / 2)].props.value; //middle element
    var i = left; //left pointer
    var j = right; //right pointer
    animations.push(["pivot-select", pivot_index, pivot_index]);
    while (i <= j) {
        if (i === pivot_index) {
            animations.push(["check", j, j]);
        } else if (j === pivot_index) {
            animations.push(["check", i, i]);
        } else {
            animations.push(["check", i, j]);
        }

        while (array[i].props.value < pivot) {
            if (i === pivot_index) {
                animations.push(["check", i+1, i+1]);
            } else if ((i + 1) === pivot_index) {
                animations.push(["uncheck", i, i]);
            } else {
                animations.push(["uncheck-check", i, i+1]);
            }
            // animations.push(["uncheck-check", i, i+1]);
            i++;
        }
        while (array[j].props.value > pivot) {

            if (j === pivot_index) {
                animations.push(["check", j-1, j-1]);
            } else if ((j - 1) === pivot_index) {
                animations.push(["uncheck", j, j]);
            } else {
                animations.push(["uncheck-check", j, j-1]);
            }

            // animations.push(["uncheck-check", j, j-1]);
            j--;
        }


        // animations.push(["check", i, j]);
        if (i <= j) {
            if (i === pivot_index) {
                animations.push(["swap", i, j]);
                animations.push(["uncheck", i, i]);
                pivot_index = j
            } else if (j === pivot_index) {
                animations.push(["swap", i, j]);
                animations.push(["uncheck", j, j]);
                pivot_index = i;
            } else {
                animations.push(["swap", i, j]);
                animations.push(["uncheck", i, j]);           
            }
            // animations.push(["swap-wrong", i, j]);
            swap(array, i, j); //sawpping two elements
            i++;
            j--;
        } else{
            animations.push(["uncheck", i, j]);
        }
    }
    animations.push(["pivot-deselect", pivot_index, pivot_index]);
    return [i, animations];
}

function quickSortHoare(array, left, right) {
    var index;
    var animationsQuickSort = []
    var animationsLeft = [];
    var animationsRight = [];
    var animationsPartition = [];
    if (array.length > 1) {
        [index, animationsPartition] = partitionHoare(array, left, right); //index returned from partition
        if (left < index - 1) { //more elements on the left side of the pivot
            // eslint-disable-next-line
            var [_, animationsLeft] = quickSortHoare(array, left, index - 1);
        }
        if (index < right) { //more elements on the right side of the pivot
            // eslint-disable-next-line
            var [_, animationsRight] = quickSortHoare(array, index, right);
        }
    }
    animationsQuickSort = [...animationsPartition, ...animationsRight, ...animationsLeft];

    return [array, animationsQuickSort];
}

export default quickSortHoare;