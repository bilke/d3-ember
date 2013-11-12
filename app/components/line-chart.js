var LineChart = Ember.Component.extend({
  classNames: ['lineChart'],

  lineChart: new LineChart(),

  didInsertElement: function() {
    Ember.run.once(this, 'update');
  },

  update: function() {
    if (this.get('isLoaded')) {
      d3.select(this.$()[0])
        .data([ this.get('data') ])
        .call(this.get('chart.update'));
    }
  }.observes('data')
});


function sinAndCos() {
  var sin = [],
      cos = [];

  for (var i = 0; i < 100; i++) {
    sin.push({x: i, y: Math.sin(i/10)});
    cos.push({x: i, y: 0.5 * Math.cos(i/10)});
  }

  return [
    {
      values: sin,
      key: 'Sine Wave',
      color: '#ff7f0e'
    },
    {
      values: cos,
      key: 'Cosine Wave',
      color: '#2ca02c'
    }
  ];
}

function LineChart() {
  nv.addGraph(function() {
  var chart = nv.models.lineChart();

  chart.xAxis
    .axisLabel("X-axis Label");

  chart.yAxis
    .axisLabel("Y-axis Label")
    .tickFormat(d3.format("0.02f"))
    ;

  d3.select("svg")
    //.datum(sinAndCos())
    .transition().duration(500).call(chart);

  nv.utils.windowResize(
      function() {
        chart.update();
      }
    );

  return chart;
});
}

export default LineChart;
