"use client";
import { useEffect, useState } from "react";

export default function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    position: "",
    salary: ""
  });

  const fetchEmployees = () => {
    fetch("/api/employees")
      .then(res => res.json())
      .then(data => setEmployees(data));
  };

  useEffect(() => { fetchEmployees(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/employees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    setForm({ firstName: "", lastName: "", email: "", position: "", salary: "" });
    fetchEmployees();
  };

  const handleDelete = async (id) => {
    await fetch(`/api/employees/${id}`, { method: "DELETE" });
    fetchEmployees();
  };

  return (
    <div>
      <h2>Liste des employés</h2>

      {/* Formulaire d'ajout */}
      <form onSubmit={handleSubmit}>
        <input placeholder="Prénom" value={form.firstName} onChange={e => setForm({...form, firstName: e.target.value})} />
        <input placeholder="Nom" value={form.lastName} onChange={e => setForm({...form, lastName: e.target.value})} />
        <input placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
        <input placeholder="Poste" value={form.position} onChange={e => setForm({...form, position: e.target.value})} />
        <input placeholder="Salaire" type="number" value={form.salary} onChange={e => setForm({...form, salary: e.target.value})} />
        <button type="submit">Ajouter</button>
      </form>

      <hr />

      {/* Liste des employés */}
      <ul>
        {employees.map(emp => (
          <li key={emp.id}>
            {emp.firstName} {emp.lastName} — {emp.position} — {emp.salary}$
            <button onClick={() => handleDelete(emp.id)} style={{ marginLeft: 10 }}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
