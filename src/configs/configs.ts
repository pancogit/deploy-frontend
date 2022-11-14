interface ServerConfig {
    serverPort: number;
    serverLocalAddress: string;
    serverRemoteAddress: string;
    useServerRemoteAddress: boolean;
}

// when server is deployed, then it's always use HTTPS 443 predefined port
// there are cases when HTTP 80 port can be used for secured HTTPS 443
// transfer when port 443 is not available
// other ports than HTTPS 443 will not work on production site or app
const serverConfigurations: ServerConfig = {
    serverPort: 443,
    serverLocalAddress: "localhost",
    serverRemoteAddress: "0.0.0.0",

    // use true - online development (when deployed)d
    // use false - local development (when debugging)
    useServerRemoteAddress: true,
};

const serverAddress =
    serverConfigurations.useServerRemoteAddress === true
        ? serverConfigurations.serverRemoteAddress
        : serverConfigurations.serverLocalAddress;

// use https secured protocol for deployed environments,
// otherwise use simple http protocol for local testing
const clientProtocol =
    serverConfigurations.useServerRemoteAddress === true ? "https" : "http";

export const serverOrigin = `${clientProtocol}://${serverAddress}:${serverConfigurations.serverPort}`;
