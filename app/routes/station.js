var StationRoute = Ember.Route.extend({
  model: function(params) {
    return this.get('store').find('station', params.station_id);
  }
});

export default StationRoute;
