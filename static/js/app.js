function createPlots() {
    //read samples.json
    d3.json("samples.json").then(sampledata => {
        //console.log(sampledata)
        //top 10 samples and values
        var otuTop10 = sampledata.samples[0].otu_ids.slice(0,10).reverse();
        //console.log(otuTop10)
        var sampleValuesTop10 = sampledata.samples[0].sample_values.slice(0,10).reverse();
        //console.log(sampleValuesTop10)
        var labelsTop10 = sampledata.samples[0].otu_labels.slice(0,10);
        //console.log(labelsTop10)
        //get otu id's for plot
        var otuIdsTop10 = otuTop10.map(id => "OTU" + id);
    
        //create trace
        var trace = {
            x: sampleValuesTop10,
            y: otuIdsTop10,
            text: labelsTop10,
            marker: {
            color: 'blue'},
            type: "bar",
            orientation: "h"
        };
        //create data variable
        var data = [trace];

        //create layout
        var layout = {
            title: "Top 10 Operational Taxonomic Units",
            yaxis:{
                tickmode:"linear",
            },
            margin: {
                l:100,
                r:100,
                t:100,
                b:30
            }
    
        };
        //create the bar plot
        Plotly.newPlot("bar", data, layout);

        // create variables for all 
        var otuAll = sampledata.samples[0].otu_ids;
        var sampleValuesAll = sampledata.samples[0].sample_values;
        var labelsAll = sampledata.samples[0].otu_labels;

        //Now the bubble chart
        var trace1 = {
            x: otuAll,
            y: sampleValuesAll,
            mode: "markers",
            marker: {
                size: sampleValuesAll,
                color: otuAll
            },
            text: labelsAll
        };
        //create data variable
        var data1 = [trace1];
        //set layout for bubble plot
        var layout1 = {
            xaxis: {title:"OTU ID"},
            height: 600,
            width: 1000
        };
        //create bubbles
        Plotly.newPlot("bubble", data1, layout1);

        // create variable for metadata
        var metadata = data.metadata;
        // create variable for filtered metadata by id
        var filtermeta = metadata.filter(meta => meta.id.toString() === id)[0];
        console.log(MetaData)
        plotGaugeChart();
    });
}

    // create function to get metadata
    function MetaData(id) {
        //read samples.json
        d3.json("samples.json").then((data) =>{
            // create variable for metadata
            var metadata = data.metadata;
            // create variable for filtered metadata by id
            var filtermeta = metadata.filter(meta => meta.id.toString() === id)[0];
            // create variable to select demographics panel using d3
            var demoPanel = d3.select("#sample-metadata");
            // empty panel before getting new info
            demoPanel.html("");
            // grab the necessary metadata for the id and append to the demographics panel
            Object.entries(filtermeta).forEach((key) => {
                demoPanel.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");
            });
        });
    }
    // create function for change event
    function optionChanged(id) {
        createPlots(id);
        MetaData(id);
    }
    // create funcition for initial rendering of data and choose id in dropdown menu
    function init() {
        // select the dropdown menu
        var dropdown = d3.select("#selDataset");
        // read samples.json
        d3.json("samples.json").then((data) => {
            // choose the id for the dropdown menu
            data.names.forEach(function(name) {
                dropdown.append("option").text(name).property("value");
            });
            // call the functions to display the data and the plots to the page
            createPlots(data.names[0]);
            MetaData(data.names[0]);
        })
    }
    init();