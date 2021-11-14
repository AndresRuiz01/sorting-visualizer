import './SortingVisualizer.css';

import React from 'react';
import GridElement from '../grid_element/GridElement';

import bubbleSort from '../../sorting_algorithms/bubbleSort';
import quickSortHoare from '../../sorting_algorithms/quickSortHoare';
import quickSortLomunto from '../../sorting_algorithms/quickSortLomunto';
import mergeSort from '../../sorting_algorithms/mergeSort';
import selectionSort from '../../sorting_algorithms/selectionSort';

import ProgressBar from "@ramonak/react-progress-bar";

import { visualizationTypes } from '../../enums/visualizationTypes';
import { sortingAlgorithms } from '../../enums/sortingAlgorithms';

import Header from '../header/header'


const NUM_BARS = 90; // Nubmer of desired elements to sort
const HEADER_DIFFERENCE = 145; // Difference used to correctly size the sorting visualizer
const SORTING_SPEED_IN_MS = 30; // Time between each animations
const VISUALIZE_COMPARISONS = true; // Boolean to color the bars being compared / swapped and the pivots

class SortingVisualizer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            array: [],
            algorithm: sortingAlgorithms.BUBBLE_SORT,
            visualizationType: visualizationTypes.BAR_HEIGHT,
            windowHeight: window.innerHeight,
            loadingBarProgress: 0,
            isSorting: false,
        }

        this.generateNewArray = this.generateNewArray.bind(this);
        this.sortElements = this.sortElements.bind(this);
        this.updateSelectedAlgorithm = this.updateSelectedAlgorithm.bind(this);
        this.updateSelectedVisualizationType = this.updateSelectedVisualizationType.bind(this);
        this.handleResize = this.handleResize.bind(this);
    }
    
    componentDidMount() {
        this.generateNewArray();
        window.addEventListener("resize", this.handleResize);
    }

    componentWillUnmount() {
        window.addEventListener("resize", this.handleResize);
    }

    handleResize(e) {
        if (this.state.isSorting) {
            return;
        }

        this.setState({windowHeight: window.innerHeight});
        this.generateNewArray();
    }
    
    updateStateAfterSorting(ms) {
        setTimeout(() => {this.setState({isSorting: false})}, ms);
    }

    /*
    Method used to update the state based on the sorting algorithm dropdown
    */
    updateSelectedAlgorithm(e) {
        this.setState({algorithm: e.target.value});
    };

    /*
    Method used to update the state based on the visualization type
    */
    updateSelectedVisualizationType(e) {
        this.setState({visualizationType: e.target.value}, () => {this.generateNewArray();});
    };

    /*
    Method to generate a random integer that is used for the heights of the bars
    */
    getRandomInt() {
        const windowHeight = this.state.windowHeight
        const maxBarHeight = windowHeight - HEADER_DIFFERENCE;
        const min = 30;
        const max = maxBarHeight;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /*
    Method used to generate an array of elements with random heights
    */
    generateHeightArray() {
        var new_array = [];
        for (var i = 0; i < NUM_BARS; i++) {
            var height = this.getRandomInt();
            new_array.push(<GridElement className="grid-element" key={i} value={height} element_height={height} color={"#282c34"}/>);
        }
        this.setState({array: new_array});
    }

    /*
    Method used to shuffle the sorted list of colored elements
    */
    shuffle(array) {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle...
        while (currentIndex !== 0) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
    }

    /*
    Method to generate an array of colored elements using the HSL color scheme
    */
    generateColoredArray() {
        const windowHeight = this.state.windowHeight
        const maxBarHeight = windowHeight - HEADER_DIFFERENCE;
        var new_array = [];
        for (var i = 0; i < NUM_BARS; i++) {
            var value = i * 3;
            var hsl_string = "hsl("+value+",60%,70%)";
            new_array.push(<GridElement className="grid-element" key={i} value={value} element_height={maxBarHeight} color={hsl_string} />);
        }
        new_array = this.shuffle(new_array); 
        this.setState({array: new_array});
    }

    /*
    Method to generate a new array based on the visualization type
    */
    generateNewArray() {
        if (this.state.isSorting) {
            return;
        }

        this.setState({loadingBarProgress: 0});
        if (this.state.visualizationType === visualizationTypes.BAR_HEIGHT) {
            this.generateHeightArray();
        } else if (this.state.visualizationType === visualizationTypes.COLOR) {
            this.generateColoredArray();
        }
    }

    /*
    Method to remove all of the non swap visualizations
    */
    visualizeSwapOnly(animations) {
        var swapAnimations = [];

        for (let i = 0; i < animations.length; i++) {
            if (animations[i][0] === "swap") {
                swapAnimations.push(animations[i]);
            }
        }
        return swapAnimations;
    }

    /*
    Method used to visualize sorting algorithm with bar height
    */
    barHeightVisualization(animations) {
        var temp_array = this.state.array.slice();
        for (let i = 0; i < animations.length; i++) {
            const gridElements = document.getElementsByClassName('grid-element');
            setTimeout(() => {
                const [animation_type, barOneIdx, barTwoIdx] = animations[i];

                if (animation_type === "check") { 
                    gridElements[barOneIdx].style.backgroundColor = "cyan";
                    gridElements[barTwoIdx].style.backgroundColor = "cyan";
                } else if (animation_type === "uncheck") {
                    gridElements[barOneIdx].style.backgroundColor = "#282c34";
                    gridElements[barTwoIdx].style.backgroundColor = "#282c34";
                } else if (animation_type === "swap") {
                    var temp = temp_array[barOneIdx]
                    temp_array[barOneIdx] = temp_array[barTwoIdx];
                    temp_array[barTwoIdx] = temp;
                } else if (animation_type === "shift") {
                    const movedElement = temp_array.splice(barTwoIdx, 1);
                    temp_array.splice(barOneIdx, 0, movedElement[0]);
                } else if (animation_type === "uncheck-check") {
                    gridElements[barOneIdx].style.backgroundColor = "#282c34";
                    gridElements[barTwoIdx].style.backgroundColor = "cyan";
                } else if (animation_type === "pivot-select") {
                    gridElements[barOneIdx].style.backgroundColor = "red";
                } else if (animation_type === "pivot-deselect") {
                    gridElements[barOneIdx].style.backgroundColor = "#282c34";
                }
                this.setState({array: temp_array});
                var progress = Math.floor(((i) / animations.length) * 100) + 1;
                this.setState({loadingBarProgress: progress});

            }, i * SORTING_SPEED_IN_MS);
        }
    }

    /*
    Method used to visualize sorting algorithm with color
    */
    colorVisualization(animations) {
        var temp_array = this.state.array.slice();
        for (let i = 0; i < animations.length; i++) {
            const gridElements = document.getElementsByClassName('grid-element');
            setTimeout(() => {
                const [animation_type, barOneIdx, barTwoIdx] = animations[i];
                if (animation_type === "check") {
                    gridElements[barOneIdx].style.border = "black 1px solid";
                    gridElements[barTwoIdx].style.border = "black 1px solid";
                } else if (animation_type === "uncheck") {
                    gridElements[barOneIdx].style.border = "white 1px solid";
                    gridElements[barTwoIdx].style.border = "white 1px solid";
                } else if (animation_type === "swap") {
                    var temp_two = temp_array[barOneIdx]
                    temp_array[barOneIdx] = temp_array[barTwoIdx];
                    temp_array[barTwoIdx] = temp_two;
                } else if (animation_type === "shift") {
                    const movedElement = temp_array.splice(barTwoIdx, 1);
                    temp_array.splice(barOneIdx, 0, movedElement[0]);
                } else if (animation_type === "uncheck-check") {
                    gridElements[barOneIdx].style.border = "white 1px solid";
                    gridElements[barTwoIdx].style.border = "black 1px solid";
                } else if (animation_type === "pivot-deselect") {
                    gridElements[barOneIdx].style.border = "white 1px solid";
                } else if (animation_type === "pivot-select") {
                    gridElements[barOneIdx].style.border = "white 1px solid";
                }
                this.setState({array: temp_array});
                var progress = Math.floor(((i + 1) / animations.length) * 100);
                this.setState({loadingBarProgress: progress});
            }, i * SORTING_SPEED_IN_MS);
        }
    }

    /*
    Method to visualize the sorting process of the selected algorithm using the selected visualization
    */
    sortElements() {
        if (this.state.isSorting) {
            return;
        }

        this.setState({isSorting: true});

        var animations = [];
        if (this.state.algorithm === sortingAlgorithms.BUBBLE_SORT) {
            animations = bubbleSort(this.state.array.slice());
        } else if (this.state.algorithm === sortingAlgorithms.QUICK_SORT_HOARE) {
            // eslint-disable-next-line
            var [_, animations] = quickSortHoare(this.state.array.slice(), 0, this.state.array.length-1);
        } else if (this.state.algorithm === sortingAlgorithms.QUICK_SORT_LOMUNTO) {
            // eslint-disable-next-line
            var [_, animations] = quickSortLomunto(this.state.array.slice(), 0, this.state.array.length-1);
        } else if (this.state.algorithm === sortingAlgorithms.MERGE_SORT) {
            animations = mergeSort(this.state.array.slice(), 0, this.state.array.length-1);
        } else if (this.state.algorithm === sortingAlgorithms.SELECTION_SORT) {
            animations = selectionSort(this.state.array.slice());
        }

        if (!VISUALIZE_COMPARISONS) {
            animations = this.visualizeSwapOnly(animations);
        }

        if (this.state.visualizationType === visualizationTypes.BAR_HEIGHT) {
            this.barHeightVisualization(animations);
        } else if (this.state.visualizationType === visualizationTypes.COLOR){
            this.colorVisualization(animations);
        }
        this.updateStateAfterSorting(SORTING_SPEED_IN_MS * animations.length);
    }

    render () {
        const windowHeight = this.state.windowHeight
        const visualizerHeight = windowHeight - HEADER_DIFFERENCE;
        return (
            <div className="sorting-visualizer">
                <Header 
                    algorithm={this.state.algorithm}
                    visualizationType={this.state.visualizationType}
                    generateNewArray={this.generateNewArray}
                    sortElements={this.sortElements}
                    updateSelectedAlgorithm={this.updateSelectedAlgorithm}
                    updateSelectedVisualizationType={this.updateSelectedVisualizationType}
                />
                <ProgressBar completed={this.state.loadingBarProgress} borderRadius="0px" customLabel=" " height="5px" bgColor="red" baseBgColor="white"/>
                <div className="sorting-grid" style={{height: visualizerHeight}}>
                    {this.state.array}
                </div>
            </div>
    
        );
    }
}

export default SortingVisualizer;