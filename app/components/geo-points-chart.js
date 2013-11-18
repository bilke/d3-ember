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
                     .center([11, 50])
                     .scale(2000)
                     .precision(0.1),
            tile = myTile()
                     .scale(projection.scale() * 2 * Math.PI)
                     .translate(projection([0, 0]))
                     .zoomDelta((window.devicePixelRatio || 1) - 0.5),
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

      var tiles = tile();
      g.append("g")
        .selectAll("image")
          .data(tiles)
        .enter().append("image")
          .attr("xlink:href", function(d) { return "http://" + ["a", "b", "c", "d"][Math.   random() * 4 | 0] + ".tiles.mapbox.com/v3/mapbox.natural-earth-2/" + d[2] + "/" + d[0] + "/" + d[1] + ".png"; })
          .attr("width", Math.round(tiles.scale))
          .attr("height", Math.round(tiles.scale))
          .attr("x", function(d) { return Math.round((d[0] + tiles.translate[0]) * tiles.   scale); })
          .attr("y", function(d) { return Math.round((d[1] + tiles.translate[1]) * tiles.   scale); });
      g.append("use")
          .attr("xlink:href", "#land")
          .attr("class", "stroke");

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

function myTile() {
  var size = [960, 500],
      scale = 256,
      translate = [size[0] / 2, size[1] / 2],
      zoomDelta = 0;

  function tile() {
    var z = Math.max(Math.log(scale) / Math.LN2 - 8, 0),
        z0 = Math.round(z + zoomDelta),
        k = Math.pow(2, z - z0 + 8),
        origin = [(translate[0] - scale / 2) / k, (translate[1] - scale / 2) / k],
        tiles = [],
        cols = d3.range(Math.max(0, Math.floor(-origin[0])), Math.max(0, Math.ceil(size[0] / k - origin[0]))),
        rows = d3.range(Math.max(0, Math.floor(-origin[1])), Math.max(0, Math.ceil(size[1] / k - origin[1])));

    rows.forEach(function(y) {
      cols.forEach(function(x) {
        tiles.push([x, y, z0]);
      });
    });

    tiles.translate = origin;
    tiles.scale = k;

    return tiles;
  }

  tile.size = function(_) {
    if (!arguments.length) return size;
    size = _;
    return tile;
  };

  tile.scale = function(_) {
    if (!arguments.length) return scale;
    scale = _;
    return tile;
  };

  tile.translate = function(_) {
    if (!arguments.length) return translate;
    translate = _;
    return tile;
  };

  tile.zoomDelta = function(_) {
    if (!arguments.length) return zoomDelta;
    zoomDelta = +_;
    return tile;
  };

  return tile;
};
