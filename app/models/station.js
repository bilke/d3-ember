var Station = DS.Model.extend({
  name: DS.attr('string'),
  x: DS.attr('number'),
  y: DS.attr('number'),
  h: DS.attr('number'),
  measurements: DS.hasMany('measurement', { async: true })
});

Station.FIXTURES = [
  {
    id: 1,
    name: 'Station Bla',
    x: 641983.290,
    y: 5724785.740,
    h: 446.473,
    measurements: [3, 2, 1]
  },
  {
    id: 2,
    name: 'Station Blub',
    x: 641979.110,
    y: 5724788.790,
    h: 444.413,
    measurements: [3, 2]
  }
];

export default Station;
