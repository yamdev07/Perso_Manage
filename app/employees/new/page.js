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

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("/api/employees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    alert("Employé ajouté avec succès !");
    router.push("/employees");
  };

  return (
    <div>
      <h2>Ajouter un nouvel agent</h2>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", maxWidth: 400 }}
      >
        <input placeholder="Matricule" value={form.matricule} onChange={e => setForm({...form, matricule: e.target.value})} required />
        <input placeholder="Nom" value={form.nom} onChange={e => setForm({...form, nom: e.target.value})} required />
        <input placeholder="Prénoms" value={form.prenoms} onChange={e => setForm({...form, prenoms: e.target.value})} required />
        <input type="date" value={form.dateNaissance} onChange={e => setForm({...form, dateNaissance: e.target.value})} required />
        <input placeholder="Grade" value={form.grade} onChange={e => setForm({...form, grade: e.target.value})} required />
        <input type="date" placeholder="Date début grade" value={form.dateDebutGrade} onChange={e => setForm({...form, dateDebutGrade: e.target.value})} required />
        <input type="date" placeholder="Date fin grade" value={form.dateFinGrade} onChange={e => setForm({...form, dateFinGrade: e.target.value})} />
        <input type="number" placeholder="Indice" value={form.indice} onChange={e => setForm({...form, indice: e.target.value})} required />

        <button type="submit" style={{ marginTop: 10 }}>Ajouter</button>
      </form>
    </div>
  );
}
