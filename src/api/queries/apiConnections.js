import fetch from "node-fetch";

const BASE_URL = "http://localhost:3000";

module.exports = {
  getPersonByURL: relativeURL => {
    return fetch(`${BASE_URL}${relativeURL}`).then(res => res.json());
  }
};
