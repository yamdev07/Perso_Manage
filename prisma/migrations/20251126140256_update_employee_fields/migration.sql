/*
  Warnings:

  - You are about to drop the column `department` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `firstname` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `lastname` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `position` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `salary` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Employee` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[matricule]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `dateDebutGrade` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateNaissance` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `grade` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `indice` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `matricule` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nom` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prenoms` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Employee_email_key";

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "department",
DROP COLUMN "email",
DROP COLUMN "firstname",
DROP COLUMN "lastname",
DROP COLUMN "phone",
DROP COLUMN "position",
DROP COLUMN "salary",
DROP COLUMN "status",
DROP COLUMN "updatedAt",
ADD COLUMN     "dateDebutGrade" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "dateFinGrade" TIMESTAMP(3),
ADD COLUMN     "dateNaissance" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "grade" TEXT NOT NULL,
ADD COLUMN     "indice" INTEGER NOT NULL,
ADD COLUMN     "matricule" TEXT NOT NULL,
ADD COLUMN     "nom" TEXT NOT NULL,
ADD COLUMN     "prenoms" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Employee_matricule_key" ON "Employee"("matricule");
