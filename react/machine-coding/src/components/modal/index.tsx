import {
  useRef,
  useState,
  useEffect,
  useContext,
  createContext,
  type FC,
  type PropsWithChildren,
  type ReactNode,
  type MouseEvent,
  type SyntheticEvent,
} from "react";
import { createPortal } from "react-dom";

interface ModalContext {
  activeModalId: string | null;
  openModal: (id: string) => void;
  closeModal: () => void;
}

interface ModalProps {
  id: string;
}

const ModalContext = createContext<ModalContext | null>(null);

const ModalContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [activeModalId, setActiveModalId] = useState<string | null>(null);

  const openModal = (id: string) => {
    setActiveModalId(id);
  };

  const closeModal = () => {
    setActiveModalId(null);
  };

  return (
    <ModalContext.Provider value={{ activeModalId, closeModal, openModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error(
      "useModalContext can only be used inside ModalContextProvider",
    );
  }

  return context;
};

const Modal: FC<PropsWithChildren<ModalProps>> = ({ children, id }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { activeModalId, closeModal } = useModalContext();

  const isOpen = activeModalId === id;

  useEffect(() => {
    const dialogEl = dialogRef.current;

    if (!dialogEl) {
      return;
    }

    if (isOpen && !dialogEl.open) {
      dialogEl.showModal();
    }

    if (!isOpen && dialogEl.open) {
      dialogEl.close();
      closeModal();
    }
  }, [isOpen, closeModal]);

  const handleOnCancelDialog = (event: SyntheticEvent) => {
    event.preventDefault();
    closeModal();
  };

  const handleOnClick = (event: MouseEvent<HTMLDialogElement>) => {
    // other click event logic

    handleOnOutsideClick(event);
  };

  const handleOnOutsideClick = (event: MouseEvent<HTMLDialogElement>) => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    const dialogRect = dialog.getBoundingClientRect();
    const isClickedOutside =
      event.clientX < dialogRect.left ||
      event.clientX > dialogRect.right ||
      event.clientY < dialogRect.top ||
      event.clientY > dialogRect.bottom;

    if (isClickedOutside) {
      closeModal();
    }
  };

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <dialog
      className="modal-dialog"
      onClick={handleOnClick}
      onCancel={handleOnCancelDialog}
      ref={dialogRef}
    >
      <div className="modal-body">{children}</div>
      {/**Allows to find the bounding client rect */}
    </dialog>,
    document.body, // avoids the z-index stacking issue
  );
};

function ModalApp() {
  const { openModal, closeModal } = useModalContext();

  return (
    <>
      <button onClick={() => openModal("redirect-confirm")}>redirect</button>

      <Modal id="redirect-confirm">
        <div>
          <h2>Are you sure?</h2>
          <p>
            Do you wish to continue redirection? This process is not reversible.
          </p>
          <button onClick={closeModal}>cancel</button>
          <button
            onClick={() => {
              // other onclick logic
              closeModal();
            }}
          >
            confirm
          </button>
        </div>
      </Modal>
    </>
  );
}

export default function ModalWrapperApp() {
  return (
    <div className="App">
      <h1>Modal</h1>

      <ModalContextProvider>
        <ModalApp />
      </ModalContextProvider>
    </div>
  );
}
