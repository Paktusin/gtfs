import fetch from "node-fetch";
import fs from "fs";

//https://www.cyprusbybus.com/routes.aspx?sid=1
//"https://api.cyprusbybus.com/dataservice/api/v1/routes/routedetail?routeid=40&languageId=1"

(async () => {
  const response = await fetch(
    "https://www.cyprusbybus.com/routes.aspx?sid=1"
  );
  const data = await response.text();
  console.log(data);
})();

saveAgency()