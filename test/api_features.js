describe('The GitLogger API', function() {

  var host = 'http://localhost:9999';

  before(function() {
    casper.start(host);
  });

  it('Is able to be hit', function() {
    casper.thenOpen(host + '/api', function() {
      expect('body').to.include.text('"status":"The GitLogger API is currently running"');
    });
  });

});