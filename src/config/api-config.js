let backendHost;

const hostname = window && window.location && window.location.hostname;

if (hostname === "localhost") {
  backendHost = "http://52.78.122.46:8080";
}

export const API_BASE_URL = `${backendHost}`;
