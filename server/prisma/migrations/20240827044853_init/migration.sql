-- CreateEnum
CREATE TYPE "Genre" AS ENUM ('Sci_fi', 'Romantic', 'Devotional', 'Action', 'Fantasy', 'Historical_Fiction', 'Horror', 'Non_Fiction', 'Biography', 'Self_Help', 'Young_Adult');

-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "genre" "Genre" NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "availability" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);
