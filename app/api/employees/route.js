import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req) {
  console.log("🔍 API GET /api/employees appelée");
  
  try {
    // Récupérer tous les employés
    const employees = await prisma.employee.findMany({
      orderBy: { id: 'asc' }
    });
    
    console.log(`✅ ${employees.length} employés récupérés`);
    
    // Formater les dates
    const formattedEmployees = employees.map(employee => ({
      ...employee,
      dateNaissance: employee.dateNaissance?.toISOString() || null,
      dateDebutGrade: employee.dateDebutGrade?.toISOString() || null,
      dateFinGrade: employee.dateFinGrade?.toISOString() || null,
      createdAt: employee.createdAt?.toISOString() || null,
      updatedAt: employee.updatedAt?.toISOString() || null,
    }));
    
    return Response.json(formattedEmployees, { 
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      }
    });
    
  } catch (err) {
    console.error("❌ Erreur serveur:", err);
    
    return Response.json(
      { 
        error: "Erreur serveur interne", 
        message: err.message,
        details: process.env.NODE_ENV === 'development' ? err.stack : undefined
      },
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    
    console.log("📝 Création nouvel employé:", body);
    
    // Validation basique
    if (!body.nom || !body.prenoms) {
      return Response.json(
        { error: "Le nom et les prénoms sont obligatoires" },
        { status: 400 }
      );
    }
    
    const employee = await prisma.employee.create({
      data: {
        matricule: body.matricule,
        nom: body.nom,
        prenoms: body.prenoms,
        dateNaissance: body.dateNaissance ? new Date(body.dateNaissance) : null,
        grade: body.grade,
        dateDebutGrade: body.dateDebutGrade ? new Date(body.dateDebutGrade) : null,
        dateFinGrade: body.dateFinGrade ? new Date(body.dateFinGrade) : null,
        indice: body.indice !== undefined ? Number(body.indice) : null,
      }
    });
    
    console.log("✅ Employé créé avec ID:", employee.id);
    
    return Response.json(employee, { 
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (err) {
    console.error("❌ Erreur création employé:", err);
    
    // Erreur Prisma spécifique (contrainte unique, etc.)
    if (err.code === 'P2002') {
      return Response.json(
        { error: "Un employé avec ce matricule existe déjà" },
        { status: 409 }
      );
    }
    
    return Response.json(
      { error: "Impossible de créer l'employé", details: err.message },
      { status: 500 }
    );
  }
}