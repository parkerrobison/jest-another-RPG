const Player = require('../lib/Player');
//imports the Potion constructor into the test. 
const Potion = require('../lib/Potion');
//jest.mock() mocks/replaces the constructor implementation with faked data from _mocks_.
jest.mock('../lib/Potion.js');

console.log(new Potion());

test('creates a player object', () => {
    const player = new Player('Dave');

    expect(player.name).toBe('Dave');
    expect(player.health).toEqual(expect.any(Number))
    expect(player.strength).toEqual(expect.any(Number))
    expect(player.agility).toEqual(expect.any(Number))
    expect(player.inventory).toEqual(
        expect.arrayContaining([expect.any(Object)])
    );
})