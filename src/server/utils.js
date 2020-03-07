const os = require('os');
const ifaces = os.networkInterfaces();

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
