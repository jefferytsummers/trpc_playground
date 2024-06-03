/*
  Warnings:

  - The primary key for the `Attendee` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `itineraryId` on the `Attendee` table. All the data in the column will be lost.
  - The primary key for the `Event` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `itineraryId` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Itinerary` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[itineraryName,itineraryDate,email]` on the table `Attendee` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,itineraryName,itineraryDate]` on the table `Event` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `itineraryDate` to the `Attendee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itineraryName` to the `Attendee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itineraryDate` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itineraryName` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Attendee" DROP CONSTRAINT "Attendee_itineraryId_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_itineraryId_fkey";

-- DropIndex
DROP INDEX "Attendee_itineraryId_email_key";

-- DropIndex
DROP INDEX "Event_name_itineraryId_key";

-- DropIndex
DROP INDEX "Itinerary_id_key";

-- AlterTable
ALTER TABLE "Attendee" DROP CONSTRAINT "Attendee_pkey",
DROP COLUMN "itineraryId",
ADD COLUMN     "itineraryDate" TEXT NOT NULL,
ADD COLUMN     "itineraryName" TEXT NOT NULL,
ADD CONSTRAINT "Attendee_pkey" PRIMARY KEY ("itineraryName", "itineraryDate", "email");

-- AlterTable
ALTER TABLE "Event" DROP CONSTRAINT "Event_pkey",
DROP COLUMN "itineraryId",
ADD COLUMN     "itineraryDate" TEXT NOT NULL,
ADD COLUMN     "itineraryName" TEXT NOT NULL,
ADD CONSTRAINT "Event_pkey" PRIMARY KEY ("name", "itineraryName", "itineraryDate");

-- AlterTable
ALTER TABLE "Itinerary" DROP COLUMN "id";

-- CreateIndex
CREATE UNIQUE INDEX "Attendee_itineraryName_itineraryDate_email_key" ON "Attendee"("itineraryName", "itineraryDate", "email");

-- CreateIndex
CREATE UNIQUE INDEX "Event_name_itineraryName_itineraryDate_key" ON "Event"("name", "itineraryName", "itineraryDate");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_itineraryName_itineraryDate_fkey" FOREIGN KEY ("itineraryName", "itineraryDate") REFERENCES "Itinerary"("name", "date") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendee" ADD CONSTRAINT "Attendee_itineraryName_itineraryDate_fkey" FOREIGN KEY ("itineraryName", "itineraryDate") REFERENCES "Itinerary"("name", "date") ON DELETE RESTRICT ON UPDATE CASCADE;
