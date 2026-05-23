FROM node:20-alpine

WORKDIR /app

# Dependencias (cacheadas si package.json no cambia)
COPY api/package.json ./
RUN npm install --omit=dev

# Código de la API + entrypoint
COPY api/server.js ./
COPY api/start.sh ./
RUN chmod +x /app/start.sh

# Frontend
COPY SLA_Monitor_ATISA_standalone.html ./public/index.html

# Seed data: se copia al volumen solo si no existe sla_bd.json
COPY data/ /seed/

RUN mkdir -p /data

EXPOSE 3001

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s \
  CMD wget -qO- http://localhost:3001/health || exit 1

CMD ["/app/start.sh"]
