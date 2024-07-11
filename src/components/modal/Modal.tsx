// // components/Modal.tsx
// import React, { FC } from "react";

// interface ModalProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white p-4 rounded-lg">
//         <button className="mb-4" onClick={onClose}>
//           닫기
//         </button>
//         {children}
//       </div>
//     </div>
//   );
// };

// export default Modal;
