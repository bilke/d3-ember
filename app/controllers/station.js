var StationController = Ember.ObjectController.extend({
  data: function() {
    if (!this.get('content.isLoaded'))
      {return;}
    var data = [ {lon: this.get('lon'), lat: this.get('lat')} ];
    return data;
  }.property('model'),

  lonlat: function() {
    var utm   = "+proj=utm +zone=32",
        wgs84 = "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs",
            x = this.get('model.x'),
            y = this.get('model.y');
    return proj4(utm, wgs84, [x, y]);
  }.property('model.x', 'model.y'),

  lon: function() {
    return this.get('lonlat')[0];
  }.property('lonlat'),

  lat: function() {
    return this.get('lonlat')[1];
  }.property('lonlat')
});

export default StationController;
