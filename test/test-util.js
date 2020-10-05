/*
 * Tools and data for the testing
 */
const TestUtil = {
    getRandomIP: () => {
        let ip = "";
        for(let i = 0; i < 4; i++) {
            ip += Math.floor(Math.random() * 255) + 1 + ".";
        }
        return ip.slice(0,-1);
    },

    getIPInfoTestData: () => {
        return {
            ip: TestUtil.getRandomIP(),
            region: "Hacktober",
            country_name: "Narnia",
            postal: "20201004",
            latitude: "14.5354108",
            longitude: "-74.9615538",
            org: "fest"
        }
    }
}

module.exports = TestUtil;