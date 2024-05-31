-- CreateTable
CREATE TABLE "Itinerary" (
    "name" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" TEXT,

    CONSTRAINT "Itinerary_pkey" PRIMARY KEY ("name","date")
);

-- CreateTable
CREATE TABLE "Event" (
    "name" TEXT NOT NULL,
    "starts" TEXT NOT NULL,
    "ends" TEXT NOT NULL,
    "itineraryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" TEXT,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("name","itineraryId")
);

-- CreateTable
CREATE TABLE "Attendee" (
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "itineraryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" TEXT,

    CONSTRAINT "Attendee_pkey" PRIMARY KEY ("itineraryId","email")
);

-- CreateIndex
CREATE UNIQUE INDEX "Itinerary_id_key" ON "Itinerary"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Itinerary_name_date_key" ON "Itinerary"("name", "date");

-- CreateIndex
CREATE UNIQUE INDEX "Event_name_itineraryId_key" ON "Event"("name", "itineraryId");

-- CreateIndex
CREATE UNIQUE INDEX "Attendee_itineraryId_email_key" ON "Attendee"("itineraryId", "email");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_itineraryId_fkey" FOREIGN KEY ("itineraryId") REFERENCES "Itinerary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendee" ADD CONSTRAINT "Attendee_itineraryId_fkey" FOREIGN KEY ("itineraryId") REFERENCES "Itinerary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
