describe('homepage', function() {

  before(function() {
    casper.start('http://localhost:9999');
  });

  it('hello worlds', function() {
    casper.then(function() {
      expect('body').to.have.text('Hello World!');
    });
  });

});