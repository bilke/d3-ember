var Measurement = DS.Model.extend({
  timestamp: DS.attr('date'),
  wtemp: DS.attr('number'),
  leitf: DS.attr('number'),
  pegel: DS.attr('number'),
  station: DS.belongsTo('station')
});

Measurement.FIXTURES = [
  {
    id: 1,
    timestamp: moment( '25.07.12 23:55:00', 'DD.MM.YY HH:mm:ss' ).toDate(),
    wtemp: 27.07,
    leitf: 146,
    pegel: 17.6925,
    station: 1
  },
  {
    id: 2,
    timestamp: moment( '25.07.12 23:45:00', 'DD.MM.YY HH:mm:ss' ).toDate(),
    wtemp: 17.11,
    leitf: 146,
    pegel: 17.6575,
    station: 2
  },
];

export default Measurement;
