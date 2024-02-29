import { useState } from "react";
import styled from "styled-components";
import DeleteProductModal from "./modals/delete-modal";
import { Link } from "react-router-dom";

interface ProductItemProps {
  id?: string;
  imageUrl: string;
  name: string;
  count: number;
  size: { width: string | number; height: string | number };
  weight: string | number;
}

const ProductItem = ({
  id,
  imageUrl,
  name,
  size,
  count,
  weight,
}: ProductItemProps) => {
  const [productId, setProductId] = useState<string>("");
  const [deleteProductModalOpen, setDeleteProductModalOpen] =
    useState<boolean>(false);

  return (
    <>
      <DeleteProductModal
        isOpen={deleteProductModalOpen}
        onOpenChange={setDeleteProductModalOpen}
        productId={productId}
      />
      <Product>
        <DeleteIcon
          onClick={() => {
            setDeleteProductModalOpen((prev) => !prev);
            setProductId(id as string);
            console.log(`delete product ${id}`);
          }}
          title="Delete Product"
        >
          X
        </DeleteIcon>
        <ProductImage src={imageUrl} alt={name} />
        <ProductName>{name}</ProductName>
        <ProductDetails>
          Count: {count}
          <span>
            Sizes: {size?.width}x{size?.height}
          </span>
          <span>Weight: {weight}</span>
        </ProductDetails>
        {id && <Link to={`products/${id}`}>Переглянути</Link>}
      </Product>
    </>
  );
};

export default ProductItem;

const Product = styled.li`
  background-color: #abc6e0;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  width: 300px;
  text-align: center;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ProductImage = styled.img`
  width: 250px;
  border-radius: 8px;
`;

const ProductName = styled.div`
  font-weight: bold;
  margin-top: 10px;
`;

const ProductDetails = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: center;
`;

const DeleteIcon = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  color: red;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s ease;
  background-color: white;
  padding: 5px;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  z-index: 10;
  text-align: center;

  ${Product}:hover & {
    opacity: 1;
  }
`;
