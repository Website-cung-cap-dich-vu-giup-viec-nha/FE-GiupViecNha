import { API, standardResponse } from "../middleware";

export async function getCalendar(startDate, endDate) {
  const url = `/api/Calendar/getCalendar/${startDate}/${endDate}`;

  return API.get(url)
    .then((response) => standardResponse(true, response))
    .catch((error) => standardResponse(false, error.response?.data));
}