-- CreateTable
CREATE TABLE "event_registrations" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "org" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "speaker" BOOLEAN NOT NULL DEFAULT false,
    "award" BOOLEAN NOT NULL DEFAULT false,
    "sponsor" BOOLEAN NOT NULL DEFAULT false,
    "presenter" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "event_registrations_pkey" PRIMARY KEY ("id")
);
