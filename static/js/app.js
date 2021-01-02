function createcharts(sample){
console.log (sample)


//.filter on ID

}
//build dropdown for ID
d3.json("samples.json").then((samples)=>{
console.log(samples)
var selection = d3.select("#selDataset")
samples.names.forEach((ID)=> {
    selection.append("option").text(ID).property("value",ID)
})
createcharts(sample.names[0])
})
function optionChanged (value){

createcharts(value)
}