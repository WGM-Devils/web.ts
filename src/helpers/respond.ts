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
  response: {
    contents: Object | null | Object[];
    content_type: "json" | "arr";
  };
};

// Code

// Exports

function sendAPIResponse(
  code: 200 | 201 | 204 | 400 | 401 | 403 | 404 | 406 | 500 | 501,
  description: string,
  contents: Object | null | Object[],
  responseType: "json" | "arr" | null
): ResponseByAPI {
  const statusMessages: {
    [key in 200 | 201 | 204 | 400 | 401 | 403 | 404 | 406 | 500 | 501]: {
      message: string;
      ok: boolean;
    };
  } = {
    200: { message: "OK", ok: true },
    201: { message: "Created", ok: true },
    204: { message: "No Content", ok: true },
    400: { message: "Bad Request", ok: false },
    401: { message: "Unauthorized", ok: false },
    403: { message: "Forbidden", ok: false },
    404: { message: "Not Found", ok: false },
    406: { message: "Not Acceptable", ok: false },
    500: { message: "Internal Server Error", ok: false },
    501: { message: "Not Implemented", ok: false },
  };
  let response: ResponseByAPI = {
    code: code,
    message: statusMessages[code].message as ResponseByAPI["message"],
    description: description,
    date: new Date(),
    ok: statusMessages[code].ok,
    response: {
      content_type: responseType,
      contents: contents,
    },
  };
  return response;
}

export { ResponseByAPI, sendAPIResponse };
