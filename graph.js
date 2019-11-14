pengdatapromise = d3.json("penguins/classData.json");

pengdatapromise.then(

function(pengdata)
    { 
    //var quizes = pengdata.quizes
    //console.log(quizes)
     console.log(pengdata)   
    //var peng = pengdata[0]
   // console.log(peng)
    //getquizscrs(peng)
    //getallquiz(peng)
    //var quizes = pengdata[0].quizes
    //console.log(quizes)
    //console.log(getquizscrs(pengdata)),
    //console.log(getallquiz(pengdata)),
    //console.log(get4allpeng(pengdata)),
    //console.log(getquizscrs(pengdata)),
  //console.log(get4allpeng(pengdata)) 
   // console.log(generatepoints(pengdata)),
    setup(pengdata);
    drawlines(pengdata);
    }),
    
function (err)
    {
        console.log("broken", (err))
    }




/*var getquizscrs = function (quiz)
{
    console.log(quiz.quizes[0].grade)
  return quiz.quizes[0].grade
}

var getallquiz = function (peng)
{
    console.log(quizes)
    var allquizes = quizes.map(getquizscrs)
    return allquizes
}

var get4allpeng = function (peng)
{  
   peng.map(getallquiz)
}*/


/*var generatepoints = function (quizscrs)
{
    
    var arraycoord = quizscrs.map(function(quizscr,index)
    {
        var point= {}
        point.y = quizscr
        point.x = index
        return point
        
    })
    return arraycoord
}*/


//screen and margins for graph
var window = {width: 500, height:500}
var margins = {top:10, right:50, left:50, bottom: 10}

var setup = function (pengdata)
{
    d3.select("svg")
    .attr("width", screen.width)
    .attr("height", screen.height)
    .append("g")
    .attr("id", "graph")
    .attr("transform", "translate("+margins.left+","+margins.top+")");
    
    var width = screen.width-margins.left-margins.right;
    var height = screen.height-margins.top-margins.bottom;
    
    var xScale = d3.scaleLinear().domain([0, 38]).range([0, width]);
    var yScale = d3.scaleLinear().domain([0, 10]).range([height, 0]);
    
    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);
    d3.select("svg").append("g").classed("axis", true);

    d3.select(".axis")
    .append("g")
    .attr("id", "xAxis")
    .attr("transform", "translate("+margins.left+","+(margins.top+height) + ")")
    .call(xAxis);

    d3.select(".axis")
    .append("g")
    .attr("id", "yAxis")
    .attr("transform", "translate(25, "+margins.top+")")
    .call(yAxis);
    
    drawlines(pengdata, xScale, yScale);
}


var drawlines = function(pengdata, xScale, yScale, Cscale)
    {
        
    var arrays = d3.select("#graph")
    .selectAll("g")
    .data(pengdata)
    .enter()
    .append("g")
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-width", 3)        
    var lineGenerator = d3.line()
    .x(function(arr, index){ return xScale(index) })
    .y(function(arr) {return yScale(arr.grade);})
    .curve(d3.curveNatural);
    
    arrays.append("path")
    .datum(function(obj){ return obj.quizes })
    .attr("d", lineGenerator);        
    }

























