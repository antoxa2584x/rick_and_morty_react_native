export const prettyPrintResponse = async (request: any, response: any) => {
  if (!__DEV__) {
    return;
  }

  if (request.ok) {
    console.log(`${request.url} =>\n${JSON.stringify(response, null, 2)}`);
  } else {
    let text = await request.clone().text();
    console.log(`${request.url} =>\n${text}`);
  }
};
