import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req, { params }) {
  try {
    const id = Number(params.id);
    if (isNaN(id)) return new Response(JSON.stringify({ error: "ID invalide" }), { status: 400 });

    const employee = await prisma.employee.findUnique({ where: { id } });
    if (!employee) return new Response(JSON.stringify({ error: "Employé introuvable" }), { status: 404 });

    return new Response(JSON.stringify(employee), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Erreur serveur" }), { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const id = Number(params.id);
    if (isNaN(id)) return new Response(JSON.stringify({ error: "ID invalide" }), { status: 400 });

    const body = await req.json();

    const updated = await prisma.employee.update({
      where: { id },
      data: {
        matricule: body.matricule ?? undefined,
        nom: body.nom ?? undefined,
        prenoms: body.prenoms ?? undefined,
        dateNaissance: body.dateNaissance ? new Date(body.dateNaissance) : null,
        grade: body.grade ?? undefined,
        dateDebutGrade: body.dateDebutGrade ? new Date(body.dateDebutGrade) : null,
        dateFinGrade: body.dateFinGrade ? new Date(body.dateFinGrade) : null,
        indice: body.indice !== undefined ? Number(body.indice) : undefined,
      }
    });

    return new Response(JSON.stringify(updated), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Impossible de mettre à jour l'employé" }), { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const id = Number(params.id);
    if (isNaN(id)) return new Response(JSON.stringify({ error: "ID invalide" }), { status: 400 });

    await prisma.employee.delete({ where: { id } });
    return new Response(JSON.stringify({ message: "Employé supprimé avec succès" }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Impossible de supprimer l'employé" }), { status: 500 });
  }
}
