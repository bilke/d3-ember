
var MeasurementsController = Ember.ArrayController.extend({

  data: function() {
    window.console.log("AHHH");
    if (!this.get('model.content.isLoaded'))
      {return;}
    var data = this.map(function(measurement, index) {
      return {
        category: 'Value '+index,
        count: measurement.get('wtemp'),
      };
    });
    return data;
  }.property('model')
});

export default MeasurementsController;
