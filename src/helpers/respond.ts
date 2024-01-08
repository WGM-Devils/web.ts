// Presets

type ResponseByAPI = {
  code: 200 | 201 | 204 | 400 | 401 | 403 | 404 | 406 | 500 | 501;
  message:
    | "OK"
    | "Created"
    | "No Content"
    | "Bad Request"
    | "Unauthorized"
    | "Forbidden"
    | "Not Found"
    | "Not Acceptable"
    | "Internal Server Error"
    | "Not Implemented";
  description: string;
  date: Date;
  ok: Boolean;
  contents: Object | null | Object[];
};

// Code

// Exports

function sendAPIResponse(
  code: 200 | 201 | 204 | 400 | 401 | 403 | 404 | 406 | 500 | 501,
  description: string,
  contents: Object | null | Object[]
): ResponseByAPI {
  let response: ResponseByAPI = {
    code: code,
    message: "OK",
    description: description,
    date: new Date(),
    ok: false,
    contents: contents,
  };
  switch (code) {
    case 200:
      response.message = "OK";
      response.ok = true;
    case 201:
      response.message = "Created";
      response.ok = true;
    case 204:
      response.message = "No Content";
      response.ok = true;
    case 400:
      response.message = "Bad Request";
      response.ok = false;
    case 401:
      response.message = "Unauthorized";
      response.ok = false;
    case 403:
      response.message = "Forbidden";
      response.ok = false;
    case 404:
      response.message = "Not Found";
      response.ok = false;
    case 406:
      response.message = "Not Acceptable";
      response.ok = false;
    case 500:
      response.message = "Internal Server Error";
      response.ok = false;
    case 501:
      response.message = "Not Implemented";
      response.ok = false;
  }
  return response;
}

export { ResponseByAPI, sendAPIResponse };
