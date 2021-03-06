import { types as sdkTypes } from './sdkLoader';
import {
  required,
  requiredStringNoTrim,
  minLength,
  maxLength,
  moneySubUnitAmountAtLeast,
  composeValidators,
} from './validators';

const { Money } = sdkTypes;

describe('validators', () => {
  describe('required()', () => {
    it('should not allow no value', () => {
      expect(required('fail')()).toEqual('fail');
    });
    it('should not allow undefined', () => {
      expect(required('fail')(undefined)).toEqual('fail');
    });
    it('should not allow null', () => {
      expect(required('fail')(null)).toEqual('fail');
    });
    it('should not allow empty string', () => {
      expect(required('fail')('')).toEqual('fail');
    });
    it('should not allow string with only whitespace', () => {
      expect(required('fail')(' ')).toEqual('fail');
    });
    it('should allow boolean false', () => {
      expect(required('fail')(false)).toBeUndefined();
    });
    it('should allow boolean true', () => {
      expect(required('fail')(true)).toBeUndefined();
    });
    it('should allow numeric 0', () => {
      expect(required('fail')(0)).toBeUndefined();
    });
    it('should allow nonempty string', () => {
      expect(required('fail')('abc')).toBeUndefined();
    });
    it('should allow empty array', () => {
      expect(required('fail')([])).toBeUndefined();
    });
    it('should allow empty object', () => {
      expect(required('fail')({})).toBeUndefined();
    });
  });
  describe('requiredStringNoTrim()', () => {
    it('should not allow no value', () => {
      expect(requiredStringNoTrim('fail')()).toEqual('fail');
    });
    it('should not allow undefined', () => {
      expect(requiredStringNoTrim('fail')(undefined)).toEqual('fail');
    });
    it('should not allow null', () => {
      expect(requiredStringNoTrim('fail')(null)).toEqual('fail');
    });
    it('should not allow empty string', () => {
      expect(requiredStringNoTrim('fail')('')).toEqual('fail');
    });
    it('should allow string with only whitespace', () => {
      expect(requiredStringNoTrim('fail')(' ')).toBeUndefined();
    });
    it('should allow string with chars', () => {
      expect(requiredStringNoTrim('fail')('abc')).toBeUndefined();
    });
  });
  describe('minLength()', () => {
    it('should not allow no value', () => {
      expect(minLength('fail', 3)()).toEqual('fail');
    });
    it('should not allow undefined', () => {
      expect(minLength('fail', 3)(undefined)).toEqual('fail');
    });
    it('should not allow null', () => {
      expect(minLength('fail', 3)(null)).toEqual('fail');
    });
    it('should not allow empty string', () => {
      expect(minLength('fail', 3)('')).toEqual('fail');
    });
    it('should allow string with only whitespace', () => {
      expect(minLength('fail', 3)('    ')).toBeUndefined();
    });
    it('should allow string with enough length', () => {
      expect(minLength('fail', 3)('abc')).toBeUndefined();
    });
    it('should allow string with enough length after trim', () => {
      expect(minLength('fail', 3)(' abc ')).toBeUndefined();
    });
    it('should not allow empty arrays', () => {
      expect(minLength('fail', 3)([])).toEqual('fail');
    });
    it('should not allow too short arrays', () => {
      expect(minLength('fail', 3)([1, 2])).toEqual('fail');
    });
    it('should allow arrays with enough length', () => {
      expect(minLength('fail', 3)([1, 2, 3])).toBeUndefined();
    });
  });
  describe('maxLength()', () => {
    it('should allow no value', () => {
      expect(maxLength('fail', 3)()).toBeUndefined();
    });
    it('should allow undefined', () => {
      expect(maxLength('fail', 3)(undefined)).toBeUndefined();
    });
    it('should allow null', () => {
      expect(maxLength('fail', 3)(null)).toBeUndefined();
    });
    it('should allow empty string', () => {
      expect(maxLength('fail', 3)('')).toBeUndefined();
    });
    it('should allow string that short enough', () => {
      expect(maxLength('fail', 3)('abc')).toBeUndefined();
    });
    it('should allow string that short enough', () => {
      expect(maxLength('fail', 3)('abc')).toBeUndefined();
    });
    it('should nost allow string with extra whitespace', () => {
      expect(maxLength('fail', 3)('abc ')).toEqual('fail');
    });
    it('should allow empty array', () => {
      expect(maxLength('fail', 3)([])).toBeUndefined();
    });
    it('should allow array with max length', () => {
      expect(maxLength('fail', 3)([1, 2, 3])).toBeUndefined();
    });
    it('should not allow too long array', () => {
      expect(maxLength('fail', 3)([1, 2, 3, 4])).toEqual('fail');
    });
  });
  describe('moneySubUnitAmountAtLeast()', () => {
    it('should not allow empty or missing value', () => {
      expect(moneySubUnitAmountAtLeast('fail', 50)(undefined)).toEqual('fail');
      expect(moneySubUnitAmountAtLeast('fail', 50)(null)).toEqual('fail');
      expect(moneySubUnitAmountAtLeast('fail', 50)('')).toEqual('fail');
      expect(moneySubUnitAmountAtLeast('fail', 50)(0)).toEqual('fail');
      expect(moneySubUnitAmountAtLeast('fail', 50)(50)).toEqual('fail');
      expect(moneySubUnitAmountAtLeast('fail', 50)(100)).toEqual('fail');
    });
    it('should not allow too low values', () => {
      expect(moneySubUnitAmountAtLeast('fail', 50)(new Money(0, 'USD'))).toEqual('fail');
      expect(moneySubUnitAmountAtLeast('fail', 50)(new Money(49, 'USD'))).toEqual('fail');
    });
    it('should allow large enough values', () => {
      expect(moneySubUnitAmountAtLeast('fail', 0)(new Money(0, 'USD'))).toBeUndefined();
      expect(moneySubUnitAmountAtLeast('fail', 50)(new Money(50, 'USD'))).toBeUndefined();
      expect(moneySubUnitAmountAtLeast('fail', 50)(new Money(100, 'USD'))).toBeUndefined();
    });
  });
  describe('composeValidators()', () => {
    const validateLength = composeValidators(minLength('minLength', 4), maxLength('maxLength', 6));

    it('should fail on composed minLength (4) and maxLength (6): undefined', () => {
      expect(validateLength(undefined)).toEqual('minLength');
    });
    it('should fail on composed minLength (4) and maxLength (6): null', () => {
      expect(validateLength(null)).toEqual('minLength');
    });

    it('should fail on composed minLength (4) and maxLength (6): bad', () => {
      expect(validateLength('bad')).toEqual('minLength');
    });
    it('should fail on composed minLength (4) and maxLength (6): longword', () => {
      expect(validateLength('longword')).toEqual('maxLength');
    });
    it('should allow on composed minLength (4) and maxLength (6): good', () => {
      expect(validateLength('good')).toBeUndefined();
    });

    it('should fail on composed required and minLength (4): empty string. Error: required', () => {
      const requiredWithMinLength = composeValidators(
        required('required'),
        minLength('minLength', 6)
      );
      expect(requiredWithMinLength('')).toEqual('required');
    });
    it('should fail on composed minLength (4) and required: empty string. Error: minLength', () => {
      const requiredWithMinLength = composeValidators(
        minLength('minLength', 4),
        required('required')
      );
      expect(validateLength('')).toEqual('minLength');
    });
  });
});
