//###########################################################################
// BONUS plot attempt.. did not finish.
//###########################################################################
var gaugeData = [{
    domain: { x: [0, 1], y: [0, 1] },
//    value: 450,
    title: { text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week" },
    type: "indicator",
    mode: "gauge",
    delta: { reference: 380 },
    labels:["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
    gauge: {
      axis: { range: [null, 9] },
      steps: [
        { range: [0, 1], color: "#dddddd" },
        { range: [1, 2], color: "#dbe9e9" },
        { range: [2, 3], color: "#00cdcd" },
        { range: [3, 4], color: "#00b3b3" },
        { range: [4, 5], color: "#009a9a" },
        { range: [5, 6], color: "#008080" },
        { range: [6, 7], color: "#006767" },
        { range: [7, 8], color: "#004d4d" },
        { range: [8, 9], color: "#003434" }
      ],
    }
  }];

var layout = { 
  width: 600, 
  height: 450, 
  margin: { t: 0, b: 0 },

  shapes: [
  {
      type: 'path',
      path: 'M 0.48 0.25 L 0.5 0.6 L 0.52 0.25 Z',
      fillcolor: '000000',
      line: {
        color: '000000'
      }
    }
  ]
};

Plotly.newPlot('gauge', gaugeData, layout);

// //###############################################################################
// // Create the function for the switch event
// //###############################################################################
// //d3.selectAll("body").on("change", optionChanged);

// function optionChanged(id) {
//     // Use D3 to select the dropdown menu
//     var dropdown = d3.selectAll("#selDataset");
//     console.log(`Dropdown: ${dropdown}`)
    
//     // Assign the dropdown menu option to a variable
//     var selectedSample = dropdown.property("value");
//     console.log(selectedSample);

//     buildPlots(selectedSample);
//     getDemo(selectedSample);
// }

// init();

