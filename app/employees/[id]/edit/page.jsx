"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function EmployeeEdit() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  // Fonction pour récupérer l'employé
  const fetchEmployee = async (employeeId) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log(`🔄 Fetching employee ID: ${employeeId}`);
      
      const response = await fetch(`/api/employees/${employeeId}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      });
      
      console.log('Response status:', response.status);
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || `Erreur ${response.status}`);
      }
      
      setEmployee(data);
      setFormData({
        matricule: data.matricule || '',
        nom: data.nom || '',
        prenoms: data.prenoms || '',
        dateNaissance: data.dateNaissance?.split('T')[0] || '',
        grade: data.grade || '',
        dateDebutGrade: data.dateDebutGrade?.split('T')[0] || '',
        dateFinGrade: data.dateFinGrade?.split('T')[0] || '',
        indice: data.indice || '',
      });
      
    } catch (err) {
      console.error('❌ Erreur fetch:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Effet pour charger l'employé
  useEffect(() => {
    console.log('📌 Params reçus:', params);
    console.log('📌 ID:', id, 'Type:', typeof id);
    
    if (!id) {
      setError("ID manquant dans l'URL");
      setLoading(false);
      return;
    }
    
    // Convertir et valider l'ID
    const employeeId = parseInt(id, 10);
    if (isNaN(employeeId) || employeeId <= 0) {
      setError(`ID invalide: "${id}". Doit être un nombre positif.`);
      setLoading(false);
      return;
    }
    
    fetchEmployee(employeeId);
  }, [id]);

  // Gestion des changements du formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Sauvegarde des modifications
  const handleSave = async () => {
    try {
      setSaveLoading(true);
      
      // Validation des données
      if (!formData.nom?.trim() || !formData.prenoms?.trim()) {
        alert("Le nom et les prénoms sont obligatoires");
        return;
      }
      
      const response = await fetch(`/api/employees/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || `Erreur ${response.status}`);
      }
      
      // Mettre à jour les données affichées
      setEmployee(data);
      setIsEditing(false);
      alert('Employé mis à jour avec succès!');
      
    } catch (err) {
      console.error('❌ Erreur sauvegarde:', err);
      alert(`Erreur: ${err.message}`);
    } finally {
      setSaveLoading(false);
    }
  };

  // Suppression de l'employé
  const handleDelete = async () => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet employé ?")) {
      return;
    }
    
    try {
      const response = await fetch(`/api/employees/${id}`, {
        method: 'DELETE'
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || `Erreur ${response.status}`);
      }
      
      alert('Employé supprimé avec succès!');
      router.push('/employees'); // Redirection vers la liste
      
    } catch (err) {
      console.error('❌ Erreur suppression:', err);
      alert(`Erreur: ${err.message}`);
    }
  };

  // Affichage des états de chargement
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des données de l'employé...</p>
          <p className="text-sm text-gray-500">ID: {id}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Erreur</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <div className="space-y-3">
            <Link
              href="/employees"
              className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              ← Retour à la liste
            </Link>
            <button
              onClick={() => window.location.reload()}
              className="block w-full text-center px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
              Réessayer
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Employé introuvable</h2>
          <p className="text-gray-600 mb-6">
            L'employé avec l'ID <strong>{id}</strong> n'existe pas.
          </p>
          <Link
            href="/employees"
            className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            ← Retour à la liste des employés
          </Link>
        </div>
      </div>
    );
  }

  // Affichage principal
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* En-tête */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {isEditing ? 'Modifier' : 'Détails de'} l'employé
              </h1>
              <p className="text-gray-600 mt-2">
                Matricule: <span className="font-semibold">{employee.matricule}</span> 
                | ID: <span className="font-semibold">{employee.id}</span>
              </p>
            </div>
            <div className="flex space-x-3">
              <Link
                href="/employees"
                className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
              >
                ← Liste
              </Link>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Modifier
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
                >
                  Annuler
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Carte principale */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {isEditing ? (
            // Formulaire d'édition
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-6">Modifier les informations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Matricule *
                  </label>
                  <input
                    type="text"
                    name="matricule"
                    value={formData.matricule}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom *
                  </label>
                  <input
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prénoms *
                  </label>
                  <input
                    type="text"
                    name="prenoms"
                    value={formData.prenoms}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date de naissance
                  </label>
                  <input
                    type="date"
                    name="dateNaissance"
                    value={formData.dateNaissance}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Grade
                  </label>
                  <input
                    type="text"
                    name="grade"
                    value={formData.grade}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Indice
                  </label>
                  <input
                    type="number"
                    name="indice"
                    value={formData.indice}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date début grade
                  </label>
                  <input
                    type="date"
                    name="dateDebutGrade"
                    value={formData.dateDebutGrade}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date fin grade
                  </label>
                  <input
                    type="date"
                    name="dateFinGrade"
                    value={formData.dateFinGrade}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t flex justify-end space-x-3">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
                  disabled={saveLoading}
                >
                  Annuler
                </button>
                <button
                  onClick={handleSave}
                  disabled={saveLoading}
                  className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 flex items-center"
                >
                  {saveLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Enregistrement...
                    </>
                  ) : 'Enregistrer'}
                </button>
              </div>
            </div>
          ) : (
            // Affichage en lecture seule
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Matricule</h3>
                  <p className="mt-1 text-lg text-gray-900">{employee.matricule}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Nom complet</h3>
                  <p className="mt-1 text-lg text-gray-900">
                    {employee.nom} {employee.prenoms}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Date de naissance</h3>
                  <p className="mt-1 text-lg text-gray-900">
                    {employee.dateNaissance 
                      ? new Date(employee.dateNaissance).toLocaleDateString('fr-FR', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })
                      : 'Non renseignée'}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Grade</h3>
                  <p className="mt-1 text-lg text-gray-900">{employee.grade || 'Non renseigné'}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Indice</h3>
                  <p className="mt-1 text-lg text-gray-900">{employee.indice || 'Non renseigné'}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Date début grade</h3>
                  <p className="mt-1 text-lg text-gray-900">
                    {employee.dateDebutGrade
                      ? new Date(employee.dateDebutGrade).toLocaleDateString('fr-FR')
                      : 'Non renseignée'}
                  </p>
                </div>
                
                {employee.dateFinGrade && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Date fin grade</h3>
                    <p className="mt-1 text-lg text-gray-900">
                      {new Date(employee.dateFinGrade).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                )}
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Date de création</h3>
                  <p className="mt-1 text-lg text-gray-900">
                    {new Date(employee.createdAt).toLocaleDateString('fr-FR', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {/* Section actions dangereuses */}
          {!isEditing && (
            <div className="border-t bg-red-50 p-6">
              <h3 className="text-lg font-medium text-red-800 mb-4">Zone de danger</h3>
              <div className="flex justify-end">
                <button
                  onClick={handleDelete}
                  className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Supprimer cet employé
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Debug info (à supprimer en production) */}
        <div className="mt-8 p-4 bg-gray-100 rounded text-sm">
          <details>
            <summary className="cursor-pointer font-medium">Informations de débogage</summary>
            <div className="mt-2 space-y-2">
              <p><strong>ID URL:</strong> {id} (type: {typeof id})</p>
              <p><strong>ID converti:</strong> {parseInt(id, 10)}</p>
              <p><strong>Employé ID:</strong> {employee.id}</p>
              <p><strong>Temps de chargement:</strong> {new Date().toLocaleTimeString()}</p>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
}