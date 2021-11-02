function swap(array, indexOne, indexTwo){
    var temp = array[indexOne];
    array[indexOne] = array[indexTwo];
    array[indexTwo] = temp;
}

function quicksortLomuto(array, left, right) {
    var _;
    var animationsQuickSort = []
    var animationsLeft = [];
    var animationsRight = [];
    var animationsPartition = [];
    var pivot;


    if (left < right) {
        [pivot, animationsPartition]  = partitionLomuto(array, left, right);
        [_, animationsLeft] = quicksortLomuto(array, left, pivot - 1);
        [_, animationsRight] = quicksortLomuto(array, pivot + 1, right);
    }

    animationsQuickSort = [...animationsPartition, ...animationsRight, ...animationsLeft];

    return [array, animationsQuickSort];
}

function partitionLomuto(array, left, right) {
    var animations = [];
    var pivot = right;
    animations.push(["pivot-select", pivot, pivot]);
    var i = left;
    animations.push(["check", i, i+1]);
    for (var j = left; j < right; j++) {
        if (array[j].props.value < array[pivot].props.value) {
            animations.push(["swap", i, j]);
            if (i === j) {
                animations.push(["uncheck-check", i, i+1]);
            } else if ((i + 1) === j) {
                animations.push(["uncheck-check", i, j+1]);
            } else {
                animations.push(["uncheck-check", i, i+1]);
            }
            swap(array, i, j);
            i++;
        }
        if ((j+1) < right) {
            animations.push(["uncheck-check", j, j+1]);
        }
    }
    // animations.push(["uncheck", i, right-1]);
    animations.push(["uncheck", left, right-1]);
    // animations.push(["uncheck", left, i]);
    animations.push(["swap", i, pivot]);
    swap(array, i, j);
    animations.push(["pivot-deselect", i, i])
    return [i, animations];
}

export default quicksortLomuto;