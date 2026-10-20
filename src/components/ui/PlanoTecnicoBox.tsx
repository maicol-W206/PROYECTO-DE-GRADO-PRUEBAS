import { FunctionComponent } from "react";

// Los PDFs y sus imágenes de vista previa (.png) van en public/docs/
export const PRODUCT_CODES = [
  "BIS-001",
  "BIS-002",
  "BIS-003",
  "BIS-004",
  "BUJ-001",
  "BUJ-002",
  "LEN-001",
  "LEN-002",
  "SOP-001",
  "SOP-002",
];

type PlanoTecnicoBoxProps = {
  codigo?: string;
};

export const PlanoTecnicoBox: FunctionComponent<PlanoTecnicoBoxProps> = ({
  codigo = "BIS-001",
}) => {
  const base = PRODUCT_CODES.includes(codigo) ? codigo : "BIS-001";
  const pdfPath = `/docs/${base}_ficha_tecnica.pdf`;
  const imgPath = `/docs/${base}_ficha_tecnica.png`;

  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        padding: "20px",
        backgroundColor: "#ffffff",
        textAlign: "center",
      }}
    >
      <h3
        style={{
          fontSize: "16px",
          fontWeight: 600,
          color: "#1f2937",
          marginTop: 0,
          marginBottom: "16px",
        }}
      >
        Plano Técnico
      </h3>

      {/* Imagen del PDF: al hacer clic se abre el PDF completo */}
      <a href={pdfPath} target="_blank" rel="noopener noreferrer">
        <div
          style={{
            border: "1px dashed #d1d5db",
            borderRadius: "8px",
            overflow: "hidden",
            backgroundColor: "#f9fafb",
            maxHeight: "320px",
          }}
        >
          <img
            src={imgPath}
            alt={`Plano técnico ${base}`}
            style={{
              width: "100%",
              display: "block",
              objectFit: "cover",
              objectPosition: "top",
            }}
          />
        </div>
      </a>

      {/* Descarga directa */}
      <a
        href={pdfPath}
        download={`${base}_ficha_tecnica.pdf`}
        style={{
          color: "#2563eb",
          fontWeight: 600,
          fontSize: "14px",
          textDecoration: "none",
          marginTop: "16px",
          display: "inline-block",
          cursor: "pointer",
        }}
      >
        ↓ Descargar PDF
      </a>
    </div>
  );
};

export default PlanoTecnicoBox;