import { saveData } from "./saveData.js";
import { Agency } from "./models/Agency.js";

export function saveAgency() {
  const agency = new Agency();
  agency.agency_id = "CBB";
  agency.agency_name = "Cyprus By Bus";
  agency.agency_timezone = "Asia/Nicosia";
  agency.agency_url = "https://www.cyprusbybus.com";

  return saveData("agency", [agency]);
}
