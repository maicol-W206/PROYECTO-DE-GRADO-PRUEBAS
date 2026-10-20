import { useState } from "react";
import styles from "./AsesorDashboard.module.css";

interface Request {
  id: string;
  icon: string;
  title: string;
  description: string;
  author: string;
  date: string;
  status: "Pendiente" | "En revisión" | "Completado";
  category: string;
  categoryColor: string;
}

interface AsesorDashboardProps {
  onLogout: () => void;
}

export default function AsesorDashboard({ onLogout }: AsesorDashboardProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("Todos");

  const requests: Request[] = [
    {
      id: "REQ-101",
      icon: "📌",
      title: "Validar oferta técnica SOP-015",
      description: "Revisar condiciones y requerimientos del soporte descontinuado para proponer alternativas.",
      author: "Ana Ramírez",
      date: "2026-03-12",
      category: "Revisión Técnica",
      status: "Pendiente",
      categoryColor: "#4caf50",
    },
    {
      id: "REQ-102",
      icon: "✏️",
      title: "Actualizar ficha técnica BUJ-002",
      description: "Completar datos de materiales y tolerancias solicitados por el cliente.",
      author: "Felipe Díaz",
      date: "2026-03-10",
      category: "Documentación",
      status: "En revisión",
      categoryColor: "#ffb300",
    },
    {
      id: "REQ-103",
      icon: "🔍",
      title: "Revisar consistencia de costos LEN-005",
      description: "Verificar cambios de precio y su impacto en el catálogo de venta.",
      author: "Laura Cortés",
      date: "2026-03-08",
      category: "Costos",
      status: "Completado",
      categoryColor: "#1565c0",
    },
  ];

  const filteredRequests = requests.filter((req) => {
    const matchesSearch =
      req.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "Todos" || req.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const pendingCount = requests.filter((r) => r.status === "Pendiente").length;
  const reviewCount = requests.filter((r) => r.status === "En revisión").length;
  const completedCount = requests.filter((r) => r.status === "Completado").length;

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "Pendiente":
        return "#FFA726";
      case "En revisión":
        return "#ffb300";
      case "Completado":
        return "#66BB6A";
      default:
        return "#999";
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logoIcon}>🔧</div>
          <div className={styles.headerCenter}>Acceso Asesor</div>
          <button className={styles.logoutBtn} onClick={onLogout}>
            Cerrar sesión
          </button>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.titleSection}>
          <h1 className={styles.pageTitle}>Panel de Asesor</h1>
          <p className={styles.pageDescription}>Gestiona las solicitudes que requieran tu revisión y apoyo técnico.</p>
        </div>

        <div className={styles.statsContainer}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>⏳</div>
            <div className={styles.statNumber}>{pendingCount}</div>
            <div className={styles.statLabel}>Pendientes</div>
            <div className={styles.statSubLabel}>Requieren revisión</div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>📝</div>
            <div className={styles.statNumber}>{reviewCount}</div>
            <div className={styles.statLabel}>En revisión</div>
            <div className={styles.statSubLabel}>Con comentarios activos</div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>✅</div>
            <div className={styles.statNumber}>{completedCount}</div>
            <div className={styles.statLabel}>Completadas</div>
            <div className={styles.statSubLabel}>Actualizadas</div>
          </div>
        </div>

        <div className={styles.filterSection}>
          <input
            type="text"
            placeholder="Buscar solicitudes..."
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className={styles.filterButtons}>
            <button
              onClick={() => setFilterStatus("Todos")}
              className={`${styles.filterBtn} ${filterStatus === "Todos" ? styles.active : ""}`}
            >
              Todos
            </button>
            <button
              onClick={() => setFilterStatus("Pendiente")}
              className={`${styles.filterBtn} ${filterStatus === "Pendiente" ? styles.active : ""}`}
            >
              Pendientes
            </button>
            <button
              onClick={() => setFilterStatus("En revisión")}
              className={`${styles.filterBtn} ${filterStatus === "En revisión" ? styles.active : ""}`}
            >
              En revisión
            </button>
            <button
              onClick={() => setFilterStatus("Completado")}
              className={`${styles.filterBtn} ${filterStatus === "Completado" ? styles.active : ""}`}
            >
              Completadas
            </button>
          </div>
        </div>

        <div className={styles.requestsList}>
          {filteredRequests.map((request) => (
            <div key={request.id} className={styles.requestCard}>
              <div className={styles.requestIcon}>{request.icon}</div>

              <div className={styles.requestContent}>
                <div className={styles.requestHeader}>
                  <h3 className={styles.requestTitle}>{request.title}</h3>
                  <span className={styles.requestId}>{request.id}</span>
                </div>

                <p className={styles.requestDescription}>{request.description}</p>

                <div className={styles.requestMeta}>
                  <span className={styles.author}>👤 {request.author}</span>
                  <span className={styles.date}>📅 {request.date}</span>
                  <span
                    className={styles.category}
                    style={{ backgroundColor: `${request.categoryColor}20`, color: request.categoryColor }}
                  >
                    {request.category}
                  </span>
                </div>
              </div>

              <div className={styles.requestActions}>
                <button className={styles.viewDetailsBtn}>Abrir</button>
                <button className={`${styles.actionBtn} ${styles.review}`}>Prop. cambio</button>
              </div>

              <div className={styles.requestStatus} style={{ color: getStatusColor(request.status) }}>
                {request.status}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
