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
    let myGraph = document.getElementById("myGraph");

    let trace1 = {};
    trace1.mode = "lines+markers";
    trace1.type = "scatter";
    trace1.name = "Revenue";
    trace1.marker = {
        size: 10
    };
    trace1.x = [];
    trace1.y = [];
    trace1.text = [];
    trace1.textposition = "bottom center";
    trace1.textfont = {
        family: "Raleway, sans-serif",
        size: 15,
        color: "blue"
    };

    for (let i = 0; i < res.length; i++) {
        trace1.x[i] = res[i]["學校名稱"];
        trace1.y[i] = res[i]["總數"];
        trace1.text[i] = res[i]["學年度"];
    }

    let data = [];
    data.push(trace1);


    let layout = {
        margin: {
            t: 80
        },
        title:"111學年年級人數"
    };
    Plotly.newPlot(myGraph, data, layout);
}

//bar chart
function drawBarChart(res){
    let trace1 = {};
    trace1.type = "bar";
    trace1.name = "男生";
    trace1.x = [];
    trace1.y = [];
    
    trace1.x[0] = "男生";
    trace1.y[0] = 男生計[0]['count'];
    trace1.x[1] = "女生";
    trace1.y[1] = 女生計[0]['count'];
    
    
    let data = [];
    data.push(trace1);

    
    let layout = {
        margin:{
            t:0
        },
    };
    
    Plotly.newPlot(myGraph, data, layout);
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
