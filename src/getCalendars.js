import { Calendar } from "./models/Calendar.js";

export function getCalendars() {
  const mfCal = new Calendar();
  mfCal.service_id = "Monday to Friday";
  mfCal.monday = 1;
  mfCal.tuesday = 1;
  mfCal.wednesday = 1;
  mfCal.thursday = 1;
  mfCal.friday = 1;

  const satCal = new Calendar();
  satCal.saturday = 1;
  satCal.service_id = "Saturday";

  const sunCal = new Calendar();
  sunCal.sunday = 1;
  sunCal.service_id = "Sunday";

  const sutSunCal = new Calendar();
  sutSunCal.sunday = 1;
  sutSunCal.saturday = 1;
  sutSunCal.service_id = "Saturday Sunday";

  return [mfCal, satCal, sunCal, sutSunCal];
}
