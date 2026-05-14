# ATISA Industrial — SLA Monitor

Dashboard de monitoreo de SLA para NOC. Aplicación HTML standalone con React, Chart.js y sistema de almacenamiento local.

## Funcionalidades

- Monitor con 58 servicios (Checador / NVR / Red / Servidores)
- Semáforo animado con selector de mes
- Vista Ejecutiva con impresión PDF
- Comparativos históricos:
  - Overview con 12 gráficas
  - Tendencias
  - Tabla Δ (delta)
  - Heatmap de colores
  - Ranking
- MES vs MES con alertas de nuevas fallas y recuperados
- Exportar / Importar BD completa como JSON
- Exportar CSV multi-mes
- Importar Excel multi-mes

## Cómo usar

1. Abrir `SLA_Monitor_ATISA_standalone.html` en Chrome o Edge
2. Usar **↓BD** para exportar los datos como JSON
3. Usar **↑BD** para importar la BD en otro equipo

## Estructura del proyecto

```
Dashboard-Infraestructura-Atisa/
├── SLA_Monitor_ATISA_standalone.html   # Aplicación principal
├── data/
│   └── SLA_BD_YYYY-MM-DD.json         # Base de datos exportada
└── README.md
```

## Tecnologías

| Librería | Versión |
|---|---|
| React (via Babel CDN) | 18 |
| Chart.js | 4.4.1 |
| XLSX.js | 0.18.5 |
| HTML5 standalone | — |

## Notas

- La aplicación no requiere servidor ni instalación.
- Los datos se almacenan en el navegador (localStorage).
- Para respaldar o migrar datos, usa la función Exportar BD (↓BD).
