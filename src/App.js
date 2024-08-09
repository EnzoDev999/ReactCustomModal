// App.js
import React, { useState } from "react";
import Modal from "./components/Modal";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
      <Modal
        style={{ backgroundColor: "red" }}
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
          title: "Title",
          message: "This modal doesn't have a title.",
          buttonText: "Close modal",
        }}
      ></Modal>
    </div>
  );
};

export default App;
