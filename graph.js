pengdatapromise = d3.json("penguins/classData.json");

pengdatapromise.then(

function(pengdata)
    { 
    var quizes = pengdata.quizes
    console.log(quizes),
        
    console.log(pengdata),
    console.log(getquizscrs(pengdata)),
  //console.log(get4allpeng(pengdata)) 
    console.log(generatepoints(pengdata))                                  
    }),
    
function (err)
    
    {
        console.log("broken", (err))
    }




var getquizscrs = function (peng)
{
    return
 peng.quizes.grades

}



//var get4allpeng = function (peng)
//{  
//   peng.map(getquizscore)
//}


var generatepoints = function (quizscrs)
{
    
    var arraycoord = quizscrs.map(function(quizscr,index)
    {
        
        var point= {}
        point.y = quizscr.quizes.grade
        point.x = index.quizes
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
    .attr("width",window.width)
    .attr("height",window.height)
    .append("g")
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
    .attr("tranform", "translate(25, "+marins.top+")")
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
        .attr("stroke",function (arr)
        {
            return Cscale(arr.name)
        })
        .attr("stroke-width",3)
    }

























