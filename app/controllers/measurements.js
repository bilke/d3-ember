
var MeasurementsController = Ember.ArrayController.extend({

  data: function() {
    if (!this.get('model.content.isLoaded'))
      {return;}
    var data = this.map(function(measurement, index) {
      return {
        category: 'Value '+index,
        count: measurement.get('wtemp'),
      };
    });
    return data;
  }.property('model'),

  data2: function() {
    if (!this.get('model.content.isLoaded'))
      {return;}
    //var wtemp = [], leitf = [], pegel = [];
    var wtemp = this.map(function(measurement, index) {
      return {
        x: measurement.get('timestamp'),
        y: measurement.get('wtemp'),
      };
    });
    var leitf = this.map(function(measurement, index) {
      return {
        x: measurement.get('timestamp'),
        y: measurement.get('leitf'),
      };
    });
    //var data = [ wtemp, leitf ];
    return wtemp;
  }.property('model')

});

export default MeasurementsController;
