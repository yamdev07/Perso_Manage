"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewEmployee() {
  const router = useRouter();
  const [form, setForm] = useState({
    matricule: "",
    nom: "",
    prenoms: "",
    dateNaissance: "",
    grade: "",
    dateDebutGrade: "",
    dateFinGrade: "",
    indice: ""
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (response.ok) {
        router.push("/employees");
      } else {
        alert("Erreur lors de l'ajout de l'employé");
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* En-tête */}
        <div className="mb-8">
          <button
            onClick={() => router.push("/employees")}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Retour à la liste
          </button>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Ajouter un nouvel agent</h2>
          <p className="text-gray-600">Remplissez les informations de l'employé ci-dessous</p>
        </div>

        {/* Formulaire */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Informations personnelles */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                Informations personnelles
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Matricule */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Matricule <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: EMP-2025-001"
                    value={form.matricule}
                    onChange={(e) => handleChange("matricule", e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Nom */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Nom de famille"
                    value={form.nom}
                    onChange={(e) => handleChange("nom", e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Prénoms */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prénoms <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Prénoms"
                    value={form.prenoms}
                    onChange={(e) => handleChange("prenoms", e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Date de naissance */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date de naissance <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={form.dateNaissance}
                    onChange={(e) => handleChange("dateNaissance", e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Séparateur */}
            <div className="border-t border-gray-200"></div>

            {/* Informations professionnelles */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                Informations professionnelles
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Grade */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Grade <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Cadre A"
                    value={form.grade}
                    onChange={(e) => handleChange("grade", e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Indice */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Indice <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Ex: 550"
                    value={form.indice}
                    onChange={(e) => handleChange("indice", e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Date début grade */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date début grade <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={form.dateDebutGrade}
                    onChange={(e) => handleChange("dateDebutGrade", e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Date fin grade */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date fin grade
                    <span className="text-gray-400 text-xs ml-2">(optionnel)</span>
                  </label>
                  <input
                    type="date"
                    value={form.dateFinGrade}
                    onChange={(e) => handleChange("dateFinGrade", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => router.push("/employees")}
                className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Ajout en cours...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Ajouter l'employé
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Information supplémentaire */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start">
          <svg className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h4 className="text-sm font-semibold text-blue-900 mb-1">Information</h4>
            <p className="text-sm text-blue-800">
              Les champs marqués d'un astérisque (<span className="text-red-500">*</span>) sont obligatoires. 
              Assurez-vous que toutes les informations sont correctes avant de soumettre le formulaire.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}