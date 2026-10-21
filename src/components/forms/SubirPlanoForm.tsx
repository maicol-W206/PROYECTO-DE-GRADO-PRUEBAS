import { useState } from "react";
import styles from "./SubirPlanoForm.module.css"; // O los estilos globales que uses

export default function SubirPlanoForm() {
  const [archivo, setArchivo] = useState<File | null>(null);
  const [verificando, setVerificando] = useState(false);
  const [existe, setExiste] = useState<boolean | null>(null);
  const [mensaje, setMensaje] = useState<{ texto: string; tipo: "error" | "exito" | "info" } | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    setArchivo(selectedFile);
    setExiste(null);
    setMensaje(null);

    if (!selectedFile) return;

    setVerificando(true);
    try {
      const res = await fetch(
        `http://localhost:5000/api/piezas/verificar?nombreArchivo=${encodeURIComponent(selectedFile.name)}`
      );
      const data = await res.json();

      if (data.existe) {
        setExiste(true);
        setMensaje({
          texto: `⚠️ El archivo "${selectedFile.name}" YA existe en MySQL (Código: ${data.pieza.codigo}).`,
          tipo: "error",
        });
      } else {
        setExiste(false);
        setMensaje({
          texto: `✅ El archivo "${selectedFile.name}" está disponible para registro.`,
          tipo: "exito",
        });
      }
    } catch (err) {
      console.error(err);
      setMensaje({ texto: "Error al consultar la base de datos.", tipo: "error" });
    } finally {
      setVerificando(false);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!archivo || existe) return;

    const formData = new FormData();
    formData.append("archivo", archivo);

    try {
      const res = await fetch("http://localhost:5000/api/piezas/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setMensaje({
          texto: `🎉 ¡Ficha "${data.archivo}" guardada e integrada en MySQL!`,
          tipo: "exito",
        });
        setArchivo(null);
        setExiste(null);
      } else {
        setMensaje({ texto: `❌ ${data.error}`, tipo: "error" });
      }
    } catch (err) {
      console.error(err);
      setMensaje({ texto: "Error al enviar el archivo al servidor.", tipo: "error" });
    }
  };

  return (
    <div className={styles.cardContainer}>
      <h3 className={styles.title}>Subir Plano o Ficha Técnica (.PDF / .DXF)</h3>
      <p className={styles.subtitle}>
        Verificación automática de duplicados directamente contra la base de datos MySQL.
      </p>

      <form onSubmit={handleUpload} className={styles.form}>
        <input
          type="file"
          accept=".pdf,.dxf"
          onChange={handleFileChange}
          className={styles.fileInput}
        />

        {verificando && <p className={styles.infoText}>🔍 Consultando MySQL...</p>}

        {mensaje && (
          <div
            className={`${styles.alert} ${
              mensaje.tipo === "error"
                ? styles.alertError
                : mensaje.tipo === "exito"
                ? styles.alertSuccess
                : styles.alertInfo
            }`}
          >
            {mensaje.texto}
          </div>
        )}

        <button
          type="submit"
          disabled={!archivo || existe === true || verificando}
          className={styles.submitBtn}
        >
          {existe === true ? "Archivo Duplicado" : "Registrar en Base de Datos"}
        </button>
      </form>
    </div>
  );
}