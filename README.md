# 🧄 Ajo Negro — App de Control de Producción

App PWA para registro diario de temperatura y humedad durante el proceso de maduración de ajo negro.

---

## 📲 Cómo publicar en GitHub Pages (paso a paso)

### Paso 1 — Crear cuenta en GitHub
1. Ir a **https://github.com**
2. Hacer clic en **"Sign up"**
3. Completar: nombre de usuario, email, contraseña
4. Verificar el email

---

### Paso 2 — Crear el repositorio
1. Una vez dentro, hacer clic en el botón verde **"New"** (o el ícono `+` arriba a la derecha → "New repository")
2. Completar:
   - **Repository name:** `ajo-negro` (o el nombre que quieras)
   - **Visibility:** Public ✅ (necesario para GitHub Pages gratis)
   - Tildar **"Add a README file"**
3. Clic en **"Create repository"**

---

### Paso 3 — Subir los archivos
1. Dentro del repositorio recién creado, clic en **"Add file" → "Upload files"**
2. Arrastrar o seleccionar **todos** estos archivos:
   - `index.html`
   - `manifest.json`
   - `sw.js`
   - `icon-192.svg`
   - `icon-512.svg`
3. En el campo de abajo escribir: `Primera versión de la app`
4. Clic en **"Commit changes"**

---

### Paso 4 — Activar GitHub Pages
1. Ir a la pestaña **"Settings"** del repositorio (engranaje)
2. En el menú izquierdo, clic en **"Pages"**
3. En **"Branch"**, seleccionar `main` y carpeta `/ (root)`
4. Clic en **"Save"**
5. Esperar 1-2 minutos → aparecerá el mensaje:

   > ✅ Your site is live at `https://TUUSUARIO.github.io/ajo-negro`

---

### Paso 5 — Instalar en el teléfono

#### Android (Chrome):
1. Abrir la URL en Chrome
2. Aparece automáticamente un banner **"Agregar a pantalla de inicio"** → tocarlo
3. O: menú ⋮ → **"Agregar a pantalla de inicio"**
4. La app aparece como ícono en el escritorio

#### iPhone (Safari):
1. Abrir la URL en **Safari** (no Chrome)
2. Tocar el ícono de compartir (cuadrado con flecha)
3. **"Agregar a pantalla de inicio"**
4. Confirmar → ícono en el escritorio

---

## ✅ Características de la app

- Registro diario de temperatura y humedad (mañana + tarde)
- Cálculo automático de promedios y desvíos vs. objetivo de cada fase
- Curva visual del lote completo
- Funciona **sin internet** una vez instalada (offline)
- Datos guardados localmente en el dispositivo
- Exportación a CSV al finalizar el ciclo

## 🔄 Fases del proceso

| Fase | Días | Temperatura | Humedad |
|------|------|-------------|---------|
| Fase 1 — Deshidratación | 1–7   | 70–75°C | 70–75% |
| Fase 2 — Maillard       | 8–30  | 60–65°C | 80–90% |
| Fase 3 — Estabilización | 31–40 | 55–60°C | 75–80% |
