import { from, Observable } from 'rxjs';

function fetchCallback(cb: (data: string) => void): void {
  setTimeout(() => {
    cb('Enigmacamp');
  }, 1000);
}

function fetchPromise(): Promise<string> {
  return new Promise((resolve) => {
    fetchCallback(resolve);
  });
}

function fetchObservable(): Observable<string> {
  return from(fetchPromise());
}

describe('3. Asynchronous unit test scenario', () => {
  const expected = 'Enigmacamp';

  describe('3.1. Test scenario for callback functions', () => {
    it(`actual should have value as ${expected}`, (done) => {
      fetchCallback((actual) => {
        expect(actual).toMatch(actual);
        done();
      })
    });
  });

  describe('3.2. Test scenario for promise functions', () => {
    it(`promised actual should have value as ${expected}`, (done) => {
      fetchPromise().then((actual) => {
        expect(actual).toMatch(expected);
        done();
      });
    });

    it(`promised actual should have value as ${expected} with async function`, async () => {
      const actual = await fetchPromise();

      expect(actual).toMatch(expected);
      expect(actual).toBeInstanceOf(String);
    });
  });

  describe('3.3. Test scenario for observable functions', () => {
    it(`subscribed actual should have value as ${expected}`, (done) => {
      fetchObservable().subscribe((actual) => {
        expect(actual).toMatch(expected);
        done();
      });
    });

    it(`subscribed actual should have value as ${expected} with async function`, async () => {
      const actual = await fetchObservable().toPromise();

      expect(actual).toMatch(expected);
    });
  });
});
