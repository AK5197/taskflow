# TaskFlow

Eine moderne Aufgaben- und Team-Management Webanwendung mit **MERN-Stack** (MongoDB, Express.js, React.js, Node.js).  
Entwickelt im Rahmen des Moduls **Schule – Internetdienste**.

---

## Projektbeschreibung

**TaskFlow** ermöglicht es Teams, Aufgaben effizient zu verwalten, zuzuweisen und den Fortschritt zu überwachen.  
Die Anwendung bietet sowohl **Admin-Funktionalitäten** (Erstellen, Zuweisen, Teamübersicht) als auch **User-Funktionalitäten** (eigene Aufgaben bearbeiten und abschließen).  

Ziel ist es, ein praxisnahes Beispiel für eine **komplette MERN-Webanwendung** zu entwickeln – inklusive **REST API**, **responsivem React-Frontend**, **MongoDB-Anbindung** und **Cloud Deployment**.

---

## Features

### Admin
- Dashboard mit KPIs und Diagrammen
- Aufgaben erstellen, bearbeiten und löschen
- Aufgaben an Teammitglieder zuweisen
- Teamübersicht mit Statistiken
- Export der Team-Daten als Excel

### Member
- Eigene Aufgaben einsehen
- Aufgabenstatus ändern (Offen → In Bearbeitung → Abgeschlossen)
- Fortschritt anhand von Checklisten verfolgen
- Aufgaben-Details inkl. Fälligkeitsdatum & Anhängen

---

## Technologien

- **Frontend:** React.js, Vite, Tailwind CSS  
- **Backend:** Node.js, Express.js  
- **Datenbank:** MongoDB (Atlas / lokal)  
- **State Management:** React Context API  
- **Charts:** Recharts  
- **Deployment:**  
  - Frontend → [Vercel](https://taskflow-ten-ashen.vercel.app/)  
  - Backend → [Render](https://taskflow-qgmc.onrender.com/)  

---

## Setup & Installation

### Voraussetzungen
- Node.js **v22.18.0**
- MongoDB Datenbank (lokal oder Atlas)

### Installation & Start

```bash
# 1. Repository klonen
git clone https://github.com/AK5197/taskflow.git
cd taskflow

# 2. Backend installieren & starten
cd backend
npm install
npm run dev

# 3. Frontend installieren & starten (neues Terminal öffnen)
cd ../frontend/taskflow
npm install
npm run dev
```

---

### Environment Variablen

Die echten `.env` Dateien sind **nicht im Repository** enthalten (sicherheitsbedingt).  
Stattdessen liegen im Repo die Dateien **`/backend/.env.example`** und **`/frontend/.env.example`** als Vorlage.  

Vorgehen:  
1. Kopiere die `.env.example` in beiden Ordnern (`backend` und `frontend`).  
2. Benenne die Dateien in `.env` um.  
3. Trage deine individuellen Werte ein (z. B. MongoDB-URL, JWT-Secret).  

Beispiel (Backend `.env`):  
```env
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/taskflow
JWT_SECRET=meinGeheimesJWTSecret
PORT=5000
CLIENT_URL=http://localhost:5173
```

Beispiel (Frontend `.env`):
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## Datenmodell & API
Beispiel: User
```bash
{
  "name": "Max Muster",
  "email": "max@example.com",
  "password": "hashed",
  "role": "member"
}
```
Beispiel: Task
```bash
{
  "title": "Neue Aufgabe",
  "description": "Beschreibung der Aufgabe",
  "priority": "High",
  "status": "Pending",
  "assignedTo": ["UserID1", "UserID2"],
  "todoChecklist": [
    { "text": "Teilaufgabe 1", "completed": false },
    { "text": "Teilaufgabe 2", "completed": true }
  ],
  "attachments": ["https://..."]
}
```

---

## Mögliche Erweiterungen
- Passwort-Reset via E-Mail
- Kalenderintegration (z. B. Google Calendar)
