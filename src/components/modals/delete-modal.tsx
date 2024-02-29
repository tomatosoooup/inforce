import { useDispatch } from "react-redux";
import styled from "styled-components";
import { AppDispatch } from "../../state/store";
import { deleteProduct } from "../../state/productsSlice";

interface DeleteProductModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  productId: string;
}

const DeleteProductModal = ({
  isOpen,
  onOpenChange,
  productId,
}: DeleteProductModalProps) => {
  if (!isOpen) return null;

  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = () => {
    dispatch(deleteProduct(productId as string));
    onOpenChange(false);
  };

  return (
    <ModalBackdrop onClick={() => onOpenChange(false)}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <h2>Confirm Deletion</h2>
        </ModalHeader>
        <ModalBody>
          <p>Are you sure you want to delete this product?</p>
        </ModalBody>
        <ModalFooter>
          <ButtonSubmit onClick={handleDelete}>Delete</ButtonSubmit>
          <ButtonClose onClick={() => onOpenChange(false)}>Deny</ButtonClose>
        </ModalFooter>
      </ModalContainer>
    </ModalBackdrop>
  );
};

export default DeleteProductModal;

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 30;
`;

const ModalContainer = styled.div`
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  padding: 20px;
`;

const ModalHeader = styled.div`
  text-align: center;
  margin-bottom: 10px;
`;

const ModalBody = styled.div`
  margin-bottom: 20px;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const ButtonSubmit = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;

  cursor: pointer;
  width: calc(50% - 1rem);
`;

const ButtonClose = styled.button`
  background-color: #da1e2e;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;

  cursor: pointer;
  width: calc(50% - 1rem);
`;
