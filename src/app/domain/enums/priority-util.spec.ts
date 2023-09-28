import { Priority, PriorityUtil } from "./priority.enum"

describe('PriorityUtil', () => {

  it('gets enum key', () => {
    const key = PriorityUtil.getKey(Priority.HIGH);
    const expectedKey = 'HIGH';

    expect(key).toEqual(expectedKey)
  })

  it('returns null if doenst find key', () => {
    const key = PriorityUtil.getKey('TEST');

    expect(key).toBeNull();
  })

  it('gets iterable array of key and values', () => {
    const expectedArray = [
      {
        key: 'LOW',
        value: 'Low'
      },
      {
        key: 'MEDIUM',
        value: 'Medium'
      },
      {
        key: 'HIGH',
        value: 'High'
      }
    ]
    const array = PriorityUtil.getIterableArray();

    expect(array).toEqual(expectedArray)

  })

  it('gets value of the enum key', () => {
    const value = PriorityUtil.getValue('HIGH');
    const expectedValue = 'High';

    expect(value).toEqual(expectedValue)
  })

  it('returns empty value if doenst find the key', () => {
    const value = PriorityUtil.getValue('TESTE');
    const expectedValue = '';

    expect(value).toEqual(expectedValue)

  })
})
