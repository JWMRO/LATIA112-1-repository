d3.csv("https://raw.githubusercontent.com/JWMRO/LATIA112-1-repository/main/111_student.csv").then(
    res => {
        console.log(res);
        drawLineChart.log(res);
        drawBarChart.log(res);
        drawPieChart.log(res);
    }
)

//line chart

function drawLineChart(res){

}
//bar chart
function drawBarChart(res){

}

// pie chart
function drawPieChart(res){
    let myGraph = document.getElementById('myGraph');

    let trace1 = {};
    trace1.type = 'pie';
    trace1.title = "111年學校男女比";
    trace1.labels = ['男生', '女生'];
    trace1.values = [0, 0];
    trace1.hole = 0.5;
    
    
    for (let x = 0; x < res.length; x++) {
        if (res[x]['總數']=='男生計') {
            trace1.values[0] += 1;
        } else {
            trace1.values[1] += 1;
        }
    let data = [];
    data.push(trace1);
    
    let layout = {
        margin:{
            t:10,
            l:0
        }
    };
    
    Plotly.newPlot(myGraph, data, layout);}
}
