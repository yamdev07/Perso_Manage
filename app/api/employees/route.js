import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const employees = await prisma.employee.findMany();
    console.log("Employés récupérés :", employees); // vérification
    return new Response(JSON.stringify(employees), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Erreur serveur" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// Optionnel : créer un nouvel employé
export async function POST(req) {
  try {
    const body = await req.json();
    const employee = await prisma.employee.create({
      data: {
        matricule: body.matricule,
        nom: body.nom,
        prenoms: body.prenoms,
        dateNaissance: new Date(body.dateNaissance),
        grade: body.grade,
        dateDebutGrade: new Date(body.dateDebutGrade),
        dateFinGrade: body.dateFinGrade ? new Date(body.dateFinGrade) : null,
        indice: Number(body.indice),
      },
    });
    return new Response(JSON.stringify(employee), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Impossible de créer l'employé" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
