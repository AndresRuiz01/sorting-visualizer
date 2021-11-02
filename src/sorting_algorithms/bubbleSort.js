function swap(array, indexOne, indexTwo){
    var temp = array[indexOne];
    array[indexOne] = array[indexTwo];
    array[indexTwo] = temp;
}

function bubbleSort(array) {
    var animations = [];

    for (let i = 0; i < array.length; i++) {
        var swapped = false;
        animations.push(["check", 0, 1]);
        for (let j = 0; j < array.length - i - 1; j++) {
            var heightOne = array[j].props.value;
            var heightTwo = array[j+1].props.value;
            if ( heightOne > heightTwo ) {
                swap(array, j, j+1);
                swapped = true;
                animations.push(["swap", j, j+1]);
            }
            if (j+2 <= array.length - i - 1) {
                animations.push(["uncheck-check", j, j+2]);
            } else {
                animations.push(["uncheck", j, j+1]);
            }
        }

        if (!swapped) {
            break;
        }

    }
    return animations;
}

export default bubbleSort;
