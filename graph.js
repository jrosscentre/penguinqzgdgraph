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
var margins = {top:10, right:10, left:10, bottom: 10}

var setup = function (pengdata)
{
    d3.select("svg")
    .attr("width",window.width)
    .attr("height",window.height)
    .append("g")
    .attr("id","graph")
    .attr("transform", "translate("+margins.left+","+margins.top+")");
    
//defining the width based on previous para
    var width = window.width-margins.left-margins.right;
    var height = window.height-margins.top-margins.bottom;
    
    var Xscale = d3.scaleLinear()
    .domain([0.38])
    .range([0,width])
    
    var Yscale = d3.scaleLinear()
    .domain([0,10])
    .range([0,height])
    //retrieves color scale
    //var Cscale = d3.scaleOrdinal(d3.schemeTableau10)
    //assigns an axis to the scale specs
    var Xaxis = d3.axisBottom(Xscale)
    var Yaxis = d3.axisLeft(Yscale)
    
   d3.select("svg")
    .append("g")
    .attr("id", "#axis");
   
   d3.select("#axis")
    .append("g")
    .attr("id", "Xaxis")
    .attr("transform", "translate("+margins.left+", "+(margins.top+height)+")")
    .call(Xaxis);
    
   d3.select("#axis")
    .append("g")
    .attr("id", "Yaxis")
    .attr("transform", "translate(25, "+margins.top+")")
    .call(Yaxis) ;
    
    drawlines(pengdata, Xscale, Yscale);
}


var drawlines = function(pengdata, Xscale, Yscale, Cscale)
    {
        
        var arrays = d3.select("#graph")
        .selectAll("g")
        .data(pengdata)
        .enter()
        .append("g")
        .attr("fill","none")
        .attr("stroke", "black")
        .attr("stroke-width",3)
        
        var lineGenerator = d3.line()
        .x(function(quizes){return quizes.day})
        .y(function(quizes){return quizes.grade})
        .curve(d3.curveNatural)
      
        arrays.datum(function(peng){console.log(peng);
                                    return peng.quizes})
        .append('path')
        .attr("d",lineGenerator)
        
    }

























