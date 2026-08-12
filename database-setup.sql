-- ============================================
-- ZEO TRAVEL DATABASE SETUP
-- PostgreSQL / Supabase
-- Generated from Prisma Schema
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================
-- ENUM TYPES
-- ============================================

CREATE TYPE "UserRole" AS ENUM (
  'CUSTOMER',
  'ADMIN',
  'SUPER_ADMIN'
);

CREATE TYPE "UserStatus" AS ENUM (
  'ACTIVE',
  'SUSPENDED',
  'DELETED'
);

CREATE TYPE "TourStatus" AS ENUM (
  'ACTIVE',
  'INACTIVE',
  'ARCHIVED'
);

CREATE TYPE "ReservationStatus" AS ENUM (
  'PENDING',
  'CONFIRMED',
  'CANCELLED',
  'COMPLETED',
  'NO_SHOW',
  'REFUNDED'
);

CREATE TYPE "PaymentMethod" AS ENUM (
  'BANK_TRANSFER',
  'CREDIT_CARD',
  'IYZICO',
  'PAYTR',
  'CASH'
);

CREATE TYPE "PaymentStatus" AS ENUM (
  'PENDING',
  'PROCESSING',
  'COMPLETED',
  'FAILED',
  'REFUNDED',
  'PARTIALLY_REFUNDED'
);

CREATE TYPE "ReviewStatus" AS ENUM (
  'PENDING',
  'APPROVED',
  'REJECTED'
);

-- ============================================
-- TABLES
-- ============================================

-- Users Table
CREATE TABLE "users" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  "email" TEXT NOT NULL UNIQUE,
  "phone" TEXT UNIQUE,
  "passwordHash" TEXT,
  "firstName" TEXT NOT NULL,
  "lastName" TEXT NOT NULL,
  "role" "UserRole" NOT NULL DEFAULT 'CUSTOMER',
  "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE',
  "emailVerified" TIMESTAMP,
  "phoneVerified" TIMESTAMP,
  "oauthProvider" TEXT,
  "oauthId" TEXT,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "lastLoginAt" TIMESTAMP
);

-- Tour Categories Table
CREATE TABLE "tour_categories" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  "name" TEXT NOT NULL UNIQUE,
  "nameEn" TEXT NOT NULL,
  "slug" TEXT NOT NULL UNIQUE,
  "description" TEXT,
  "icon" TEXT,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Tours Table
CREATE TABLE "tours" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  "categoryId" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "titleEn" TEXT NOT NULL,
  "slug" TEXT NOT NULL UNIQUE,
  "description" TEXT NOT NULL,
  "descriptionEn" TEXT NOT NULL,
  "priceAdult" DECIMAL(10, 2) NOT NULL,
  "priceChild" DECIMAL(10, 2) NOT NULL,
  "priceInfant" DECIMAL(10, 2),
  "currency" TEXT NOT NULL DEFAULT 'TRY',
  "duration" INTEGER NOT NULL,
  "maxCapacity" INTEGER NOT NULL,
  "minParticipants" INTEGER NOT NULL DEFAULT 1,
  "features" JSONB NOT NULL,
  "included" JSONB NOT NULL,
  "excluded" JSONB NOT NULL,
  "whatToBring" JSONB,
  "images" TEXT[] NOT NULL,
  "videoUrl" TEXT,
  "availableDays" INTEGER[] NOT NULL,
  "startTimes" TEXT[] NOT NULL,
  "status" "TourStatus" NOT NULL DEFAULT 'ACTIVE',
  "isHighlighted" BOOLEAN NOT NULL DEFAULT FALSE,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "viewCount" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "createdBy" TEXT
);

-- Tour Availability Table
CREATE TABLE "tour_availability" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  "tourId" TEXT NOT NULL,
  "date" DATE NOT NULL,
  "timeSlot" TEXT NOT NULL,
  "availableSpots" INTEGER NOT NULL,
  "totalSpots" INTEGER NOT NULL,
  "isBlocked" BOOLEAN NOT NULL DEFAULT FALSE,
  "blockReason" TEXT,
  "priceOverride" DECIMAL(10, 2),
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE("tourId", "date", "timeSlot")
);

-- Reservations Table
CREATE TABLE "reservations" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  "reservationNumber" TEXT NOT NULL UNIQUE,
  "userId" TEXT,
  "tourId" TEXT NOT NULL,
  "tourDate" DATE NOT NULL,
  "timeSlot" TEXT NOT NULL,
  "adultCount" INTEGER NOT NULL,
  "childCount" INTEGER NOT NULL DEFAULT 0,
  "infantCount" INTEGER NOT NULL DEFAULT 0,
  "totalParticipants" INTEGER NOT NULL,
  "pricePerAdult" DECIMAL(10, 2) NOT NULL,
  "pricePerChild" DECIMAL(10, 2) NOT NULL,
  "pricePerInfant" DECIMAL(10, 2) NOT NULL,
  "subtotal" DECIMAL(10, 2) NOT NULL,
  "discountAmount" DECIMAL(10, 2) NOT NULL DEFAULT 0,
  "totalAmount" DECIMAL(10, 2) NOT NULL,
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
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "confirmedAt" TIMESTAMP,
  "cancelledAt" TIMESTAMP,
  "cancellationReason" TEXT
);

-- Payments Table
CREATE TABLE "payments" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  "reservationId" TEXT NOT NULL,
  "userId" TEXT,
  "amount" DECIMAL(10, 2) NOT NULL,
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
  "paidAt" TIMESTAMP,
  "refundedAt" TIMESTAMP,
  "refundAmount" DECIMAL(10, 2),
  "refundReason" TEXT,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Reviews Table
CREATE TABLE "reviews" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  "tourId" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "rating" INTEGER NOT NULL,
  "title" TEXT,
  "comment" TEXT NOT NULL,
  "status" "ReviewStatus" NOT NULL DEFAULT 'PENDING',
  "helpfulCount" INTEGER NOT NULL DEFAULT 0,
  "adminComment" TEXT,
  "reviewedBy" TEXT,
  "reviewedAt" TIMESTAMP,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Integration Tokens Table
CREATE TABLE "integration_tokens" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  "name" TEXT NOT NULL,
  "token" TEXT NOT NULL UNIQUE,
  "secret" TEXT NOT NULL,
  "canCreateReservation" BOOLEAN NOT NULL DEFAULT TRUE,
  "canCheckAvailability" BOOLEAN NOT NULL DEFAULT TRUE,
  "requestsPerHour" INTEGER NOT NULL DEFAULT 1000,
  "isActive" BOOLEAN NOT NULL DEFAULT TRUE,
  "lastUsedAt" TIMESTAMP,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "createdBy" TEXT NOT NULL
);

-- Site Config Table
CREATE TABLE "site_config" (
  "key" TEXT PRIMARY KEY,
  "value" JSONB NOT NULL,
  "description" TEXT,
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedBy" TEXT
);

-- ============================================
-- FOREIGN KEY CONSTRAINTS
-- ============================================

-- Tours foreign keys
ALTER TABLE "tours"
  ADD CONSTRAINT "tours_categoryId_fkey"
  FOREIGN KEY ("categoryId")
  REFERENCES "tour_categories"("id")
  ON DELETE RESTRICT
  ON UPDATE CASCADE;

-- Tour Availability foreign keys
ALTER TABLE "tour_availability"
  ADD CONSTRAINT "tour_availability_tourId_fkey"
  FOREIGN KEY ("tourId")
  REFERENCES "tours"("id")
  ON DELETE CASCADE
  ON UPDATE CASCADE;

-- Reservations foreign keys
ALTER TABLE "reservations"
  ADD CONSTRAINT "reservations_userId_fkey"
  FOREIGN KEY ("userId")
  REFERENCES "users"("id")
  ON DELETE SET NULL
  ON UPDATE CASCADE;

ALTER TABLE "reservations"
  ADD CONSTRAINT "reservations_tourId_fkey"
  FOREIGN KEY ("tourId")
  REFERENCES "tours"("id")
  ON DELETE RESTRICT
  ON UPDATE CASCADE;

-- Payments foreign keys
ALTER TABLE "payments"
  ADD CONSTRAINT "payments_reservationId_fkey"
  FOREIGN KEY ("reservationId")
  REFERENCES "reservations"("id")
  ON DELETE RESTRICT
  ON UPDATE CASCADE;

ALTER TABLE "payments"
  ADD CONSTRAINT "payments_userId_fkey"
  FOREIGN KEY ("userId")
  REFERENCES "users"("id")
  ON DELETE SET NULL
  ON UPDATE CASCADE;

-- Reviews foreign keys
ALTER TABLE "reviews"
  ADD CONSTRAINT "reviews_tourId_fkey"
  FOREIGN KEY ("tourId")
  REFERENCES "tours"("id")
  ON DELETE RESTRICT
  ON UPDATE CASCADE;

ALTER TABLE "reviews"
  ADD CONSTRAINT "reviews_userId_fkey"
  FOREIGN KEY ("userId")
  REFERENCES "users"("id")
  ON DELETE RESTRICT
  ON UPDATE CASCADE;

-- ============================================
-- INDEXES
-- ============================================

-- Users indexes
CREATE INDEX "users_email_idx" ON "users"("email");
CREATE INDEX "users_phone_idx" ON "users"("phone");

-- Tours indexes
CREATE INDEX "tours_slug_idx" ON "tours"("slug");
CREATE INDEX "tours_categoryId_idx" ON "tours"("categoryId");
CREATE INDEX "tours_status_idx" ON "tours"("status");

-- Tour Availability indexes
CREATE INDEX "tour_availability_tourId_date_idx" ON "tour_availability"("tourId", "date");

-- Reservations indexes
CREATE INDEX "reservations_userId_idx" ON "reservations"("userId");
CREATE INDEX "reservations_tourId_idx" ON "reservations"("tourId");
CREATE INDEX "reservations_reservationNumber_idx" ON "reservations"("reservationNumber");
CREATE INDEX "reservations_tourDate_idx" ON "reservations"("tourDate");
CREATE INDEX "reservations_status_idx" ON "reservations"("status");

-- Payments indexes
CREATE INDEX "payments_reservationId_idx" ON "payments"("reservationId");
CREATE INDEX "payments_userId_idx" ON "payments"("userId");
CREATE INDEX "payments_status_idx" ON "payments"("status");

-- Reviews indexes
CREATE INDEX "reviews_tourId_idx" ON "reviews"("tourId");
CREATE INDEX "reviews_userId_idx" ON "reviews"("userId");
CREATE INDEX "reviews_status_idx" ON "reviews"("status");

-- ============================================
-- TRIGGERS FOR UPDATED_AT
-- ============================================

-- Function to update updatedAt timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW."updatedAt" = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to all tables with updatedAt
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON "users"
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tour_categories_updated_at BEFORE UPDATE ON "tour_categories"
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tours_updated_at BEFORE UPDATE ON "tours"
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tour_availability_updated_at BEFORE UPDATE ON "tour_availability"
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reservations_updated_at BEFORE UPDATE ON "reservations"
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON "payments"
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON "reviews"
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_site_config_updated_at BEFORE UPDATE ON "site_config"
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- INITIAL DATA (OPTIONAL)
-- ============================================

-- Example tour categories (uncomment to use)
-- INSERT INTO "tour_categories" ("id", "name", "nameEn", "slug", "description", "sortOrder") VALUES
--   (gen_random_uuid()::TEXT, 'Su Sporları', 'Water Sports', 'su-sporlari', 'Deniz ve su aktiviteleri', 1),
--   (gen_random_uuid()::TEXT, 'Kara Sporları', 'Land Sports', 'kara-sporlari', 'Kara aktiviteleri', 2),
--   (gen_random_uuid()::TEXT, 'Hava Sporları', 'Air Sports', 'hava-sporlari', 'Hava aktiviteleri', 3);

-- ============================================
-- COMPLETION
-- ============================================

-- Database setup completed successfully!
-- You can now run: npx prisma db pull
-- Or connect your application with the DATABASE_URL
