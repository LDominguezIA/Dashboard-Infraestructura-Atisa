#!/bin/sh
# Seed inicial: copia el JSON de datos si no existe sla_bd.json en el volumen
if [ ! -f /data/sla_bd.json ]; then
  SEED=$(ls /seed/*.json 2>/dev/null | head -1)
  if [ -n "$SEED" ]; then
    echo "[SLA] Sembrando datos iniciales desde $(basename $SEED)..."
    cp "$SEED" /data/sla_bd.json
  else
    echo "[SLA] Sin datos seed — BD vacía, se creará al primer guardado."
  fi
else
  echo "[SLA] BD existente detectada — omitiendo seed."
fi

exec node server.js
