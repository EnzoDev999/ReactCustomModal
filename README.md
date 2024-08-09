# React Modal Enzo

React Modal Enzo est un composant de modal personnalisable pour React. Il offre des animations configurables et permet l'ajout de contenu dynamique.

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
        fadeDuration={1000}
        clickOutsideClose={true}
        disableEscClose={false}
        animationConfig={{
          open: { easing: "ease-in-out", transform: "translateY(0)" },
          close: { easing: "ease-out", transform: "translateY(-20px)" },
        }}
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

| Propriété           | Type               | Obligatoire | Par défaut                                                                                                                       | Description                                                                |
| ------------------- | ------------------ | ----------- | -------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `isOpen`            | `boolean`          | Oui         | —                                                                                                                                | Contrôle si la modal est ouverte ou fermée.                                |
| `onClose`           | `function`         | Oui         | —                                                                                                                                | Fonction appelée pour fermer la modal.                                     |
| `children`          | `ReactNode`        | Non         | —                                                                                                                                | Contenu additionnel à afficher dans la modal.                              |
| `fadeDuration`      | `number`           | Non         | `300`                                                                                                                            | Durée de la transition d'animation en millisecondes.                       |
| `clickOutsideClose` | `boolean`          | Non         | `true`                                                                                                                           | Permet de fermer la modal en cliquant à l'extérieur.                       |
| `closeExisting`     | `boolean`          | Non         | `true`                                                                                                                           | Ferme d'autres modales ouvertes lorsque celle-ci s'ouvre.                  |
| `disableEscClose`   | `boolean`          | Non         | `false`                                                                                                                          | Désactive la fermeture de la modal avec la touche Échap.                   |
| `closeTriggers`     | `array of strings` | Non         | `[]`                                                                                                                             | Sélecteurs CSS pour les éléments qui déclenchent la fermeture de la modal. |
| `animationConfig`   | `object`           | Non         | `{ open: { easing: "ease-in-out", transform: "translateY(0)" }, close: { easing: "ease-out", transform: "translateY(-20px)" } }` | Configuration des animations pour l'ouverture et la fermeture de la modal. |
| `content`           | `object`           | Non         | `{ title: "Default Title", message: "Default message content.", buttonText: "Close" }`                                           | Contenu textuel par défaut de la modal.                                    |
| `customClass`       | `string`           | Non         | `""`                                                                                                                             | Classe CSS personnalisée pour la modal.                                    |
| `style`             | `object`           | Non         | `{}`                                                                                                                             | Style CSS inline supplémentaire pour la modal.                             |

## Personnalisation du style

Pour personnaliser davantage la modal, vous pouvez ajouter votre propre CSS en utilisant la prop customClass pour cibler les éléments de la modal.

```bash
.my-custom-class {
  border-radius: 10px;
  padding: 30px;
}
```

## Contribution

Les contributions sont les bienvenues. Veuillez ouvrir une issue pour discuter de vos idées ou soumettre une pull request.
