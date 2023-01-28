import { saveAgency } from "./src/saveAgency.js";
import { saveRoutes } from "./src/saveRoutes.js";

//"https://api.cyprusbybus.com/dataservice/api/v1/routes/routedetail?routeid=40&languageId=1"

(async () => {
  saveAgency();
  await saveRoutes();
})();
