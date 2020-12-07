var date_parse = d3.timeParse("%Y-%m-%d");
d3.dsv(',','AMZN.csv',function(d){
    return {
        date:date_parse(d.Date),
        value:+d.Close
    };
}).then(function(data){
    console.log(data);

    var margin = {top: 20, right: 20, bottom: 20, left: 40},
        width = 800 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;
        tooltip = { width: 100, height: 100, x: 10, y: -30};

    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")"
        );

    var xscale = d3.scaleTime().range([0, width]);
    xscale.domain(d3.extent(data, function(d) { return d.date; }));
    var yscale = d3.scaleLinear().range([height, 0]);
    yscale.domain([d3.min(data, function(d) { return d.value; })-5,5000]);

    var valueline = d3.line()
        .x(function(d) { return xscale(d.date); })
        .y(function(d) { return yscale(d.value);  });

    svg.append("path")
        .datum(data)
        .attr("fill", "gray")
        .attr("stroke", "teal")
        .attr("stroke-width", 2)
        .attr("d", valueline);

    var yAxis = d3.axisRight(yscale)
    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(0," + 0 + ")")
        .call(yAxis);

    var xAxis = d3.axisBottom(xscale)
        .tickFormat(d3.timeFormat("%Y-%m-%d"));
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);});
