import React from 'react';
import './header.css'

import TextField from "@material-ui/core/TextField";
import MenuItem from '@mui/material/MenuItem';
import { makeStyles } from "@material-ui/core/styles";

import { visualizationTypes } from '../../enums/visualizationTypes';
import { sortingAlgorithms } from '../../enums/sortingAlgorithms';

/*
Styles for visualization type and sorting algorithm drop down
*/ 
const styles = makeStyles({
    root: {
        width: 200,
        "& .MuiOutlinedInput-input": {
          color: "white"
        },
        "& .MuiInputLabel-root": {
          color: "white"
        },
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
          borderColor: "white"
        },
        "&:hover .MuiOutlinedInput-input": {
          color: "white"
        },
        "&:hover .MuiInputLabel-root": {
          color: "white"
        },
        "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
          borderColor: "white"
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
          color: "white"
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: "white"
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "white"
        }
    },
    icon: {
      color: "white"
    }
  });

function Header(props) {
    const classes = styles();
    return(
        <header className="App-header">
            <div className="header-button">
            </div>
            <div className="header-title">
                Sorting Visualizer
            </div>
            <TextField
            value={props.visualizationType}
            onChange={props.updateSelectedVisualizationType}
            label="Visualization Type"
            className={classes.root}
            variant="outlined"
            select
            SelectProps={{classes: {icon: classes.icon}}}
            >
                <MenuItem value={visualizationTypes.BAR_HEIGHT}>Bar Height</MenuItem>
                <MenuItem value={visualizationTypes.COLOR}>Color</MenuItem>
            </TextField>

            <TextField
            value={props.algorithm}
            onChange={props.updateSelectedAlgorithm}
            label="Sorting Algorithm"
            className={classes.root}
            variant="outlined"
            select
            style={{width: 225}}
            SelectProps={{classes: {icon: classes.icon}}}
            >
                <MenuItem value={sortingAlgorithms.BUBBLE_SORT}>Bubble Sort</MenuItem>
                <MenuItem value={sortingAlgorithms.SELECTION_SORT}>Selection Sort</MenuItem>
                <MenuItem value={sortingAlgorithms.QUICK_SORT_HOARE}>Quick Sort (Hoare)</MenuItem>
                <MenuItem value={sortingAlgorithms.QUICK_SORT_LOMUNTO}>Quick Sort (Lomunto)</MenuItem>
                <MenuItem value={sortingAlgorithms.MERGE_SORT}>Merge Sort</MenuItem>

            </TextField>

            <div className="header-button"> 
                <button className="sort-button" onClick={props.sortElements}> Sort! </button>
            </div>

            <div className="header-button">
                <button className="sort-button" onClick={props.generateNewArray}> Generate New Array </button>
            </div>

            <div className="header-button">
            </div>
        </header>

 );

}

export default Header;