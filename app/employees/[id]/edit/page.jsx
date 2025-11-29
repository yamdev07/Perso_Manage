"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function EmployeeEdit() {
  const params = useParams(); // récupère l'ID depuis l'URL
  const { id } = params;     // params.id est la valeur dynamique
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    // fetch depuis la route dynamique de l'API
    fetch(`/api/employees/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Impossible de récupérer l'employé");
        return res.json();
      })
      .then((data) => {
        setEmployee(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Chargement…</p>;
  if (error) return <p>Erreur : {error}</p>;
  if (!employee) return <p>Aucun employé trouvé</p>;

  return (
    <div>
      <h1>Modifier l'employé {employee.nom}</h1>
      <p>Prénoms : {employee.prenoms}</p>
      <p>Matricule : {employee.matricule}</p>
      <p>Grade : {employee.grade}</p>
      <p>Date de naissance : {new Date(employee.dateNaissance).toLocaleDateString()}</p>
      {/* Ajoute ici ton formulaire de modification */}
    </div>
  );
}
