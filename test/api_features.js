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

  it('Returns a list of commits for a given repo', function() {
    casper.thenOpen(host + '/api/commits/bebbs/BorisBikes', function() {
      expect('body').to.include.text('"message":"Update README.md"');
      expect('body').to.include.text('"sha":"4cb42e29da3dd347ea322166f93d73e278348c34"')
    });
  });

  it('Returns a list of commits for any repo', function() {
    casper.thenOpen(host + '/api/commits/tansaku/bowling_scorer_mvp_sequence', function() {
      expect('body').to.include.text('"message":"can play two frames"');
      expect('body').to.include.text('"message":"able to play a third frame"');
    });
  });

});