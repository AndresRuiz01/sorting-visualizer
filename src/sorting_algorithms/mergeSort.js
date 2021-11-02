function merge(array, start, half, end) {
    var animations = []
    var leftPosition = start;
    var rightPosition = start + half + 1;
    animations.push(["check", leftPosition, rightPosition]);
    while (rightPosition <= end && leftPosition < rightPosition) {
        if (array[leftPosition].props.value <= array[rightPosition].props.value) {
            animations.push(["uncheck-check", leftPosition, leftPosition+1]);
            leftPosition++;
        } else {
            // Shift right and insert element
            // Grab element
            const movedElement = array.splice(rightPosition, 1)
            // Place in new position
            array.splice(leftPosition, 0, movedElement[0]);
            // animations.push(["swap-wrong", leftPosition, leftPosition]);
            animations.push(['shift', leftPosition, rightPosition]);
            if (rightPosition+1 > end) {
                animations.push(["uncheck-check", leftPosition, rightPosition]);
            } else {
                animations.push(["uncheck-check", leftPosition, rightPosition+1]);
            }
            leftPosition++;
            rightPosition++;
        }
    }
    animations.push(["uncheck", leftPosition, rightPosition-1]);
    return animations;
}

function mergeSort(array, startIndex, endIndex) {
    const half = Math.floor((endIndex - startIndex) / 2);

    if ((endIndex - startIndex) < 1) {
        return [];
    }
    const leftAnimations = mergeSort(array, startIndex, startIndex + half);
    const rightAnimations = mergeSort(array, startIndex + half + 1, endIndex);
    const mergeAnimations = merge(array, startIndex, half, endIndex);
    return [...leftAnimations, ...rightAnimations, ...mergeAnimations];

}

export default mergeSort;