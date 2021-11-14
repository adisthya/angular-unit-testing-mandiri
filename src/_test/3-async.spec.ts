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

});
