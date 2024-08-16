# React Modal Enzo

React Modal Enzo est un composant de modal personnalisable pour React permettant l'ajout de contenu dynamique.

## Installation

Pour installer le package via npm, utilisez la commande suivante :

```bash
npm install react-modal-enzo
```

## Utilisation

Voici comment utiliser le composant Modal dans votre projet :

**Importation**

```bash
import Modal from 'react-modal-enzo';
```

**Exemple d'utilisation**

```bash
import React, { useState } from "react";
import Modal from "react-modal-enzo";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        clickOutsideClose={true}
        disableEscClose={false}
        content={{
          title: "Welcome",
          message: "This is a customizable modal.",
          buttonText: "Close",
        }}
        customClass="my-custom-class"
        style={{ backgroundColor: "#fff" }}
      />
    </div>
  );
};

export default App;
```

## Propriétés du composant

| Propriété           | Type               | Obligatoire | Par défaut                                                                             | Description                                                                |
| ------------------- | ------------------ | ----------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `isOpen`            | `boolean`          | Oui         | —                                                                                      | Contrôle si la modal est ouverte ou fermée.                                |
| `onClose`           | `function`         | Oui         | —                                                                                      | Fonction appelée pour fermer la modal.                                     |
| `children`          | `ReactNode`        | Non         | —                                                                                      | Contenu additionnel à afficher dans la modal.                              |
| `clickOutsideClose` | `boolean`          | Non         | `true`                                                                                 | Permet de fermer la modal en cliquant à l'extérieur.                       |
| `closeExisting`     | `boolean`          | Non         | `true`                                                                                 | Ferme d'autres modales ouvertes lorsque celle-ci s'ouvre.                  |
| `disableEscClose`   | `boolean`          | Non         | `false`                                                                                | Désactive la fermeture de la modal avec la touche Échap.                   |
| `closeTriggers`     | `array of strings` | Non         | `[]`                                                                                   | Sélecteurs CSS pour les éléments qui déclenchent la fermeture de la modal. |
| `content`           | `object`           | Non         | `{ title: "Default Title", message: "Default message content.", buttonText: "Close" }` | Contenu textuel par défaut de la modal.                                    |
| `customClass`       | `string`           | Non         | `""`                                                                                   | Classe CSS personnalisée pour la modal.                                    |
| `style`             | `object`           | Non         | `{}`                                                                                   |

## Personnalisation des éléments internes

Le composant `Modal` vous permet de personnaliser les styles de la modal et de ses éléments internes en utilisant la prop `customClass` pour ajouter une classe personnalisée à l'overlay (`modal-overlay`) et la prop `style` pour styliser le contenu de la modal (`modal-content`).

### Utilisation de `customClass`

La prop `customClass` ajoute une classe CSS personnalisée à l'overlay, qui entoure la modal. Vous pouvez l'utiliser pour styliser l'overlay et cibler les éléments internes de la modal comme le contenu (`modal-content`) et le bouton de fermeture (`close-button`).

```css
/* Exemple de style pour l'overlay */
.my-custom-overlay {
  background-color: rgba(0, 0, 0, 0.8); /* Changer la couleur de l'overlay */
}

/* Exemple de style pour le contenu de la modal */
.my-custom-overlay .modal-content {
  background-color: white;
  border-radius: 10px;
  padding: 30px;
}

/* Exemple de style pour le bouton de fermeture */
.my-custom-overlay .close-button {
  color: red;
  font-size: 24px;
}
```

### Utilisation de `style`

La prop style vous permet de passer des styles en ligne directement au contenu de la modal (modal-content). Ces styles sont appliqués directement à l'élément contenant le contenu de la modal, mais ils n'affectent pas les éléments enfants comme le bouton de fermeture.

```bash
<Modal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  customClass="my-custom-overlay"
  style={{ backgroundColor: "#fff", padding: "20px" }} // Styles appliqués à .modal-content
/>
```

Avec le CSS suivant :

```css
.my-custom-overlay {
  background-color: rgba(0, 0, 0, 0.8);
}

.my-custom-overlay .modal-content {
  border-radius: 10px;
}

.my-custom-overlay .close-button {
  color: red;
  font-size: 24px;
}
```

## Conclusion

En utilisant customClass et style, vous avez un contrôle total sur le style de l'overlay et du contenu de la modal. Pour styliser des éléments internes spécifiques comme le bouton de fermeture, utilisez des sélecteurs CSS appropriés avec la classe ajoutée via customClass.

## Contribution

Les contributions sont les bienvenues. Veuillez ouvrir une issue pour discuter de vos idées ou soumettre une pull request.
