// prisma/build-schema.js
const fs = require("fs");
const path = require("path");

const baseSchema = `
generator client {
  provider = "prisma-client-js"
  output   = "../generated/prisma"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}`;
const modelDir = path.join(__dirname, "prisma", "models");
const modelFiles = fs
  .readdirSync(modelDir)
  .filter((file) => file.endsWith(".prisma"));
let combinedModels = "";

for (const file of modelFiles) {
  const content = fs.readFileSync(path.join(modelDir, file), "utf-8");
  combinedModels += `\n// ===== ${file} =====\n` + content + "\n";
}

fs.writeFileSync(
  path.join(__dirname, "prisma", "schema.prisma"),
  baseSchema + combinedModels
);
console.log("✅ schema.prisma generated!");

/*

ALTER TABLE "product"
DROP COLUMN IF EXISTS "actualPrice"

ALTER TABLE "product"
ADD COLUMN "actualPrice" DOUBLE PRECISION GENERATED ALWAYS AS (
  CASE
    WHEN "discountPercent" IS NOT NULL
      AND "discountStartTime" IS NOT NULL
      AND "discountEndTime" IS NOT NULL
      AND NOW() BETWEEN "discountStartTime" AND "discountEndTime"
    THEN "price" * (1 - "discountPercent")
    ELSE "price"
  END
) STORED;
*/
