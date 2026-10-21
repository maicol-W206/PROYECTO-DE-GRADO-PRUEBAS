import { useEffect, useState } from "react";

export interface PiezaDoc {
  id: number;
  codigo: string;
  nombre: string;
  archivo: string;
  url: string;
  categoria: "bisagras" | "bujes" | "soportes" | "lenguetas" | "otros";
  material?: string;
  tipo_archivo: string;
}

export function usePdfs() {
  const [docs, setDocs] = useState<PiezaDoc[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/piezas")
      .then((res) => {
        if (!res.ok) throw new Error("Error en la respuesta del servidor");
        return res.json();
      })
      .then((data) => setDocs(data))
      .catch((err) => console.error("Error al cargar piezas desde MySQL:", err));
  }, []);

  return docs;
}