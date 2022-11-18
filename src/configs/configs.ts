// get server configurations
const serverPort = Number(process.env.REACT_APP_SERVER_PORT) || 5000;
const serverAddress = process.env.REACT_APP_SERVER_ADDRESS || "localhost";

export const serverOrigin = `${serverAddress}:${serverPort}`;
