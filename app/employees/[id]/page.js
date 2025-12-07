"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EmployeeDetail() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  const [employee, setEmployee] = useState(null);
  const [form, setForm] = useState({
    nom: "",
    prenoms: "",
    matricule: "",
    grade: "",
    indice: ""
  });
  const [loading, setLoading] = useState(true);

  // -------------------------------
  // Récupérer l'employé par ID
  // -------------------------------
  useEffect(() => {
    if (!id) return;

    const fetchEmployee = async () => {
      try {
        const res = await fetch(`/api/employees/${id}`);
        if (!res.ok) throw new Error("Employé introuvable");
        const data = await res.json();
        setEmployee(data);
        setForm({
          nom: data.nom || "",
          prenoms: data.prenoms || "",
          matricule: data.matricule || "",
          grade: data.grade || "",
          indice: data.indice || 0
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  // -------------------------------
  // Mettre à jour l'employé
  // -------------------------------
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/employees/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (!res.ok) throw new Error("Erreur lors de la mise à jour");
      alert("Employé mis à jour !");
      router.push("/employees"); // Retour à la liste
    } catch (err) {
      console.error(err);
      alert("Impossible de mettre à jour l'employé.");
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (!employee) return <p>Employé introuvable</p>;

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg mt-8">
      <h2 className="text-2xl font-bold mb-4">
        Modifier {employee.prenoms} {employee.nom}
      </h2>

      <form onSubmit={handleUpdate} className="flex flex-col gap-4">
        <input
          value={form.nom}
          onChange={(e) => setForm({ ...form, nom: e.target.value })}
          placeholder="Nom"
          className="border px-3 py-2 rounded text-black"
        />
        <input
          value={form.prenoms}
          onChange={(e) => setForm({ ...form, prenoms: e.target.value })}
          placeholder="Prénoms"
          className="border px-3 py-2 rounded text-black"
        />
        <input
          value={form.matricule}
          onChange={(e) => setForm({ ...form, matricule: e.target.value })}
          placeholder="Matricule"
          className="border px-3 py-2 rounded text-black"
        />
        <input
          value={form.grade}
          onChange={(e) => setForm({ ...form, grade: e.target.value })}
          placeholder="Grade"
          className="border px-3 py-2 rounded text-black"
        />
        <input
          type="number"
          value={form.indice}
          onChange={(e) => setForm({ ...form, indice: Number(e.target.value) })}
          placeholder="Indice"
          className="border px-3 py-2 rounded text-black"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Mettre à jour
        </button>
      </form>
    </div>
  );
}
