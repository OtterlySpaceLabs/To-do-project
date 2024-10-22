# T3 Todo list

Projet de todo list réalisé par Marine.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants sur votre machine :

- **Node.js**
- **NPM**
- **Docker** (doit être en cours d'exécution)

## Installation

**Initialiser la base de données sur Docker**

   Exécutez le script `start-database.sh` pour initialiser la base de données sur Docker :

   ```bash
   ./start-database.sh
   ```

**Construire la base de données**

   Exécutez la commande suivante pour construire la base de données :

   ```bash
   npm run db:push
   ```

**Configurer les fichiers d'environnement**

   Copiez le fichier `.env.exemple` et renommez-le en `.env` :

   ```bash
   cp .env.exemple .env
   ```

**Remplir les identifiants Discord**

   Ouvrez le fichier `.env` et renseignez les identifiants de Discord, utilisés pour la connexion à l'application. Assurez-vous également de définir la variable `NEXTAUTH_SECRET`.

**Installer les dépendances**

   Installez les dépendances du projet avec NPM :

   ```bash
   npm install
   ```

**Lancer l'application**

   Démarrez l'application en mode développement :

   ```bash
   npm run dev
   ```



À ce stade, l'application devrait fonctionner correctement.
