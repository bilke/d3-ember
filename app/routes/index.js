var IndexRoute = Ember.Route.extend({
  redirect: function() {
    this.transitionTo('stations');
  }
});

export default IndexRoute;
