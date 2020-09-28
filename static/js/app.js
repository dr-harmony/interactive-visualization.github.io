//###############################################################################
// Create the function to build plots 
//###############################################################################
function buildPlots(id) {
// Fetch the JSON data and console log it
    d3.json("samples.json").then (bbData =>{
        console.log(bbData)

        // Create variable for sample IDs
        var ids = bbData.names;
        console.log(`IDs: ${ids}`);
        
        // Filter list of IDs to select one ID to get data from for plots
        //var filterId = ids.filter(bbData.samples.id === id);
        var filterId = bbData.samples.findIndex((x) => x["id"] == id);
        console.log(`filterID: ${filterId}`);
    
        // Create variable for bacteria IDs in samples
        var otuids = bbData.samples[filterId].otu_ids;
        console.log(`OTU IDs: ${otuids}`)

        // Get only top 10 OTU IDs for the plot OTU and reverse the order
        var otuId = (otuids.slice(0, 10)).reverse();
        console.log(`OTU: ${otuId}`)
        // Get the OTU ID's in correct format
        var topTen = otuId.map(i => "OTU " + i);
        console.log(`OTU IDS: ${topTen}`)

        var sampleValues = bbData.samples[filterId].sample_values.slice(0,10).reverse();
        console.log(sampleValues)

        var labels =  bbData.samples[filterId].otu_labels.slice(0,10);
        console.log (labels)
        // Get the Top 10 labels for the plot
        var otuLabels =  labels.slice(0,10);
        console.log(`OTU Labels: ${otuLabels}`)  
    

            // Make a trace for the Top 10 Bar Chart
            var barTrace = [{
                x: sampleValues,
                y: topTen,
                text: labels,
                marker: {
                color: '008080'},
                type:"bar",
                orientation: "h",
            }];

            // Make Bar Chart layout
            var barLayout = {
                title: "Top 10 OTU",
                xaxis: {title: "Abundance"},
                yaxis: {
                    title: "OTU ID",
                    tickmode:"linear"},
                margin: {
                    l: 100,
                    r: 100,
                    t: 100,
                    b: 30
                }
            };

        // Create the Bar Chart
        Plotly.newPlot("bar", barTrace, barLayout);
        
            // Make a trace for the Bubble Chart
            var bubbleTrace = [{
                x: bbData.samples[filterId].otu_ids,
                y: bbData.samples[filterId].sample_values,
                mode: "markers",
                marker: {
                    size: bbData.samples[filterId].sample_values,
                    color: bbData.samples[filterId].otu_ids
                },
                text: ids.otu_labels

            }];

            // Make Bubble Chart layout
            var bubbleLayout = {
                xaxis: {title: "OTU ID"},
                yaxis: {title: "Abundance"},
                height: 600,
                width: 1000
            };
        // Create the Bubble Chart
        Plotly.newPlot("bubble", bubbleTrace, bubbleLayout); 
    });
}  

//###############################################################################
// Create the function to get data for Demographics Panel
//###############################################################################
function getDemo(id) {
// read the json file to get data
    d3.json("samples.json").then((data)=> {
    // get the metadata info for the demographic panel
        var metadata = data.metadata;
        console.log(`Metadata: ${metadata}`)

        // filter meta data info by id
        var result = metadata.filter(meta => meta.id.toString() === id)[0];
       
        // select demographic panel to put data
        var demographicInfo = d3.select("#sample-metadata");
        console.log(`demograhpic info: ${demographicInfo}`)
        
        // empty the demographic info panel each time before getting new id info
        demographicInfo.html("");

        // Grab the necessary demographic data data for each ID and append the info to the panel
        Object.entries(result).forEach((key) => {   
            demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
        });
    });
}

//###############################################################################
// Create the function for the switch event
//###############################################################################
//d3.selectAll("body").on("change", optionChanged);

function optionChanged(id) {
    // Use D3 to select the dropdown menu
    var dropdown = d3.selectAll("#selDataset");
    console.log(`Dropdown: ${dropdown}`)
    
    // Assign the dropdown menu option to a variable
    var selectedSample = dropdown.property("value");
    console.log(selectedSample);

    buildPlots(selectedSample);
    getDemo(selectedSample);
}

init();

// ###############################################################################
// Create the function for the default data rendering
// ###############################################################################

function init() {
    // Use D3 to select the dropdown menu
    var dropdown = d3.selectAll("#selDataset");

    // read the data 
    d3.json("samples.json").then((bbData)=> {
        console.log(bbData)

        // get the id data to the dropdwown menu
        bbData.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        // call the functions to display the data and the plots to the page
        buildPlots(bbData.samples[0].id);
        console.log(`initial sample: ${bbData.samples[0].id}`)
        getDemo(bbData.names[0]);
    });
}

init();