# Museo Interactivo

PWA mobile-first para expediciones de museo, con funcionamiento local sin conexión y sincronización idempotente cuando Supabase está configurado.

## Ejecutar

1. Instala Node.js 20 o posterior.
2. Copia `.env.example` a `.env.local` y completa las claves de Supabase (la aplicación puede iniciarse sin ellas en modo invitado local).
3. Ejecuta `npm install` y luego `npm run dev`.
4. Abre `http://localhost:3000`. Para probar offline, visita una vez, abre las herramientas del navegador y activa el modo sin conexión.

## Qué incluye el MVP

- Colección de 12 criaturas, navegación móvil y datos científicos de ejemplo.
- Descubrimiento local por QR lógico (por ejemplo `MUSEO://CREATURE/TRICERATOPS_01`), XP, nivel, favoritos, misiones y logros.
- IndexedDB mediante Dexie para el perfil, fotos y cola `syncQueue`.
- Fotos capturadas o elegidas desde el dispositivo, conservadas como `Blob` local y encoladas.
- Service worker y manifest instalable con caché de shell de aplicación.
- Paquete básico de expedición; la siguiente evolución debe almacenar los manifiestos de cada paquete y sus media URLs en Cache Storage.
- Ruta de administración inicial: `/admin`.

## Supabase

Aplica `supabase/migrations/001_initial_schema.sql` en el SQL Editor. Crea un bucket privado `museum-media` para contenidos y un bucket `visitor-photos` para fotografías. Implementa políticas de Storage equivalentes a las tablas.

El cliente llama a `sync_events` mediante `upsert(id)`: cada acción lleva un UUID local, por lo que reintentar nunca duplica eventos. Los descubrimientos y fotos son eventos inmutables; en servidor deben procesarse de forma transaccional. Los campos de perfil se resuelven por `updated_at`; XP, progreso y logros se derivan o agregan desde eventos, nunca se reemplazan a ciegas. Las acciones sólo se marcan sincronizadas tras la confirmación del servidor y mantienen `retryCount` al fallar.

## Pendiente para producción

- Completar autenticación Supabase (incluida migración de invitado) y comprobar el rol de administrador en middleware.
- Añadir un endpoint/Edge Function que proyecte `sync_events` a descubrimientos, XP, misiones, fotos y logros de forma atómica.
- Integrar el lector de cámara `html5-qrcode` (la pantalla actual permite pruebas manuales sin requerir permisos) y el generador `qrcode` en CRUD admin.
- Versionar paquetes multimedia y precachear sus URLs con estimación real de cuota (`navigator.storage.estimate`).
