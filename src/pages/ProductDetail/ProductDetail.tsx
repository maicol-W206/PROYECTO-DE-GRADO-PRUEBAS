import { FunctionComponent, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Headercatalogoproductos";
import Footer from "../components/Footercatalogoproductos";
import styles from "./ProductDetail.module.css";

type Product = {
  sku: string;
  availability: string;
  availabilityText: string;
  stockColor: string;
  name: string;
  description: string;
  material: string;
  dimensions: string;
  weight: string;
  temperature?: string;
  capacity?: string;
  finish?: string;
  image: string;
  technicalSheet?: string;
  notes: string[];
};

type SpecItem = {
  icon: string;
  iconBg: string;
  label: string;
  value: string;
};

const getSpecificationItems = (product: Product): SpecItem[] => {
  const items: SpecItem[] = [
    {
      icon: "/Icon1.svg",
      iconBg: "#eff6ff",
      label: "Dimensiones",
      value: product.dimensions,
    },
    {
      icon: "/Icon2.svg",
      iconBg: "#dcfce7",
      label: "Peso",
      value: product.weight,
    },
    {
      icon: "/Icon7.svg",
      iconBg: "#fef3c7",
      label: "Material",
      value: product.material,
    },
  ];

  if (product.finish) {
    items.push({
      icon: "/Icon.svg",
      iconBg: "#ede9fe",
      label: "Acabado",
      value: product.finish,
    });
  }

  if (product.capacity) {
    items.push({
      icon: "/Icon5.svg",
      iconBg: "#fce7f3",
      label: "Capacidad de Carga",
      value: product.capacity,
    });
  }

  if (product.temperature) {
    items.push({
      icon: "/Icon6.svg",
      iconBg: "#cffafe",
      label: "Rango de Temperatura",
      value: product.temperature,
    });
  }

  return items;
};

// Base de datos de productos
const allProducts: Product[] = [
  {
    sku: "BIS-001",
    availability: "Disponible en stock",
    availabilityText: "245 unidades disponibles",
    stockColor: "#dcfce7",
    name: "Bisagra Inoxidable Fija Premium",
    description:
      "Bisagra de acero inoxidable 304 con acabado pulido. Ideal para puertas industriales y aplicaciones que requieren resistencia a la corrosión.",
    material: "Acero Inoxidable 304",
    dimensions: "100 x 75 x 3mm",
    weight: "185g",
    finish: "Pulido espejo",
    capacity: "50kg",
    temperature: "-40°C a +200°C",
    image: "/Container7@2x.png",
    technicalSheet: "Descargar PDF",
    notes: [
      "Certificado de calidad incluido",
      "Garantía de fabricante 12 meses",
      "Envío en 24-48h para pedidos en stock",
      "Modificación de personalización bajo pedido",
    ],
  },
  {
    sku: "BUJ-002",
    availability: "Disponible en stock",
    availabilityText: "180 unidades disponibles",
    stockColor: "#dcfce7",
    name: "Buje de Bronce Autolubricado",
    description:
      "Buje de bronce SAE 660 con insertos de grafito para autolubricación. Perfecto para aplicaciones de alta carga y velocidad.",
    material: "Bronce SAE 660 + Grafito",
    dimensions: "Ø40 x 50mm",
    weight: "120g",
    capacity: "Carga máxima 150 N/mm²",
    image: "/Container7@2x.png",
    notes: [
      "Autolubricante - sin mantenimiento adicional",
      "Resistente a altas temperaturas",
      "Especial para equipos rotativos",
      "Disponible en medidas personalizadas",
    ],
  },
  {
    sku: "BUJ-003",
    availability: "Stock limitado",
    availabilityText: "95 unidades disponibles",
    stockColor: "#fef3c7",
    name: "Buje Cofre Reforzado",
    description:
      "Buje especialmente diseñado para aplicaciones de cofres y contenedores industriales. Alta resistencia al desgaste.",
    material: "Bronce CuSn12",
    dimensions: "Ø60 x 80mm",
    weight: "280g",
    image: "/Container7@2x.png",
    notes: [
      "Diseño reforzado para alta durabilidad",
      "Resistente a vibraciones",
      "Óptimo para contenedores industriales",
      "Mantenimiento mínimo requerido",
    ],
  },
  {
    sku: "SOP-004",
    availability: "Stock limitado",
    availabilityText: "62 unidades disponibles",
    stockColor: "#fef3c7",
    name: "Soporte Pivote Angular",
    description:
      "Soporte pivotante de acero estructural con tratamiento anticorrosivo. Permite ajuste angular de ±15°.",
    material: "Acero S275JR",
    dimensions: "200 x 150 x 45mm",
    weight: "850g",
    finish: "Galvanizado",
    image: "/Container7@2x.png",
    notes: [
      "Rango de ajuste ±15 grados",
      "Tratamiento anticorrosivo incluido",
      "Capacidad de carga: 500kg",
      "Montaje rápido y fácil",
    ],
  },
  {
    sku: "LEN-005",
    availability: "Disponible en stock",
    availabilityText: "420 unidades disponibles",
    stockColor: "#dcfce7",
    name: "Lengüeta de Cierre Platina",
    description:
      "Lengüeta de cierre de acero inoxidable para cofres y contenedores. Sistema de liberación rápida.",
    material: "Acero Inoxidable 316",
    dimensions: "80 x 30 x 5mm",
    weight: "45g",
    finish: "Satinado",
    image: "/Container7@2x.png",
    notes: [
      "Sistema de liberación rápida",
      "Material de alta duración",
      "Resistente a la corrosión Marina",
      "Compatible con múltiples modelos",
    ],
  },
  {
    sku: "BIS-006",
    availability: "Stock limitado",
    availabilityText: "78 unidades disponibles",
    stockColor: "#fef3c7",
    name: "Bisagra Industrial Reforzada",
    description:
      "Bisagra de acero al carbono reforzada para aplicaciones de alta carga. Diseño robusto para maquinaria pesada.",
    material: "Acero al carbono C45",
    dimensions: "180 x 120 x 6mm",
    weight: "680g",
    finish: "Pavonado",
    image: "/Container7@2x.png",
    notes: [
      "Especialmente para maquinaria pesada",
      "Refuerzo estructural",
      "Instalación industrial",
      "Vida útil extendida",
    ],
  },
  {
    sku: "VAL-007",
    availability: "Disponible en stock",
    availabilityText: "120 unidades disponibles",
    stockColor: "#dcfce7",
    name: "Válvula de Control Neumática",
    description:
      "Válvula de control para sistemas neumáticos con cuerpo reforzado y sellos de alta resistencia.",
    material: "Acero Inoxidable 316",
    dimensions: "50 x 50 x 40mm",
    weight: "350g",
    finish: "Inyección",
    image: "/Container7@2x.png",
    notes: [
      "Para sistemas neumáticos",
      "Sellos de alta resistencia",
      "Control preciso de flujo",
      "Presión máxima 10 bar",
    ],
  },
  {
    sku: "TPR-008",
    availability: "Stock limitado",
    availabilityText: "34 unidades disponibles",
    stockColor: "#fef3c7",
    name: "Tapón Roscado Plástico",
    description:
      "Tapón roscado de nylon PA6 para protecciones y cierres industriales resistentes a impactos.",
    material: "Nylon PA6",
    dimensions: "M18 x 25mm",
    weight: "15g",
    finish: "Inyección",
    image: "/Container7@2x.png",
    notes: [
      "Resistente a impactos",
      "Material no corrosivo",
      "Fácil de instalar",
      "Disponible en varios tamaños",
    ],
  },
];

const ProductDetail: FunctionComponent = () => {
  const { sku } = useParams<{ sku: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [sku]);

  const product = allProducts.find((p) => p.sku === sku);

  if (!product) {
    return (
      <div className={styles.container}>
        <Header />
        <main className={styles.body}>
          <div className={styles.notFound}>
            <h2>Producto no encontrado</h2>
            <button onClick={() => navigate("/catalogo")}>
              Volver al catálogo
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.body}>
        <section className={styles.breadcrumb}>
          <span onClick={() => navigate("/catalogo")}>Inicio</span>
          <span> / </span>
          <span onClick={() => navigate("/catalogo")}>Catálogo</span>
          <span> / </span>
          <strong>{product.name}</strong>
        </section>

        <section className={styles.productContainer}>
          <button className={styles.backButton} onClick={() => navigate(-1)}>
            ← Volver al catálogo
          </button>

          <div className={styles.productGrid}>
            {/* Imagen y descarga */}
            <div className={styles.leftColumn}>
              <div className={styles.imageContainer}>
                <img src={product.image} alt={product.name} />
              </div>
              <div className={styles.technicalSheet}>
                <h4>Plano Técnico</h4>
                <div className={styles.noSheet}>
                  <p>Plano técnico disponible</p>
                </div>
                <a href="#" className={styles.downloadLink}>
                  ↓ Descargar PDF
                </a>
              </div>
            </div>

            {/* Información del producto */}
            <div className={styles.rightColumn}>
              <div className={styles.header}>
                <span className={styles.sku}>{product.sku}</span>
              </div>

              <h1 className={styles.productTitle}>{product.name}</h1>

              <div>
                <div className={styles.availabilityRow}>
                  <span className={styles.availabilityCheck}>✓</span>
                  <span
                    className={styles.availabilityLabel}
                    style={{ color: product.stockColor === "#fef3c7" ? "#b45309" : "#10b981" }}
                  >
                    {product.availability}
                  </span>
                  <span className={styles.availabilityText}>{product.availabilityText}</span>
                </div>
                <p className={styles.productDescription}>{product.description}</p>
              </div>

              <div className={styles.specifications}>
                <h3>Especificaciones Técnicas</h3>

                {getSpecificationItems(product).map((item) => (
                  <div key={item.label} className={styles.specItem}>
                    <div className={styles.specIconWrapper} style={{ backgroundColor: item.iconBg }}>
                      <img className={styles.specIconImage} src={item.icon} alt={item.label} />
                    </div>
                    <div>
                      <h4>{item.label}</h4>
                      <p>{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Section */}
              <div className={styles.ctaSection}>
                <h3>¿Interesado en este producto?</h3>
                <p>Selecciona una cotización personalizada y nuestro equipo te contactará</p>
                <div className={styles.ctaButtons}>
                  <button className={styles.quoteButton}>
                    🛒 Solicitar Cotización
                  </button>
                  <button className={styles.whatsappButton}>
                    Consultar por WhatsApp
                  </button>
                </div>
              </div>

              {/* Notas adicionales */}
              <div className={styles.additionalNotes}>
                <h4>Notas adicionales</h4>
                <ul>
                  {product.notes.map((note, index) => (
                    <li key={index}>
                      <span>✓</span> {note}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
