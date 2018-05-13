import valueIn from '../valueIn';

describe('valueIn', function() {
  let target;
  beforeEach(function() {
    target = {
      a: {
        b: {
          c: 'correct',
          cprime: '3rd level incorrect',
        },
        bprime: '2nd level incorrect',
      },
      aprime: '1st level incorrect',
    };
  });
  it('returns undefined for undefined target', function() {
    expect(valueIn(undefined, 'hejej')).to.be.undefined;
  });

  it('returns undefined for target that is null', function() {
    expect(valueIn(null, 'hejej')).to.be.undefined;
  });

  it('returns expected value for key on third level', function() {
    expect(valueIn(target, 'a.b.c')).to.equal(target.a.b.c);
  });
});
