# La Monaie Haïtienne - Application Éducative

Une application web interactive pour apprendre la monnaie haïtienne avec 50 tâches éducatives.

## Fonctionnalités

- 🎯 **50 tâches interactives** sur la monnaie haïtienne
- 🔊 **Audio en français** intégré (synthèse vocale)
- 🖼️ **Images des billets** intégrées (Base64/SVG)
- 📱 **Design responsive** pour tous les appareils
- 📊 **Suivi de progression** avec score
- 📄 **Génération de rapports** PDF
- 🎨 **Interface moderne** et intuitive

## Fichiers de l'application

1. **index.html** - Page principale
2. **style.css** - Styles CSS
3. **script.js** - Logique JavaScript
4. **data.json** - Données de configuration
5. **README.md** - Ce fichier

## Comment utiliser

### Sur GitHub Pages :
1. Téléchargez tous les fichiers
2. Créez un nouveau repository sur GitHub
3. Uploadez tous les fichiers
4. Activez GitHub Pages dans les paramètres
5. L'application sera disponible à : `https://[votre-username].github.io/[nom-du-repository]`

### Localement :
1. Téléchargez tous les fichiers
2. Ouvrez `index.html` dans un navigateur
3. L'application fonctionnera immédiatement

## Configuration audio

L'application utilise la synthèse vocale du navigateur. Pour une meilleure expérience :
- Utilisez Chrome, Firefox ou Edge
- Assurez-vous que votre navigateur supporte la synthèse vocale
- Les voix françaises sont automatiquement détectées

## Personnalisation

### Pour modifier les images :
Les images des billets sont encodées en Base64 dans `script.js`. Pour les changer :
1. Remplacez les chaînes Base64 dans la variable `moneyImages`
2. Utilisez des images SVG ou PNG encodées en Base64

### Pour modifier les tâches :
- Éditez les fonctions de création de tâches dans `script.js`
- Modifiez les types de tâches dans `initializeTasks()`

### Pour modifier le design :
- Éditez `style.css` pour changer les couleurs, polices, etc.
- Toutes les variables CSS sont définies dans `:root`

## Compatibilité

- ✅ Tous les navigateurs modernes
- ✅ Mobile (iPhone, Android)
- ✅ Tablette (iPad, Android)
- ✅ Desktop (Windows, Mac, Linux)
- ✅ GitHub Pages

## Support

Pour toute question ou problème :
1. Vérifiez que tous les fichiers sont présents
2. Assurez-vous que JavaScript est activé
3. Vérifiez la console du navigateur pour les erreurs

## Licence

Cette application est fournie à des fins éducatives.