"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EmployeesPage() {
  const router = useRouter();
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = () => {
    fetch("/api/employees")
      .then(res => res.json())
      .then(data => setEmployees(data));
  };

  useEffect(() => { fetchEmployees(); }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Liste des employés</h2>
        <button
          onClick={() => router.push("/employees/new")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          ➕ Ajouter un agent
        </button>
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Matricule</th>
            <th className="border p-2">Nom</th>
            <th className="border p-2">Prénoms</th>
            <th className="border p-2">Grade</th>
            <th className="border p-2">Indice</th>
            <th className="border p-2">Opérations</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id} className="hover:bg-gray-50">
              <td className="border p-2">{emp.matricule}</td>
              <td className="border p-2">{emp.nom}</td>
              <td className="border p-2">{emp.prenoms}</td>
              <td className="border p-2">{emp.grade}</td>
              <td className="border p-2">{emp.indice}</td>
              <td className="border p-2">
                <button
                  onClick={() => router.push(`/employees/${emp.id}/edit`)}
                  className="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500 mr-2"
                >
                  Modifier
                </button>
                <button
                  onClick={async () => {
                    if (confirm("Voulez-vous vraiment supprimer cet employé ?")) {
                      await fetch(`/api/employees?id=${emp.id}`, { method: "DELETE" });
                      fetchEmployees();
                    }
                  }}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
