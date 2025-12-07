// app/api/employees/[id]/route.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Fonction utilitaire pour extraire l'ID de l'URL
function extractIdFromUrl(request) {
  const url = request.nextUrl || new URL(request.url);
  const pathname = url.pathname;
  
  // Enlever le slash de fin si présent
  const cleanPathname = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  
  // Diviser le chemin
  const segments = cleanPathname.split('/');
  
  // Trouver l'index de 'employees'
  const employeesIndex = segments.indexOf('employees');
  
  if (employeesIndex === -1 || employeesIndex >= segments.length - 1) {
    return null;
  }
  
  // L'ID est le segment après 'employees'
  return segments[employeesIndex + 1];
}

export async function GET(request) {
  console.log("=== API GET /api/employees/[id] ===");
  console.log("URL:", request.url);
  
  try {
    // Extraire l'ID de l'URL
    const idStr = extractIdFromUrl(request);
    console.log("ID extrait:", idStr);
    
    if (!idStr) {
      return Response.json(
        { 
          error: "ID manquant dans l'URL",
          details: "Format attendu: /api/employees/1"
        },
        { status: 400 }
      );
    }
    
    // Convertir en nombre
    const id = parseInt(idStr, 10);
    console.log("ID converti:", id, "isNaN?", isNaN(id));
    
    if (isNaN(id) || id <= 0) {
      return Response.json(
        { 
          error: `ID invalide: "${idStr}"`,
          details: "L'ID doit être un nombre positif"
        },
        { status: 400 }
      );
    }
    
    // Rechercher l'employé
    console.log(`Recherche employé ID: ${id}`);
    const employee = await prisma.employee.findUnique({
      where: { id }
    });
    
    if (!employee) {
      return Response.json(
        { 
          error: `Employé non trouvé`,
          details: `Aucun employé avec l'ID ${id}`
        },
        { status: 404 }
      );
    }
    
    console.log(`✅ Employé trouvé: ${employee.nom} ${employee.prenoms}`);
    
    // Formater les dates pour JSON
    const response = {
      ...employee,
      dateNaissance: employee.dateNaissance?.toISOString() || null,
      dateDebutGrade: employee.dateDebutGrade?.toISOString() || null,
      dateFinGrade: employee.dateFinGrade?.toISOString() || null,
      createdAt: employee.createdAt?.toISOString() || null,
      updatedAt: employee.updatedAt?.toISOString() || null,
    };
    
    return Response.json(response, { 
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      }
    });
    
  } catch (error) {
    console.error("❌ Erreur serveur:", error);
    
    return Response.json(
      { 
        error: "Erreur serveur interne",
        message: error.message,
        ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
      },
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

export async function PUT(request) {
  console.log("=== API PUT /api/employees/[id] ===");
  
  try {
    // Extraire l'ID
    const idStr = extractIdFromUrl(request);
    console.log("ID pour PUT:", idStr);
    
    if (!idStr) {
      return Response.json(
        { error: "ID manquant" },
        { status: 400 }
      );
    }
    
    const id = parseInt(idStr, 10);
    if (isNaN(id) || id <= 0) {
      return Response.json(
        { error: "ID invalide" },
        { status: 400 }
      );
    }
    
    // Lire le corps de la requête
    const body = await request.json();
    console.log("Body reçu:", body);
    
    // Mettre à jour l'employé
    const updated = await prisma.employee.update({
      where: { id },
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
    
    console.log(`✅ Employé ${id} mis à jour`);
    
    return Response.json(updated, { status: 200 });
    
  } catch (error) {
    console.error("❌ Erreur PUT:", error);
    
    // Gestion des erreurs spécifiques Prisma
    if (error.code === 'P2025') {
      return Response.json(
        { error: "Employé introuvable" },
        { status: 404 }
      );
    }
    
    return Response.json(
      { 
        error: "Impossible de mettre à jour l'employé",
        details: error.message
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  console.log("=== API DELETE /api/employees/[id] ===");
  
  try {
    // Extraire l'ID
    const idStr = extractIdFromUrl(request);
    console.log("ID pour DELETE:", idStr);
    
    if (!idStr) {
      return Response.json(
        { error: "ID manquant" },
        { status: 400 }
      );
    }
    
    const id = parseInt(idStr, 10);
    if (isNaN(id) || id <= 0) {
      return Response.json(
        { error: "ID invalide" },
        { status: 400 }
      );
    }
    
    // Supprimer l'employé
    await prisma.employee.delete({
      where: { id }
    });
    
    console.log(`✅ Employé ${id} supprimé`);
    
    return Response.json(
      { 
        success: true,
        message: `Employé #${id} supprimé avec succès`
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error("❌ Erreur DELETE:", error);
    
    if (error.code === 'P2025') {
      return Response.json(
        { error: "Employé introuvable" },
        { status: 404 }
      );
    }
    
    return Response.json(
      { 
        error: "Impossible de supprimer l'employé",
        details: error.message
      },
      { status: 500 }
    );
  }
}