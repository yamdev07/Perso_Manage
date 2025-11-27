import React from 'react';
import "./globals.css"; // relatif au fichier page.tsx

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  bgColor: string;
  iconColor: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, bgColor, iconColor }) => (
  <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow border border-gray-100">
    <div className={`w-12 h-12 ${bgColor} rounded-lg flex items-center justify-center mb-4`}>
      <div className={iconColor}>{icon}</div>
    </div>
    <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

interface StatItemProps {
  value: string;
  label: string;
}

const StatItem: React.FC<StatItemProps> = ({ value, label }) => (
  <div className="text-center">
    <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
    <div className="text-sm text-gray-600">{label}</div>
  </div>
);

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Bienvenue sur votre plateforme de
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"> gestion du personnel</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Gérez efficacement vos équipes, suivez les performances et optimisez vos processus RH en un seul endroit.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <FeatureCard
            bgColor="bg-blue-100"
            iconColor="text-blue-600"
            title="Gestion des Employés"
            description="Accédez rapidement aux profils, informations et historiques de tous vos employés."
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            }
          />
          <FeatureCard
            bgColor="bg-indigo-100"
            iconColor="text-indigo-600"
            title="Rapports & Analyses"
            description="Visualisez les statistiques et tendances pour prendre des décisions éclairées."
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            }
          />
          <FeatureCard
            bgColor="bg-purple-100"
            iconColor="text-purple-600"
            title="Gestion du Temps"
            description="Suivez les présences, congés et heures de travail de manière simplifiée."
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-xl p-12 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            Prêt à commencer ?
          </h3>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Utilisez le menu de navigation pour accéder à la liste complète des employés et commencer à gérer votre équipe.
          </p>
          <button className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors shadow-lg">
            Voir les Employés
          </button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          <StatItem value="150+" label="Employés actifs" />
          <StatItem value="12" label="Départements" />
          <StatItem value="98%" label="Satisfaction" />
          <StatItem value="24/7" label="Support disponible" />
        </div>
      </div>
    </div>
  );
}
