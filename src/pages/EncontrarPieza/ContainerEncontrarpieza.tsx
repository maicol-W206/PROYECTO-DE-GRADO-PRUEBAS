import {
  FunctionComponent,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import styles from "./ContainerEncontrarpieza.module.css";
import { obtenerPDFs, documentoAPieza, Pieza } from "../utils/pdfUtils";

export type ContainerType = {
  className?: string;
};

type Clave = "tipo" | "material" | "tamano" | "aplicacion";

type Step = {
  key: Clave;
  question: string;
  options: { title: string; description: string }[];
};

const CUALQUIERA = "Cualquiera";

const STEPS: Step[] = [
  {
    key: "tipo",
    question: "¿Qué tipo de pieza necesitas?",
    options: [
      { title: "Bisagra", description: "Elementos de articulación" },
      { title: "Buje", description: "Componentes de rodamiento" },
      { title: "Soporte", description: "Elementos de sujeción" },
      { title: "Lengüeta", description: "Componentes de cierre" },
      { title: "Otro", description: "Acoples, yugos, orejas de izaje, etc." },
    ],
  },
  {
    key: "material",
    question: "¿Cuál es el material requerido?",
    options: [
      { title: "Acero Inoxidable", description: "Alta resistencia a la corrosión" },
      { title: "Aluminio", description: "Ligero y resistente" },
      { title: "Plástico / Polímero", description: "Aislamiento y ligereza" },
      { title: "Bronce", description: "Baja fricción y alta durabilidad" },
    ],
  },
  {
    key: "tamano",
    question: "¿Qué dimensiones aproximadamente buscas?",
    options: [
      { title: "Pequeña (< 50mm)", description: "Para mecanismos reducidos" },
      { title: "Mediana (50mm - 150mm)", description: "Estándar industrial" },
      { title: "Grande (> 150mm)", description: "Cargas pesadas" },
    ],
  },
  {
    key: "aplicacion",
    question: "¿Cuál es la aplicación principal?",
    options: [
      { title: "Automotriz", description: "Uso en vehículos y transporte" },
      { title: "Maquinaria Pesada", description: "Uso en industria e infraestructura" },
      { title: "Electrónica", description: "Ensambles finos de precisión" },
      { title: "Hogar / Mueblería", description: "Uso general" },
    ],
  },
].map((s) => ({
  ...s,
  options: [
    ...s.options,
    { title: CUALQUIERA, description: "No es importante para mí" },
  ],
})) as Step[];

type ButtonProps = {
  title: string;
  description: string;
  onButtonClick: () => void;
  isSelected?: boolean;
};

const ButtonEncontrarpieza: FunctionComponent<ButtonProps> = ({
  title,
  description,
  onButtonClick,
  isSelected = false,
}) => (
  <button
    type="button"
    onClick={onButtonClick}
    className={`${styles.buttonCard || ""} ${
      isSelected ? styles.selectedOption || "" : ""
    }`}
    style={{
      padding: "16px",
      borderRadius: "12px",
      border: isSelected ? "2px solid #2563eb" : "1px solid #e5e7eb",
      backgroundColor: isSelected ? "#eff6ff" : "#ffffff",
      textAlign: "left",
      cursor: "pointer",
      transition: "all 0.2s ease",
      width: "100%",
    }}
  >
    <h3 style={{ margin: "0 0 4px 0", fontSize: "16px", fontWeight: 600, color: "#1f2937" }}>
      {title}
    </h3>
    <p style={{ margin: 0, fontSize: "14px", color: "#6b7280" }}>{description}</p>
  </button>
);

const ContainerEncontrarpieza: FunctionComponent<ContainerType> = ({
  className = "",
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [filters, setFilters] = useState<Partial<Record<Clave, string>>>({});
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const [piezas, setPiezas] = useState<Pieza[]>([]);
  const [cargandoPDFs, setCargandoPDFs] = useState<boolean>(true);
  const [errorPDFs, setErrorPDFs] = useState<boolean>(false);

  useEffect(() => {
    obtenerPDFs()
      .then((docs) => {
        setPiezas(docs.map(documentoAPieza));
        setErrorPDFs(false);
      })
      .catch((error) => {
        console.error("Error cargando PDFs:", error);
        setErrorPDFs(true);
      })
      .finally(() => setCargandoPDFs(false));
  }, []);

  const totalSteps = STEPS.length;
  const currentStepConfig = STEPS[currentStep];

  const handleSelectOption = useCallback(
    (optionTitle: string) => {
      const stepKey = STEPS[currentStep].key;
      setFilters((prev) => ({ ...prev, [stepKey]: optionTitle }));
    },
    [currentStep]
  );

  const onNext = useCallback(() => {
    if (currentStep < totalSteps - 1) setCurrentStep((p) => p + 1);
    else setIsCompleted(true);
  }, [currentStep, totalSteps]);

  const onPrevious = useCallback(() => {
    if (isCompleted) setIsCompleted(false);
    else setCurrentStep((p) => Math.max(p - 1, 0));
  }, [isCompleted]);

  const handleReset = useCallback(() => {
    setFilters({});
    setCurrentStep(0);
    setIsCompleted(false);
  }, []);

  // Una pieza solo se descarta si TIENE un dato conocido que no coincide.
  // Si el dato es desconocido (ej. tamaño), la pieza se mantiene.
  const filteredPiezas = useMemo(() => {
    return piezas.filter((pieza) =>
      (Object.keys(filters) as Clave[]).every((clave) => {
        const elegido = filters[clave];
        if (!elegido || elegido === CUALQUIERA) return true;
        const valor = pieza[clave];
        return !valor || valor === elegido;
      })
    );
  }, [piezas, filters]);

  const progressPercentage = Math.round(((currentStep + 1) / totalSteps) * 100);
  const currentSelectedValue = filters[currentStepConfig.key];

  return (
    <div className={[styles.containerEncontrarpieza, className].join(" ")}>
      <section className={styles.hero}>
        <button className={styles.badge} type="button">
          <img className={styles.badgeIcon} alt="" src="/Icon9.svg" />
          Búsqueda Guiada
        </button>
        <h1 className={styles.title}>Encuentra tu pieza perfecta</h1>
        <p className={styles.description}>
          Responde unas preguntas y te ayudaremos a encontrar exactamente lo
          que necesitas
        </p>
      </section>

      {!isCompleted ? (
        <>
          <section className={styles.progressSection}>
            <div className={styles.progressHeader}>
              <span className={styles.stepLabel}>
                Paso {currentStep + 1} de {totalSteps}
              </span>
              <span className={styles.progressText}>{progressPercentage}%</span>
            </div>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <div className={styles.stepIndicators}>
              {STEPS.map((_, index) => (
                <button
                  key={index}
                  className={[
                    styles.stepCircle,
                    index === currentStep ? styles.stepActive : "",
                  ].join(" ")}
                  type="button"
                  onClick={() => setCurrentStep(index)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </section>

          <section className={styles.questionCard}>
            <div className={styles.questionHeader}>
              <h2>{currentStepConfig.question}</h2>
            </div>
            <div className={styles.optionsGrid}>
              {currentStepConfig.options.map((option) => (
                <ButtonEncontrarpieza
                  key={option.title}
                  title={option.title}
                  description={option.description}
                  isSelected={currentSelectedValue === option.title}
                  onButtonClick={() => handleSelectOption(option.title)}
                />
              ))}
            </div>
          </section>

          <div className={styles.footerActions}>
            <button
              className={styles.prevButton}
              type="button"
              onClick={onPrevious}
              disabled={currentStep === 0}
            >
              Anterior
            </button>
            <button
              className={styles.nextButton}
              type="button"
              onClick={onNext}
              disabled={!currentSelectedValue}
            >
              {currentStep === totalSteps - 1 ? "Ver Resultados" : "Siguiente"}
            </button>
          </div>
        </>
      ) : (
        <section className={styles.questionCard}>
          <div className={styles.questionHeader}>
            <h2>Piezas Encontradas ({filteredPiezas.length})</h2>
          </div>

          {cargandoPDFs && (
            <p style={{ textAlign: "center", margin: "20px 0", color: "#6b7280" }}>
              Cargando documentos...
            </p>
          )}

          {errorPDFs && (
            <p style={{ textAlign: "center", margin: "20px 0", color: "#dc2626" }}>
              No se pudo cargar el catálogo de documentos (/docs/index.json).
            </p>
          )}

          <div style={{ display: "grid", gap: "16px", margin: "20px 0" }}>
            {filteredPiezas.length > 0 ? (
              filteredPiezas.map((pieza) => (
                <div
                  key={pieza.id}
                  style={{
                    padding: "20px",
                    border: "1px solid #e5e7eb",
                    borderRadius: "12px",
                    backgroundColor: "#f9fafb",
                  }}
                >
                  <h3 style={{ margin: "0 0 8px 0", color: "#111827" }}>
                    {pieza.nombre}
                  </h3>

                  <p style={{ margin: "4px 0 12px 0", fontSize: "14px", color: "#4b5563" }}>
                    <strong>Tipo:</strong> {pieza.tipo}
                    {pieza.material && (
                      <>
                        {" "}| <strong>Material:</strong> {pieza.material}
                      </>
                    )}
                    {pieza.tamano && (
                      <>
                        {" "}| <strong>Tamaño:</strong> {pieza.tamano}
                      </>
                    )}
                    {pieza.aplicacion && (
                      <>
                        {" "}| <strong>Aplicación:</strong> {pieza.aplicacion}
                      </>
                    )}
                  </p>

                  <a
                    href={pieza.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-block",
                      padding: "10px 16px",
                      borderRadius: "8px",
                      backgroundColor: "#2563eb",
                      color: "#ffffff",
                      textDecoration: "none",
                      fontWeight: 600,
                    }}
                  >
                    📄 Ver PDF de la pieza
                  </a>
                </div>
              ))
            ) : (
              !cargandoPDFs &&
              !errorPDFs && (
                <p style={{ textAlign: "center", color: "#6b7280" }}>
                  No se encontraron piezas con esos criterios. Prueba
                  eligiendo "{CUALQUIERA}" en alguno de los pasos.
                </p>
              )
            )}
          </div>

          <div className={styles.footerActions}>
            <button className={styles.prevButton} onClick={onPrevious} type="button">
              Modificar selección
            </button>
            <button className={styles.nextButton} onClick={handleReset} type="button">
              Reiniciar Búsqueda
            </button>
          </div>
        </section>
      )}
    </div>
  );
};

export default ContainerEncontrarpieza;
