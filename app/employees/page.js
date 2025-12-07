"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EmployeesPage() {
    const router = useRouter();
    const [employees, setEmployees] = useState([]); // Toujours un tableau
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    // -------------------------------
    // Récupérer la liste des employés
    // -------------------------------
    const fetchEmployees = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/employees");
            const text = await res.text();
            let data = [];
            try {
                data = JSON.parse(text);
                if (!Array.isArray(data)) data = [];
            } catch {
                console.error("Réponse non JSON :", text);
                data = [];
            }
            setEmployees(data);
        } catch (error) {
            console.error("Erreur lors du chargement des employés:", error);
            setEmployees([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    // -------------------------------
    // Supprimer un employé
    // -------------------------------
    const handleDelete = async (emp) => {
        if (confirm(`Voulez-vous vraiment supprimer ${emp.nom} ${emp.prenoms} ?`)) {
            try {
                const res = await fetch(`/api/employees/${emp.id}`, { method: "DELETE" });
                const text = await res.text();
                try {
                    const data = JSON.parse(text);
                    console.log(data.message || "Employé supprimé");
                } catch {
                    console.log("Employé supprimé (pas de JSON reçu)");
                }
                fetchEmployees(); // Rafraîchir la liste
            } catch (error) {
                console.error("Erreur lors de la suppression:", error);
            }
        }
    };

    // -------------------------------
    // Filtrer les employés selon la recherche
    // -------------------------------
    const filteredEmployees = employees.filter(emp =>
        emp.nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.prenoms?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.matricule?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.grade?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // -------------------------------
    // Affichage
    // -------------------------------
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* En-tête */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Liste des employés</h2>
                            <p className="text-gray-600">Gérez et consultez tous vos employés en un seul endroit</p>
                        </div>
                        <button
                            onClick={() => router.push("/employees/new")}
                            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            Ajouter un agent
                        </button>
                    </div>

                    {/* Barre de recherche et statistiques */}
                    <div className="mt-6 flex flex-col md:flex-row gap-4">
                        <input
                            type="text"
                            placeholder="Rechercher par nom, prénom, matricule ou grade..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="flex-1 pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black placeholder:text-gray-700 text-base"
                        />

                        <div className="flex items-center space-x-4 bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-3 rounded-lg border border-blue-100">
                            <p className="text-xs text-gray-600">Total</p>
                            <p className="text-xl font-bold text-gray-900">{filteredEmployees.length}</p>
                        </div>
                    </div>
                </div>

                {/* Tableau */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                        </div>
                    ) : filteredEmployees.length === 0 ? (
                        <div className="text-center py-20">
                            <h3 className="mt-2 text-lg font-medium text-gray-900">Aucun employé trouvé</h3>
                            <p className="mt-1 text-sm text-gray-500">
                                {searchTerm ? "Essayez une autre recherche" : "Commencez par ajouter un nouvel employé"}
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                                    <tr className="text-black">
                                        <th className="px-6 py-4 text-left font-semibold">Matricule</th>
                                        <th className="px-6 py-4 text-left font-semibold">Nom</th>
                                        <th className="px-6 py-4 text-left font-semibold">Prénoms</th>
                                        <th className="px-6 py-4 text-left font-semibold">Grade</th>
                                        <th className="px-6 py-4 text-left font-semibold">Indice</th>
                                        <th className="px-6 py-4 text-center font-semibold">Actions</th>
                                    </tr>
                                </thead>

                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredEmployees.map((emp) => (
                                        <tr key={emp.id} className="hover:bg-blue-50 transition-colors duration-150">
                                            <td className="px-6 py-4 text-black flex items-center">
                                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center text-white font-bold mr-3">
                                                    {emp.matricule?.substring(0, 2).toUpperCase() || "EM"}
                                                </div>
                                                <span>{emp.matricule}</span>
                                            </td>
                                            <td className="px-6 py-4 text-black">{emp.nom}</td>
                                            <td className="px-6 py-4 text-black">{emp.prenoms}</td>
                                            <td className="px-6 py-4 text-black">
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">{emp.grade}</span>
                                            </td>
                                            <td className="px-6 py-4 text-black">
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">{emp.indice}</span>
                                            </td>
                                            <td className="px-6 py-4 text-center flex justify-center gap-2">
                                                <button
                                                    onClick={() => router.push(`/employees/${emp.id}/edit`)}
                                                    className="inline-flex items-center px-3 py-2 bg-yellow-500 text-white text-sm font-medium rounded-lg hover:bg-yellow-600 transition-colors duration-150 shadow-sm hover:shadow-md"
                                                >
                                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 11l-3 3 7 7 3-3-7-7z" />
                                                    </svg>
                                                    Modifier
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(emp)}
                                                    className="inline-flex items-center px-3 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-colors duration-150 shadow-sm hover:shadow-md"
                                                >
                                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                    Supprimer
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
