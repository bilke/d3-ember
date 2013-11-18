var GeoPointsChartComponent = Ember.Component.extend({
  classNames: ['chart'],

  chart: new GeoPointsChart()
    .margin({left: 40, top: 40, bottom: 40, right: 40}),

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

export default GeoPointsChartComponent;

function GeoPointsChart() {
  var     margin = {top: 20, right: 20, bottom: 20, left: 20},
           width = 760,
          height = 760,
      projection = d3.geo.mercator()
                     .scale((width + 1) / 2 / Math.PI)
                     .translate([width / 2, -100 + height / 2])
                     .precision(0.1),
            path = d3.geo.path()
                     .projection(projection),
       graticule = d3.geo.graticule();

  function chart(selection) {
    selection.each(function(data) {

      // Select the svg element, if it exists.
      var svg = d3.select(this).selectAll("svg").data([data]);

      // Otherwise, create the skeletal chart.
      var gEnter = svg.enter().append("svg").append("g");

      // Update the outer dimensions.
      svg.attr("width", width + margin.left + margin.right)
         .attr("height", height + margin.top + margin.bottom);

      // Update the inner dimensions.
      var g = svg.select("g")
                 .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      g.selectAll("circle")
          .data(data)
          .enter()
          .append("circle")
          .attr("cx", function(d) {
              return projection([d.lon, d.lat])[0];
          })
          .attr("cy", function(d) {
              return projection([d.lon, d.lat])[1];
          })
          .attr("r", 5)
          .style("fill", "yellow")
          .style("opacity", 0.75);

      g.append("path")
          .datum(graticule)
          .attr("class", "graticule")
          .attr("d", path);
    });
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

  return chart;
}
