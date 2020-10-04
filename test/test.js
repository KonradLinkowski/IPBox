const {getIPInfo} = require('../lib/ipinfo');
const database = require('../lib/database');
const TestUtil = require('./test-util');
const assert = require('assert');

const ipInfoTestData = TestUtil.getIPInfoTestData();

describe('IP Info', function () {

    describe('getIPInfo', function () {
        it('should fetch info about specific IP', async function () {
            const ip = "186.12.170.197";
            const result = await getIPInfo(ip)

            assert.strictEqual(result.ip, ip,"IP info not fetched");
        });
    });

    describe('addEntry', function () {
        it('should add new entry to database', async function () {
            let result = await database.addEntry(ipInfoTestData);
            assert.strictEqual(result.ip, ipInfoTestData.ip ,"IP Info saved");
        })
    })

    describe('addEntry', function () {
        it('should throw duplicate key exception', async function () {
            await assert.rejects(async () => {
                await database.addEntry(ipInfoTestData)
            }, {code: 11000}, "Entry wasn't rejected for duplicate key");
        })
    })
});