/*
  Warnings:

  - A unique constraint covering the columns `[ai_model_id]` on the table `prompts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ai_model_id` to the `prompts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "prompts" ADD COLUMN     "ai_model_id" UUID NOT NULL;

-- CreateTable
CREATE TABLE "ai_models" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,

    CONSTRAINT "ai_models_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "prompts_ai_model_id_key" ON "prompts"("ai_model_id");

-- AddForeignKey
ALTER TABLE "prompts" ADD CONSTRAINT "prompts_ai_model_id_fkey" FOREIGN KEY ("ai_model_id") REFERENCES "ai_models"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
