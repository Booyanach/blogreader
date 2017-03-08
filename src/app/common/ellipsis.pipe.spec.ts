/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { EllipsisPipe } from './ellipsis.pipe';

describe('EllipsisPipe', () => {
  let pipe: EllipsisPipe;

  beforeEach(() => {
    pipe = new EllipsisPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('displays text if no number is passed in', async(() => {
    const longText = '1234567890';
    expect(pipe.transform(longText)).toBe('1234567890');
  }));

  it('adds an ellipsis if the text is longer than 5 characters', async(() => {
    const longText = '1234567890';
    expect(pipe.transform(longText, 5)).toBe('12345...');
  }));

  it(
    'does not add an ellipsis if the text is shorter than 5 characters',
    async(() => {
      const shortText = '1234';
      expect(pipe.transform(shortText, 5)).toBe('1234');
    })
  );
});
