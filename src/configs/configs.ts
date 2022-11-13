interface ServerConfig {
    serverPort: number;
    serverLocalAddress: string;
    serverRemoteAddress: string;
    useServerRemoteAddress: boolean;
}

const serverConfigurations: ServerConfig = {
    serverPort: 4000,
    serverLocalAddress: "localhost",
    serverRemoteAddress: "0.0.0.0",
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
