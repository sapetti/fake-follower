const os = require('os');
const ifaces = os.networkInterfaces()
const puppeteer = require('puppeteer')

// 25 minutes * 60 seconds * 1000 millis
const TOTAL_MS = 25 * 60 * 1000

module.exports.getIp = function() {
    let ips = []
    Object.keys(ifaces)
    .forEach((ifname) => {
        let alias = 0;
        ifaces[ifname].forEach((iface) => {
            // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
            if ('IPv4' !== iface.family || iface.internal !== false) 
                return;
            
            if (alias >= 1) {
                // this single interface has multiple ipv4 addresses
                ips = [ ...ips, iface.address ]
            } else {
                // this interface has only one ipv4 adress
                ips = [ ...ips, iface.address ]
            }
            ++alias;
        });
    });
    return ips;
}

module.exports.visitPage = function(url) {
    const timeout = Math.floor(Math.random () * TOTAL_MS)
    
    // Add just some arbitrary request
    const randNumber = Math.random()
    if(randNumber >= 0.6) {
        console.log(`Skipping ${url}`)
        return
    }
    
    setTimeout(async () => {
        try {
            console.log(`Visiting ${url}`)
            const browser = await puppeteer.launch(
                {
                    args: [
                      '--no-sandbox',
                      '--disable-setuid-sandbox',
                    ]
                }
            );
            const page = await browser.newPage();
            await page.goto(url);    
            await browser.close();
        } catch(error) {
            console.error(error)
        }
    }, timeout);
}
