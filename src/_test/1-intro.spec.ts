describe('1. My first unit testing spec', () => {
  // unit testing specs or group

  describe('1.1. Group 1 variable one', () => {
    const one = Number(1);

    beforeEach(() => {
      console.log('before each');
    });

    beforeAll(() => {
      console.log('before all');
    });

    // test scenario
    it('should have value as 1', () => {

      // test case
      expect(one).toEqual(1);
      expect(one).toBeGreaterThan(0);
    });

    it('should be instance of Number', () => {
      expect(one).toBeInstanceOf(Number);
    });

    afterEach(() => {
      console.log('after each');
    });

    afterAll(() => {
      console.log('after all');
    })
  });

  describe('1.2. Group 2 variable hey', () => {
    const hey = String('hey');

    it('should have value as "hey"', () => {
      expect(hey).toEqual('hey');
    });

    it('should be instance of String', () => {
      expect(hey).toBeInstanceOf(String);
    });
  });
});

it('coba scenario', () => {
  expect('true').toBe('true');
});
