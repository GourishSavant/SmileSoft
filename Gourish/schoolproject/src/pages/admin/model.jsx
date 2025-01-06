import React from "react";
import Modal from "react-modal";

// This is to prevent accessibility issues with modal in React Modal
Modal.setAppElement('#root');

const CustomModal = ({ isOpen, closeModal, modalContent }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} contentLabel="Quick Link Modal">
      <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800 dark:text-white">
        <h2 className="text-xl font-bold mb-4">Quick Link Details</h2>
        <p>{modalContent}</p>
        <div className="mt-4">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded"
            onClick={closeModal} // Close the modal
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CustomModal;
