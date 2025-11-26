"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function EmployeeDetail() {
  const params = useParams();
  const id = params.id;
  const [employee, setEmployee] = useState(null);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", position: "", salary: "" });

  useEffect(() => {
    fetch(`/api/employees/${id}`)
      .then(res => res.json())
      .then(data => {
        setEmployee(data);
        setForm({ ...data, salary: data.salary });
      });
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    await fetch(`/api/employees/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    alert("Employé mis à jour !");
  };

  if (!employee) return <p>Chargement...</p>;

  return (
    <div>
      <h2>Modifier {employee.firstName} {employee.lastName}</h2>
      <form onSubmit={handleUpdate}>
        <input value={form.firstName} onChange={e => setForm({...form, firstName: e.target.value})} />
        <input value={form.lastName} onChange={e => setForm({...form, lastName: e.target.value})} />
        <input value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
        <input value={form.position} onChange={e => setForm({...form, position: e.target.value})} />
        <input type="number" value={form.salary} onChange={e => setForm({...form, salary: e.target.value})} />
        <button type="submit">Mettre à jour</button>
      </form>
    </div>
  );
}
