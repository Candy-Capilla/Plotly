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
            title: "Top 10 OTU",
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


    })
}