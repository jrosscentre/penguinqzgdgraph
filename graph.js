pengdatapromise = d3.json("penguins/classData.json");

pengdatapromise.then(

function(pengdata)
    { 
    //var quizes = pengdata.quizes
    //console.log(quizes)
        
    var peng = pengdata[0]
    console.log(peng)
    getquizscrs(peng)
    getallquiz(peng)
    //console.log(getquizscrs(pengdata)),
    //console.log(getallquiz(pengdata)),
    //console.log(get4allpeng(pengdata)),
    //console.log(getquizscrs(pengdata)),
  //console.log(get4allpeng(pengdata)) 
    console.log(generatepoints(pengdata)), setup(pengdata)
    drawlines(pengdata)
    }),
    
function (err)
    {
        console.log("broken", (err))
    }




var getquizscrs = function (quiz)
{
    console.log(quiz.quizes[0].grade)
  return quiz.quizes[0].grade
}

var getallquiz = function (quizes)
{
    console.log(quizes.quizes[0])
    var allquizes = quizes.map(getquizscrs)
    return allquizes
}

var get4allpeng = function (peng)
{  
   peng.map(getallquiz)
}


var generatepoints = function (quizscrs)
{
    
    var arraycoord = quizscrs.map(function(quizscr,index)
    {
        var point= {}
        point.y = quizscr
        point.x = index
        return point
        
    })
    return arraycoord
}


//screen and margins for graph
var window = {width: 500, height:500}
var margins = {top:10, right:10, left:10, bottom: 10}

var setup = function (array2D)
{
    d3.select("svg")
    .append("g")
    .attr("width",window.width)
    .attr("height",window.height)
    .attr("id","graph")
    .attr("transform", "translate("+margins.left+","+margins.top+")");
    
//defining the width based on previous para
    var width = window.width-margins.left-margins.right;
    
    var height = window.height-margins.bottom-margins.top;
    
    var Xscale = d3.scaleLinear()
    .domain([0.38])
    .range([0,width])
    
    var Yscale = d3.scaleLinear()
    .domain([0,10])
    .range([0,height])
    //retrieves color scale
    //var Cscale = 
    //assigns an axis to the scale specs
    var Xaxis = d3.axisBottom(Xscale)
    var Yaxis = d3.axisLeft(Yscale)
    
   var axis = d3.select("svg")
    .select("g")
   
   axis.append("g")
    .attr("id", "Xaxis")
    .attr("tranform", "translate("+margins.left+", "+(margins.top+height)+")")
    .call(Xaxis)
    
   axis.append("g")
    .attr("id", "Yaxis")
    .attr("tranform", "translate(25, "+margins.top+")")
    .call(Yaxis) 
}


var drawlines = function(array2D, Xscale, Yscale, Cscale)
    {
        var arrays = d3.select("#graph")
        .selectAll("g")
        .data(array2D)
        .enter()
        .append("g")
        .attr("fill","none")
       // .attr("stroke",function (arr)
        //{
        //    return Cscale(arr.name)
        //})
        .attr("stroke-width",3)
        arrays.datum(function(peng){return peng.quizes})
    }

























