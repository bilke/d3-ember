var LineChart = Ember.Component.extend({
  classNames: ['lineChart'],

  lineChart: new LineChart(),

  didInsertElement: function() {
    Ember.run.once(this, 'update');
  },

  //update: function() {
  //  if (this.get('isLoaded')) {
  //    d3.select(this.$()[0])
  //      .data([ this.get('data') ])
  //      .call(this.get('chart'));
  //  }
  //}.observes('data')
});

function myData() {
  var series1 = [];
  for(var i =1; i < 100; i ++) {
    series1.push({
      x: i, y: 100 / i
    });
  }

  return [
    {
      key: "Series #1",
      values: series1,
      color: "#0000ff"
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
    .tickFormat(d3.format("d"))
    ;

  d3.select("svg")
    .datum(myData())
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
