"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EmployeeEdit() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [employee, setEmployee] = useState(null);
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

  useEffect(() => {
    fetch(`/api/employees/${id}`)
      .then(res => res.json())
      .then(data => {
        setEmployee(data);
        setForm({
          matricule: data.matricule,
          nom: data.nom,
          prenoms: data.prenoms,
          dateNaissance: data.dateNaissance.split("T")[0],
          grade: data.grade,
          dateDebutGrade: data.dateDebutGrade.split("T")[0],
          dateFinGrade: data.dateFinGrade ? data.dateFinGrade.split("T")[0] : "",
          indice: data.indice
        });
      });
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    await fetch(`/api/employees?id=${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    alert("Employé mis à jour !");
    router.push("/employees");
  };

  if (!employee) return <p>Chargement...</p>;

  return (
    <div>
      <h2>Modifier {employee.nom} {employee.prenoms}</h2>
      <form onSubmit={handleUpdate} style={{ display: "flex", flexDirection: "column", maxWidth: 400 }}>
        <input value={form.matricule} onChange={e => setForm({...form, matricule: e.target.value})} placeholder="Matricule" required />
        <input value={form.nom} onChange={e => setForm({...form, nom: e.target.value})} placeholder="Nom" required />
        <input value={form.prenoms} onChange={e => setForm({...form, prenoms: e.target.value})} placeholder="Prénoms" required />
        <input type="date" value={form.dateNaissance} onChange={e => setForm({...form, dateNaissance: e.target.value})} required />
        <input value={form.grade} onChange={e => setForm({...form, grade: e.target.value})} placeholder="Grade" required />
        <input type="date" value={form.dateDebutGrade} onChange={e => setForm({...form, dateDebutGrade: e.target.value})} required />
        <input type="date" value={form.dateFinGrade} onChange={e => setForm({...form, dateFinGrade: e.target.value})} />
        <input type="number" value={form.indice} onChange={e => setForm({...form, indice: e.target.value})} required />
        <button type="submit" style={{ marginTop: 10 }}>Mettre à jour</button>
      </form>
    </div>
  );
}
