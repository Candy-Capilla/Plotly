function createPlots () {
    //read samples.json
    d3.json("samples.json").then (sampledata => {
        console.log(sampledata)
        //get only top 10 otu ids and reverse
        var otutop10 = sampledata.samples[0].otu_ids.slice(0,10).reverse;
        console.log(ids)
        var sampleValues = sampledata.samples[0].samples_values.slice(0,10).reverse();
        console.log(sampleValues)
        var labels = sampledata.samples[0].otu_labels.slice(0,10);
        console.log(labels)
        //get otu id's for plot
        var OTU_id = OTU_top.map(id => "OTU" + id);
        console.log(`OTU IDS: ${OTU_id}`)
        //create trace
        var trace = {
            x: sampleValues,
            y: OTU_id,
            text: labels,
            marker: {
            color: 'blue'},
            type: "bar",
            orientation: "h",
        };
        //create data variable
        var data = [trace];

        //create layout
        var layout = {
            title: "Top 10 operational taxonomic units",
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

//Now the bubble chart
    var trace1 = {
        x: sampledata.samples[0].otu_ids,
        y: sampledata.samples[0].sample_values,
        mode: "markers",
        marker: {
            size: sampledata.samples[0].sample_values,
            color: sampledata.samples[0].otu_ids
        },
        text: sampledata.samples[0].otu_labels
    };
    //set layout for bubble plot
    var layout_2 = {
        xaxis: {title:"OTU ID"},
        height: 600,
        width: 1000
    };
    //create data variable
    var data1 = [trace1];
    //create bubbles
    Plotly.newPlot("bubble", data1, layout_2);

    });
}