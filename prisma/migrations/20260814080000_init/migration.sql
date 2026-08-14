-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('CUSTOMER', 'ADMIN', 'SUPER_ADMIN');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'SUSPENDED', 'DELETED');

-- CreateEnum
CREATE TYPE "TourStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "ReservationStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED', 'NO_SHOW', 'REFUNDED');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('BANK_TRANSFER', 'CREDIT_CARD', 'IYZICO', 'PAYTR', 'CASH');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'REFUNDED', 'PARTIALLY_REFUNDED');

-- CreateEnum
CREATE TYPE "ReviewStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "passwordHash" TEXT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'CUSTOMER',
    "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE',
    "emailVerified" TIMESTAMP(3),
    "phoneVerified" TIMESTAMP(3),
    "oauthProvider" TEXT,
    "oauthId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastLoginAt" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tour_categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tour_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tours" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "descriptionEn" TEXT NOT NULL,
    "priceAdult" DECIMAL(10,2) NOT NULL,
    "priceChild" DECIMAL(10,2) NOT NULL,
    "priceInfant" DECIMAL(10,2),
    "currency" TEXT NOT NULL DEFAULT 'TRY',
    "duration" INTEGER NOT NULL,
    "maxCapacity" INTEGER NOT NULL,
    "minParticipants" INTEGER NOT NULL DEFAULT 1,
    "features" JSONB NOT NULL,
    "included" JSONB NOT NULL,
    "excluded" JSONB NOT NULL,
    "whatToBring" JSONB,
    "images" TEXT[],
    "videoUrl" TEXT,
    "availableDays" INTEGER[],
    "startTimes" TEXT[],
    "status" "TourStatus" NOT NULL DEFAULT 'ACTIVE',
    "isHighlighted" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,

    CONSTRAINT "tours_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tour_availability" (
    "id" TEXT NOT NULL,
    "tourId" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "timeSlot" TEXT NOT NULL,
    "availableSpots" INTEGER NOT NULL,
    "totalSpots" INTEGER NOT NULL,
    "isBlocked" BOOLEAN NOT NULL DEFAULT false,
    "blockReason" TEXT,
    "priceOverride" DECIMAL(10,2),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tour_availability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reservations" (
    "id" TEXT NOT NULL,
    "reservationNumber" TEXT NOT NULL,
    "userId" TEXT,
    "tourId" TEXT NOT NULL,
    "tourDate" DATE NOT NULL,
    "timeSlot" TEXT NOT NULL,
    "adultCount" INTEGER NOT NULL,
    "childCount" INTEGER NOT NULL DEFAULT 0,
    "infantCount" INTEGER NOT NULL DEFAULT 0,
    "totalParticipants" INTEGER NOT NULL,
    "pricePerAdult" DECIMAL(10,2) NOT NULL,
    "pricePerChild" DECIMAL(10,2) NOT NULL,
    "pricePerInfant" DECIMAL(10,2) NOT NULL,
    "subtotal" DECIMAL(10,2) NOT NULL,
    "discountAmount" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "totalAmount" DECIMAL(10,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'TRY',
    "guestEmail" TEXT,
    "guestPhone" TEXT,
    "guestFirstName" TEXT,
    "guestLastName" TEXT,
    "specialRequests" TEXT,
    "pickupLocation" TEXT,
    "status" "ReservationStatus" NOT NULL DEFAULT 'PENDING',
    "villaReservationId" TEXT,
    "referralSource" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "confirmedAt" TIMESTAMP(3),
    "cancelledAt" TIMESTAMP(3),
    "cancellationReason" TEXT,

    CONSTRAINT "reservations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" TEXT NOT NULL,
    "reservationId" TEXT NOT NULL,
    "userId" TEXT,
    "amount" DECIMAL(10,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'TRY',
    "method" "PaymentMethod" NOT NULL,
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "transferReference" TEXT,
    "transferProof" TEXT,
    "transactionId" TEXT,
    "cardLastFour" TEXT,
    "cardBrand" TEXT,
    "installment" INTEGER NOT NULL DEFAULT 1,
    "gatewayResponse" JSONB,
    "paidAt" TIMESTAMP(3),
    "refundedAt" TIMESTAMP(3),
    "refundAmount" DECIMAL(10,2),
    "refundReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" TEXT NOT NULL,
    "tourId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "title" TEXT,
    "comment" TEXT NOT NULL,
    "status" "ReviewStatus" NOT NULL DEFAULT 'PENDING',
    "helpfulCount" INTEGER NOT NULL DEFAULT 0,
    "adminComment" TEXT,
    "reviewedBy" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "integration_tokens" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "secret" TEXT NOT NULL,
    "canCreateReservation" BOOLEAN NOT NULL DEFAULT true,
    "canCheckAvailability" BOOLEAN NOT NULL DEFAULT true,
    "requestsPerHour" INTEGER NOT NULL DEFAULT 1000,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "lastUsedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "integration_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "site_config" (
    "key" TEXT NOT NULL,
    "value" JSONB NOT NULL,
    "description" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "site_config_pkey" PRIMARY KEY ("key")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_phone_idx" ON "users"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "tour_categories_name_key" ON "tour_categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tour_categories_slug_key" ON "tour_categories"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "tours_slug_key" ON "tours"("slug");

-- CreateIndex
CREATE INDEX "tours_slug_idx" ON "tours"("slug");

-- CreateIndex
CREATE INDEX "tours_categoryId_idx" ON "tours"("categoryId");

-- CreateIndex
CREATE INDEX "tours_status_idx" ON "tours"("status");

-- CreateIndex
CREATE INDEX "tour_availability_tourId_date_idx" ON "tour_availability"("tourId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "tour_availability_tourId_date_timeSlot_key" ON "tour_availability"("tourId", "date", "timeSlot");

-- CreateIndex
CREATE UNIQUE INDEX "reservations_reservationNumber_key" ON "reservations"("reservationNumber");

-- CreateIndex
CREATE INDEX "reservations_userId_idx" ON "reservations"("userId");

-- CreateIndex
CREATE INDEX "reservations_tourId_idx" ON "reservations"("tourId");

-- CreateIndex
CREATE INDEX "reservations_reservationNumber_idx" ON "reservations"("reservationNumber");

-- CreateIndex
CREATE INDEX "reservations_tourDate_idx" ON "reservations"("tourDate");

-- CreateIndex
CREATE INDEX "reservations_status_idx" ON "reservations"("status");

-- CreateIndex
CREATE INDEX "payments_reservationId_idx" ON "payments"("reservationId");

-- CreateIndex
CREATE INDEX "payments_userId_idx" ON "payments"("userId");

-- CreateIndex
CREATE INDEX "payments_status_idx" ON "payments"("status");

-- CreateIndex
CREATE INDEX "reviews_tourId_idx" ON "reviews"("tourId");

-- CreateIndex
CREATE INDEX "reviews_userId_idx" ON "reviews"("userId");

-- CreateIndex
CREATE INDEX "reviews_status_idx" ON "reviews"("status");

-- CreateIndex
CREATE UNIQUE INDEX "integration_tokens_token_key" ON "integration_tokens"("token");

-- AddForeignKey
ALTER TABLE "tours" ADD CONSTRAINT "tours_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "tour_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tour_availability" ADD CONSTRAINT "tour_availability_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "tours"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "tours"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "reservations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "tours"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
