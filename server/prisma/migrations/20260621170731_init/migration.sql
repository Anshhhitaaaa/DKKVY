-- Enable uuid-ossp extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CreateEnum
CREATE TYPE "app_status_enum" AS ENUM ('PENDING', 'APPROVED', 'ACTIVE', 'COMPLETED', 'REJECTED');

-- CreateEnum
CREATE TYPE "gender_enum" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "id_proof_enum" AS ENUM ('AADHAAR', 'VOTER_ID', 'PAN', 'DRIVING_LICENCE');

-- CreateEnum
CREATE TYPE "admin_role_enum" AS ENUM ('SUPER_ADMIN', 'DKVIB_ADMIN', 'FINANCE_OFFICER', 'ASSESSMENT_OFFICER');

-- CreateTable
CREATE TABLE "applicants" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "applicant_id" VARCHAR(20) NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "father_mother_name" VARCHAR(150) NOT NULL,
    "dob" DATE NOT NULL,
    "gender" "gender_enum" NOT NULL,
    "address" TEXT NOT NULL,
    "mobile" VARCHAR(10) NOT NULL,
    "email" VARCHAR(150) NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "id_proof_type" "id_proof_enum" NOT NULL,
    "id_proof_number" VARCHAR(50) NOT NULL,
    "bank_account" VARCHAR(20) NOT NULL,
    "ifsc_code" VARCHAR(11) NOT NULL,
    "bank_name" VARCHAR(150),
    "account_holder" VARCHAR(150) NOT NULL,
    "training_sector" VARCHAR(100) NOT NULL,
    "preferred_agency" VARCHAR(200),
    "application_status" "app_status_enum" DEFAULT 'PENDING',
    "mobile_verified" BOOLEAN DEFAULT false,
    "approved_by" UUID,
    "approved_at" TIMESTAMP(6),
    "rejection_reason" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "applicants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "otp_store" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "email" VARCHAR(150) NOT NULL,
    "mobile" VARCHAR(10),
    "otp" VARCHAR(6) NOT NULL,
    "purpose" VARCHAR(50) DEFAULT 'REGISTRATION',
    "expires_at" TIMESTAMP(6) NOT NULL,
    "verified" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "otp_store_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admins" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "admin_id" VARCHAR(20) NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "email" VARCHAR(150) NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "role" "admin_role_enum" NOT NULL DEFAULT 'DKVIB_ADMIN',
    "status" VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "agencies" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "login_id" VARCHAR(20) NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "org_name" VARCHAR(200) NOT NULL,
    "org_type" VARCHAR(50) NOT NULL,
    "year_established" VARCHAR(4),
    "contact_person_name" VARCHAR(100) NOT NULL,
    "contact_person_designation" VARCHAR(100) NOT NULL,
    "mobile_number" VARCHAR(10) NOT NULL,
    "alternate_mobile" VARCHAR(10),
    "email_id" VARCHAR(150) NOT NULL,
    "website" VARCHAR(200),
    "registered_office_address" TEXT NOT NULL,
    "district" VARCHAR(100) NOT NULL,
    "pincode" VARCHAR(6) NOT NULL,
    "training_center_address" TEXT NOT NULL,
    "registration_number" VARCHAR(100) NOT NULL,
    "registration_date" DATE NOT NULL,
    "registered_under" VARCHAR(100) NOT NULL,
    "pan_number" VARCHAR(10) NOT NULL,
    "tan_number" VARCHAR(10),
    "gst_number" VARCHAR(15),
    "udyam_number" VARCHAR(20),
    "bank_account_number" VARCHAR(20) NOT NULL,
    "ifsc_code" VARCHAR(11) NOT NULL,
    "bank_name" VARCHAR(150) NOT NULL,
    "account_holder_name" VARCHAR(150) NOT NULL,
    "branch_name" VARCHAR(150),
    "empanelled_with_nsdc" BOOLEAN DEFAULT false,
    "empanelled_with_dkkvy" BOOLEAN DEFAULT false,
    "nsdc_reg_number" VARCHAR(50),
    "previous_dkkvy_work" TEXT,
    "empanelled_with_skill_india" BOOLEAN DEFAULT false,
    "blacklisting_history" BOOLEAN DEFAULT false,
    "training_center_ownership" VARCHAR(50) NOT NULL,
    "total_training_space" VARCHAR(20) NOT NULL,
    "number_of_training_rooms" VARCHAR(10) NOT NULL,
    "seating_capacity" VARCHAR(10) NOT NULL,
    "facilities" JSONB NOT NULL DEFAULT '[]',
    "sectors" JSONB NOT NULL DEFAULT '[]',
    "max_batches_per_month" VARCHAR(10) NOT NULL,
    "max_trainees_per_batch" VARCHAR(10) NOT NULL,
    "trainers" JSONB NOT NULL DEFAULT '[]',
    "total_years_in_training" VARCHAR(10),
    "total_trainees_trained" VARCHAR(20),
    "previous_projects" TEXT,
    "achievements" TEXT,
    "documents" JSONB NOT NULL DEFAULT '{}',
    "authorized_signatory_name" VARCHAR(100),
    "authorized_signatory_designation" VARCHAR(100),
    "declaration_date" DATE,
    "status" "app_status_enum" DEFAULT 'PENDING',
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "agencies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "applicants_applicant_id_key" ON "applicants"("applicant_id");

-- CreateIndex
CREATE UNIQUE INDEX "applicants_mobile_key" ON "applicants"("mobile");

-- CreateIndex
CREATE UNIQUE INDEX "applicants_email_key" ON "applicants"("email");

-- CreateIndex
CREATE UNIQUE INDEX "applicants_id_proof_number_key" ON "applicants"("id_proof_number");

-- CreateIndex
CREATE UNIQUE INDEX "applicants_bank_account_key" ON "applicants"("bank_account");

-- CreateIndex
CREATE INDEX "idx_applicants_bank_account" ON "applicants"("bank_account");

-- CreateIndex
CREATE INDEX "idx_applicants_dob" ON "applicants"("dob");

-- CreateIndex
CREATE INDEX "idx_applicants_id_proof" ON "applicants"("id_proof_number");

-- CreateIndex
CREATE INDEX "idx_applicants_mobile" ON "applicants"("mobile");

-- CreateIndex
CREATE INDEX "idx_applicants_sector" ON "applicants"("training_sector");

-- CreateIndex
CREATE INDEX "idx_applicants_status" ON "applicants"("application_status");

-- CreateIndex
CREATE INDEX "idx_otp_email" ON "otp_store"("email", "purpose");

-- CreateIndex
CREATE UNIQUE INDEX "admins_admin_id_key" ON "admins"("admin_id");

-- CreateIndex
CREATE UNIQUE INDEX "admins_email_key" ON "admins"("email");

-- CreateIndex
CREATE INDEX "idx_admins_email" ON "admins"("email");

-- CreateIndex
CREATE UNIQUE INDEX "agencies_login_id_key" ON "agencies"("login_id");

-- CreateIndex
CREATE UNIQUE INDEX "agencies_email_id_key" ON "agencies"("email_id");

-- CreateIndex
CREATE UNIQUE INDEX "agencies_pan_number_key" ON "agencies"("pan_number");

-- CreateIndex
CREATE INDEX "idx_agencies_status" ON "agencies"("status");

-- CreateIndex
CREATE INDEX "idx_agencies_email" ON "agencies"("email_id");

-- AddForeignKey
ALTER TABLE "applicants" ADD CONSTRAINT "applicants_approved_by_fkey" FOREIGN KEY ("approved_by") REFERENCES "admins"("id") ON DELETE SET NULL ON UPDATE CASCADE;
