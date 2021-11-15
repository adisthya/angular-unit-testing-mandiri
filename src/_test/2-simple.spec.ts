import { fakeAsync, tick } from '@angular/core/testing';

class Person {
  firstName?: string;
  lastName?: string;

  constructor(firstName?: string, lastName?: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

describe('2. Simple unit test scenario', () => {
  describe('2.1. Test scenario for primitive data types.', () => {
    const one = 1;
    const greet = 'hey';
    const tested = true;
    const person = { firstName: 'John', lastName: 'Thor' };
    const persons = [ 'john thor', 'moon young' ];

    it('tested should have value as true', () => {
      expect(tested).toBe(true);
    });

    it('tested should not have value as false', () => {
      expect(tested).not.toBe(false);
    });

    it('one should have value as 1', () => {
      expect(one).toBe(1);
    });

    it('greet should have value as "hey"', () => {
      expect(greet).toBe('hey');
    });

    it('greet should contains "Enigma Camp" word', () => {
      const actual = `${greet}, welcome to Enigma Camp`;

      expect(actual).toMatch(/Enigma Camp/);
      expect(actual).toMatch('Enigma Camp');
    });

    it('person to be equal to object', () => {
      expect(person).toEqual({ firstName: 'John', lastName: 'Thor' });
    });

    it('person to be equal to object', () => {
      expect(persons).toEqual([ 'john thor', 'moon young' ]);
    });

    it('persons should contain "john thor"', () => {
      expect(persons).toContain('john thor');
    });
  });

  describe('2.2. Truthy and falsy value test scenario', () => {
    const truth = true;
    const lie = false;
    const zero = 0; //mewakili nilai false
    const one = 1;
    const blank = '';
    const filled = 'filled';
    const nullValue = null;
    let notDefined: any;
    const emptyObject = {};
    const emptyArray: any[] = [];

    it('truthy variables should passed the test', () => {
      expect(truth).toBeTruthy();
      expect(one).toBeTruthy();
      expect(filled).toBeTruthy();

      // expect(zero).toBeTruthy();
      // expect((zero - one)).toBeTruthy();
      expect(emptyObject).toBeTruthy();
      expect(emptyArray).toBeTruthy();
    });

    it('falsy variables should passed the test', () => {
      expect(lie).toBeFalsy();
      expect(zero).toBeFalsy();
      expect(blank).toBeFalsy();
      expect(nullValue).toBeFalsy();
      expect(notDefined).toBeFalsy();

      // expect(one).toBeFalsy();
      // expect((zero - one)).toBeFalsy();
      // expect(emptyObject).toBeFalsy();
      // expect(emptyArray).toBeFalsy();
    });

    it('boolean variables should have value as true', () => {
      expect(truth).toBeTrue();
      // expect(one).toBeTrue();
    });

    it('boolean variables should have value as false', () => {
      expect(lie).toBeFalse();
      expect(lie).toBeFalsy();

      // expect(zero).toBeFalse();
      // expect(nullValue).toBeFalse();
      // expect(notDefined).toBeFalse();
    });
  });

  describe('2.3. Object and array value test scenario', () => {
    const actualPerson: Person = new Person('John', 'Thor');
    const expectedPerson: Person = new Person('John', 'Thor');
    const persons: Person[] = [
      new Person('John', 'Thor'),
      new Person('Moon', 'Young'),
    ];

    it('actualPerson should be EQUAL to expectedPerson and instance of Person', () => {
      // expect(actualPerson).toBe(expectedPerson);
      expect(actualPerson).toEqual(expectedPerson);
      expect(actualPerson).toBeInstanceOf(Person);
    });

    xit('generic person object should be EQUAL to expectedPerson', () => {
      const newPerson: Person = { firstName: 'John', lastName: 'Thor' };

      expect(newPerson.firstName).toEqual(expectedPerson.firstName);
      // expect(newPerson).toEqual(expectedPerson); // gagal, karena newPerson adalah instance dari Object generic.
      expect(newPerson).toBeInstanceOf(Person);
    });

    xit('persons should be array of Person', () => {
      const newPerson: Person = { firstName: 'John', lastName: 'Thor' };

      persons.push(newPerson);

      for (const person of persons) {
        expect(person).toBeInstanceOf(Person);
      }
    });
  });

  describe('2.4. FakeAsync and tick test scenario', () => {
    it('asynchronous test without fakeAsync', (done) => {
      let test = false;
      const asyncFunction = () => {
        setTimeout(() => {
          test = true;
          expect(test).toBeTrue();
          done();
        }, 1000);
      };

      asyncFunction();
      // expect(test).toBeTrue();
    });
  });

  it('asynchronous test with fakeAsync', fakeAsync(() => {
    let test = false;
    const asyncFunction = () => {
      setTimeout(() => {
        test = true;
      }, 1000);
    };

    asyncFunction();

    tick(500);

    expect(test).toBeFalse();

    tick(500);

    expect(test).toBeTrue();
  }));
});
