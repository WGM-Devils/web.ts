// Imports

import res200 from "./200";
import res201 from "./201";
import res204 from "./204";
import err400 from "./400";
import err401 from "./401";
import err404 from "./404";
import err409 from "./409";

interface err {
  code: 200 | 201 | 204 | 400 | 401 | 404 | 409;
  status: string;
  message: string;
}

export default async function response(
  code: 200 | 201 | 204 | 400 | 401 | 404 | 409
) {
  if (code === 200) {
    return res200;
  } else if (code === 201) {
    return res201;
  } else if (code === 204) {
    return res204;
  } else if (code === 400) {
    return err400;
  } else if (code === 401) {
    return err401;
  } else if (code === 404) {
    return err404;
  } else if (code === 409) {
    return err409;
  }
}
