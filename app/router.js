var Router = Ember.Router.extend(); // ensure we don't share routes between all Router instances

Router.map(function() {
  this.route('component-test');
  this.route('helper-test');
  this.resource('stations', function() {
    this.resource('station', { path: ':station_id' });
  });
});

export default Router;
