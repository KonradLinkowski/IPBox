const {getIPInfo} = require('../lib/ipinfo');
const database = require('../lib/database');
const TestUtil = require('./test-util');
const assert = require('assert');

const ipInfoTestData = TestUtil.getIPInfoTestData();

describe('IP Info', () => {

    describe('getIPInfo', () => {
        it('should fetch info about specific IP', async () => {
            const ip = "186.12.170.197";
            const result = await getIPInfo(ip)

            assert.strictEqual(result.ip, ip,"IP info not fetched");
        });
    });

    describe('addEntry', () => {
        it('should add new entry to database', async () => {
            const result = await database.addEntry(ipInfoTestData);
            assert.strictEqual(result.ip, ipInfoTestData.ip ,"IP Info saved");
        })

        it('should throw duplicate key exception', async () => {
            await assert.rejects(async () => {
                await database.addEntry(ipInfoTestData)
            }, {code: 11000}, "Entry wasn't rejected for duplicate key");
        })
    })
});