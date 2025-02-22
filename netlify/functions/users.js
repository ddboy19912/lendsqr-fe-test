const { setupServer } = require("msw/node");
import { handlers } from "../../src/mocks/handlers";

exports.handler = async (event) => {
  const server = setupServer(...handlers);
  const { path, httpMethod, body } = event;

  const response = await server.run(
    new Request(`https://${event.headers.host}${path}`, {
      method: httpMethod,
      headers: event.headers,
      body: body,
    })
  );

  return {
    statusCode: response.status,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(await response.json()),
  };
};
