import fs from "fs";
import path from "path";

export function saveData(name, rows) {
  if (!rows.length) {
    return;
  }
  const fields = Object.keys(rows[0]);
  let data = fields.join(",") + "\n";
  rows.forEach((row) => {
    data += fields.map((field) => row[field]).join(",") + "\n";
  });
  console.log(data);
  fs.writeFileSync(`./out/${name}.txt`, data, "utf8");
}
