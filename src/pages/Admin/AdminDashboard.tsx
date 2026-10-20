import { useState } from "react";
import styles from "./AdminDashboard.module.css";

interface Request {
  id: string;
  icon: string;
  title: string;
  description: string;
  author: string;
  date: string;
  category: string;
  status: "Pendiente" | "Aprobado" | "Rechazado";
  categoryColor: string;
}

interface AdminDashboardProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("Todos");

  const requests: Request[] = [
    {
      id: "REQ-001",
      icon: "🔧",
      title: "Agregar nueva bisagra de titanio",
      description: "Solicitud para agregar una nueva línea de bisagras de titanio para aplicaciones aeroespaciales.",
      author: "María González",
      date: "2026-01-25",
      category: "Agregar Producto",
      status: "Pendiente",
      categoryColor: "#FFA726",
    },
    {
      id: "REQ-002",
      icon: "💰",
      title: "Actualizar precio bujo BUJ-002",
      description: "Actualización de precio por cambio en coste de materias primas.",
      author: "Carlos Ruiz",
      date: "2026-01-19",
      category: "Editar Producto",
      status: "Pendiente",
      categoryColor: "#42A5F5",
    },
    {
      id: "REQ-003",
      icon: "📦",
      title: "Actualizar stock de BIS-001",
      description: "Actualización de cantidad en stock tras recepción de pedido.",
      author: "María González",
      date: "2026-01-18",
      category: "Editar Producto",
      status: "Aprobado",
      categoryColor: "#42A5F5",
    },
    {
      id: "REQ-004",
      icon: "❌",
      title: "Eliminar soporte SOP-015 descontinuado",
      description: "El producto está descontinuado este modelo y no hay reemplazos directos.",
      author: "Carlos Ruiz",
      date: "2026-01-17",
      category: "Eliminar Producto",
      status: "Rechazado",
      categoryColor: "#EF5350",
    },
    {
      id: "REQ-005",
      icon: "📄",
      title: "Actualizar información de certificaciones",
      description: "Añadir nueva certificación ISO 14001 a la página de la empresa.",
      author: "María González",
      date: "2026-01-16",
      category: "Cambios de Contenido",
      status: "Aprobado",
      categoryColor: "#66BB6A",
    },
    {
      id: "REQ-006",
      icon: "🔩",
      title: "Modificar especificaciones LEN-003",
      description: "Cambiar rango de temperatura en especificaciones técnicas.",
      author: "Carlos Ruiz",
      date: "2026-01-15",
      category: "Editar Producto",
      status: "Pendiente",
      categoryColor: "#42A5F5",
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
  const approvedCount = requests.filter((r) => r.status === "Aprobado").length;
  const rejectedCount = requests.filter((r) => r.status === "Rechazado").length;
  const approvalRate = ((approvedCount / requests.length) * 100).toFixed(0);

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "Pendiente":
        return "#FFA726";
      case "Aprobado":
        return "#66BB6A";
      case "Rechazado":
        return "#EF5350";
      default:
        return "#999";
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logoIcon}>🏭</div>
          <div className={styles.headerCenter}>Acceso Administrador</div>
          <button className={styles.logoutBtn} onClick={onLogout}>
            Cerrar sesión
          </button>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.titleSection}>
          <h1 className={styles.pageTitle}>Panel de Administración</h1>
          <p className={styles.pageDescription}>Gestiona las solicitudes de cambios y el contenido del sitio</p>
        </div>

        <div className={styles.statsContainer}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>⏳</div>
            <div className={styles.statNumber}>{pendingCount}</div>
            <div className={styles.statLabel}>Pendientes</div>
            <div className={styles.statSubLabel}>Requieren atención</div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>✅</div>
            <div className={styles.statNumber}>{approvedCount}</div>
            <div className={styles.statLabel}>Aprobadas</div>
            <div className={styles.statSubLabel}>Últimas 30 días</div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>❌</div>
            <div className={styles.statNumber}>{rejectedCount}</div>
            <div className={styles.statLabel}>Rechazadas</div>
            <div className={styles.statSubLabel}>Últimos 30 días</div>
          </div>

          <div className={styles.approvalRateCard}>
            <div className={styles.rateIcon}>📊</div>
            <div className={styles.rateContent}>
              <div className={styles.rateNumber}>{approvalRate}%</div>
              <div className={styles.rateLabel}>Tasa de Aprobación</div>
              <div className={styles.rateSubLabel}>Últimos 90 días</div>
            </div>
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
              onClick={() => setFilterStatus("Aprobado")}
              className={`${styles.filterBtn} ${filterStatus === "Aprobado" ? styles.active : ""}`}
            >
              Aprobadas
            </button>
            <button
              onClick={() => setFilterStatus("Rechazado")}
              className={`${styles.filterBtn} ${filterStatus === "Rechazado" ? styles.active : ""}`}
            >
              Rechazadas
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

              <div className={styles.requestSide}>
                <div className={styles.requestHeaderRight}>
                  <span className={styles.requestId}>{request.id}</span>
                </div>

                <div className={styles.requestActions}>
                  <button className={styles.viewDetailsBtn}>Ver detalles</button>
                  <button className={`${styles.actionBtn} ${styles.approve}`}>✓ Aprobar</button>
                  <button className={`${styles.actionBtn} ${styles.reject}`}>✕ Rechazar</button>
                </div>

                <div className={styles.requestStatus} style={{ color: getStatusColor(request.status) }}>
                  {request.status === "Pendiente" && "⏳"}
                  {request.status === "Aprobado" && "✅"}
                  {request.status === "Rechazado" && "❌"}
                  {request.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

