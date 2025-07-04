# encuestadoss

# Encuesta Rápida - Sistema de Encuestas en Tiempo Real

## 📌 1. Planteamiento del problema
Sistema de encuestas rápidas que permite a profesores y expositores recolectar opiniones y respuestas de estudiantes/asistentes en tiempo real, con una interfaz simple y directa, sin necesidad de herramientas complejas.

## 🎯 2. Objetivos y Restricciones de negocio

### Objetivos
- Permitir la creación de encuestas con preguntas y opciones múltiples
- Facilitar la participación mediante enlaces compartibles
- Mostrar resultados en tiempo real
- Proporcionar una interfaz intuitiva y responsive

### Restricciones de negocio
- No requiere autenticación para responder encuestas
- Solo el creador puede gestionar y cerrar la encuesta
- Limitación de una votación por participante

## 💻 3. Stack Tecnológico
- Frontend: React + Vite
- Backend: Node.js + Express
- Base de datos: MongoDB
- Lenguaje principal: JavaScript

## 🧾 4. Historias de Usuario

### Historia 1: Creación de Encuestas
**Como** creador de encuestas  
**Quiero** crear una nueva encuesta con preguntas y opciones  
**Para** recolectar opiniones de los participantes

**Criterios de aceptación:**
- Formulario con validación de campos requeridos
- Generación de código único para la encuesta
- Interfaz intuitiva para agregar opciones

### Historia 2: Participación en Encuestas
**Como** participante  
**Quiero** votar en una encuesta  
**Para** expresar mi opinión

**Criterios de aceptación:**
- Acceso mediante código único
- Validación de votos únicos
- Confirmación de voto registrado

### Historia 3: Visualización de Resultados
**Como** creador/participante  
**Quiero** ver los resultados de la encuesta  
**Para** conocer las preferencias de los participantes

**Criterios de aceptación:**
- Actualización en tiempo real
- Visualización clara de porcentajes
- Gráficos intuitivos

## 🛡️ 5. ASRs (Arquitectural Significant Requirements)

### Usabilidad
- Interfaz responsive y amigable
- Navegación intuitiva
- Feedback inmediato de acciones

### Rendimiento
- Respuesta rápida en la creación y votación
- Actualización en tiempo real de resultados
- Manejo eficiente de conexiones concurrentes

### Seguridad
- Validación de datos en frontend y backend
- Prevención de votos duplicados
- Protección de rutas sensibles

## 🏛️ 6. Arquitectura del Sistema

### Frontend (React + Vite)

```
src/
├── components/ # Componentes reutilizables
├── App.jsx # Componente principal
├── main.jsx # Punto de entrada
└── assets/ # Recursos estáticos
```

### Backend (Node.js + Express)

```
backend/
├── routes/ # Rutas de la API
│ ├── createEncuesta.js
│ ├── votarEncuesta.js
│ └── resultados.js
├── models/ # Modelos de datos
│ └── Encuesta.js
└── server.js # Servidor principal
```

### Modelo de Datos
```javascript
{
  pregunta: String,
  opciones: [{
    texto: String,
    votos: Number
  }],
  codigo: String,
  creadaEn: Date,
  ipsVotantes:: [String]
}
```

## 🚀 7. MVP Implementado
- [x] Creación de encuestas
- [x] Sistema de votación
- [x] Visualización de resultados
- [x] Interfaz responsive
- [x] Validaciones básicas

## 🧰 8. Tecnologías y Herramientas
- React + Vite para el frontend
- Node.js + Express para el backend
- MongoDB para la base de datos
- Git para control de versiones
- ESLint para linting
- CSS para estilos

## 🗂️ 9. Documentación de Arquitectura
La aplicación sigue una arquitectura cliente-servidor con:
- Frontend SPA (Single Page Application)
- Backend RESTful API
- Base de datos NoSQL
- Comunicación mediante HTTP/HTTPS

## 🌱 10. Git Flow
- `main`: Código en producción
- `develop`: Rama de desarrollo
- `feature/*`: Ramas para nuevas características
- `hotfix/*`: Ramas para correcciones urgentes
- `release/*`: Ramas para preparación de releases

## 🚀 Instalación y Ejecución

### Frontend
```bash
cd encuesta-rapida-frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
npm install
node server.js
```

## 📝 Notas Adicionales
- El sistema está diseñado para ser escalable
- Se implementan buenas prácticas de desarrollo
- Se mantiene un código limpio y documentado

## 🔗 Enlaces del Proyecto

### Repositorios
- Github: [https://github.com/devmiguelgomez/encuestadoss](https://github.com/devmiguelgomez/encuestadoss)

### Despliegue
- Frontend (Vercel): [https://encuestadoss.vercel.app](https://encuestadoss.vercel.app)
- Backend (Vercel): [https://encuestadoss-backend.vercel.app/](https://encuestadoss-backend.vercel.app/)

## 👥 Equipo de Desarrollo

### Integrantes
- **Miguel Gomez**
  - Rol: Desarrollador Frontend
  - GitHub: [@devmiguelgomez](https://github.com/devmiguelgomez)

- **Jairo Moran**
  - Rol: Desarrollador Backend
  - GitHub: [@jairomoran01](https://github.com/jairomoran01)

- **Miguel Gomez**
  - Rol: Diseñador UI/UX
  - GitHub: [@devmiguelgomez](https://github.com/devmiguelgomez)
    
### Responsabilidades
- Frontend: Desarrollo de la interfaz de usuario, componentes React, y experiencia de usuario
- Backend: Desarrollo de la API, base de datos, y lógica de negocio
- Diseño: Diseño de la interfaz, experiencia de usuario, y assets gráficos

### Contribuciones
Cada miembro del equipo ha contribuido significativamente al desarrollo del proyecto, trabajando en diferentes aspectos según sus especialidades y responsabilidades asignadas.

