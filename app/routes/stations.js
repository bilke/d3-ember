var StationsRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('station');
  }
});

export default StationsRoute;
