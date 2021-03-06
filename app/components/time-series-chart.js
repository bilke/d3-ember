var TimeSeriesChartComponent = Ember.Component.extend({
  classNames: ['chart'],

  chart: new TimeSeriesChart()
    .x(function(d) { return d.x; })
    .y(function(d) { return d.y; })
    .margin({left: 40, top: 40, bottom: 80, right: 40}),

  didInsertElement: function() {
    Ember.run.once(this, 'update');
  },

  update: function() {
    if (this.get('isLoaded')) {
      d3.select(this.$()[0])
        .data([ this.get('data') ])
        .call(this.get('chart'));
    }
  }.observes('data')
});

export default TimeSeriesChartComponent;

function TimeSeriesChart() {
  var margin = {top: 20, right: 20, bottom: 20, left: 20},
      width = 760,
      height = 120,
      duration = 500,
      xValue = function(d) { return d[0]; },
      yValue = function(d) { return d[1]; },
      xScale = d3.time.scale(),
      yScale = d3.scale.linear(),
      xAxis = d3.svg.axis().scale(xScale).orient("bottom"),
      yAxis = d3.svg.axis().scale(yScale).orient("left"),
      area = d3.svg.area().x(X).y1(Y),
      line = d3.svg.line().x(X).y(Y);

  function chart(selection) {
    selection.each(function(data) {

      // Convert data to standard representation greedily;
      // this is needed for nondeterministic accessors.
      data = data.map(function(d, i) {
        return [xValue.call(data, d, i), yValue.call(data, d, i)];
      });

      // Update the x-scale.
      xScale
          .domain(d3.extent(data, function(d) { return d[0]; }))
          .range([0, width - margin.left - margin.right]);

      // Update the y-scale.
      yScale
          //.domain([0, d3.max(data, function(d) { return d[1]; })]) // zero based
          .domain(d3.extent(data, function(d) { return d[1]; }))
          .range([height, 0]);

      // Select the svg element, if it exists.
      var svg = d3.select(this).selectAll("svg").data([data]);

      // Otherwise, create the skeletal chart.
      var gEnter = svg.enter().append("svg").append("g");
      gEnter.append("path").attr("class", "area");
      gEnter.append("path").attr("class", "line");
      gEnter.append("g").attr("class", "x axis");
      gEnter.append("g").attr("class", "y axis");

      // Update the outer dimensions.
      svg .attr("width", width)
          .attr("height", height);

      // Update the inner dimensions.
      var g = svg.select("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // Update the area path.
      g.select(".area")
          .transition()
          .duration(duration)
          .attr("d", area.y0(yScale.range()[0]));

      // Update the line path.
      g.select(".line")
          .transition()
          .duration(duration)
          .attr("d", line);

      // Update the x-axis.
      g.select(".x.axis")
          .attr("transform", "translate(0," + yScale.range()[0] + ")")
          .transition()
          .duration(duration)
          .call(xAxis);

      // Update the y-axis.
      g.select(".y.axis")
          .transition()
          .duration(duration)
          .call(yAxis);
    });

  }

  // The x-accessor for the path generator; xScale at xValue.
  function X(d) {
    return xScale(d[0]);
  }

  // The x-accessor for the path generator; yScale at yValue.
  function Y(d) {
    return yScale(d[1]);
  }

  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin = _;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.x = function(_) {
    if (!arguments.length) return xValue;
    xValue = _;
    return chart;
  };

  chart.y = function(_) {
    if (!arguments.length) return yValue;
    yValue = _;
    return chart;
  };

  return chart;
}
