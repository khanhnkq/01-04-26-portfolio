CREATE TYPE "public"."donation_status" AS ENUM('pending', 'amount_mismatch', 'paid');--> statement-breakpoint
CREATE TYPE "public"."transaction_match_status" AS ENUM('matched', 'wrong_amount', 'unmatched', 'already_paid');--> statement-breakpoint
CREATE TABLE "donations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"payment_code" varchar(10) NOT NULL,
	"name" varchar(80) NOT NULL,
	"message" varchar(500) NOT NULL,
	"cups" integer NOT NULL,
	"amount" integer NOT NULL,
	"request_fingerprint" varchar(64),
	"status" "donation_status" DEFAULT 'pending' NOT NULL,
	"is_visible" boolean DEFAULT true NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"paid_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "donations_cups_range" CHECK ("donations"."cups" BETWEEN 1 AND 20),
	CONSTRAINT "donations_amount_positive" CHECK ("donations"."amount" > 0)
);
--> statement-breakpoint
CREATE TABLE "sepay_transactions" (
	"sepay_id" varchar(64) PRIMARY KEY NOT NULL,
	"reference_code" varchar(120) NOT NULL,
	"gateway" varchar(50) NOT NULL,
	"account_number" varchar(64) NOT NULL,
	"payment_code" varchar(32),
	"content" text NOT NULL,
	"transfer_amount" integer NOT NULL,
	"transaction_date" varchar(40) NOT NULL,
	"match_status" "transaction_match_status" NOT NULL,
	"donation_id" uuid,
	"received_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "sepay_transactions_amount_positive" CHECK ("sepay_transactions"."transfer_amount" > 0)
);
--> statement-breakpoint
ALTER TABLE "sepay_transactions" ADD CONSTRAINT "sepay_transactions_donation_id_donations_id_fk" FOREIGN KEY ("donation_id") REFERENCES "public"."donations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "donations_payment_code_unique" ON "donations" USING btree ("payment_code");--> statement-breakpoint
CREATE INDEX "donations_public_wall_idx" ON "donations" USING btree ("status","is_visible","paid_at");--> statement-breakpoint
CREATE INDEX "donations_rate_limit_idx" ON "donations" USING btree ("request_fingerprint","created_at");--> statement-breakpoint
CREATE INDEX "sepay_transactions_payment_code_idx" ON "sepay_transactions" USING btree ("payment_code");--> statement-breakpoint
CREATE INDEX "sepay_transactions_donation_id_idx" ON "sepay_transactions" USING btree ("donation_id");