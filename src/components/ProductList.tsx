import { TiSortAlphabetically } from "react-icons/ti";
import { TbSortAscendingNumbers } from "react-icons/tb";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  selectProducts,
  selectProductsStatus,
  selectProductsError,
} from "../state/productsSlice";

import { AppDispatch } from "../state/store";
import AddProductForm from "./modals/add-product";
import styled from "styled-components";

import ProductItem from "./ProductItem";

const ProductList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [addProductModalOpen, setAddProductModalOpen] =
    useState<boolean>(false);

  const products = useSelector(selectProducts);
  const status = useSelector(selectProductsStatus);
  const error = useSelector(selectProductsError);

  const [sortBy, setSortBy] = useState<"alphabetically" | "count">(
    "alphabetically"
  );

  const sortedProducts = [...products];

  const sortProducts = ({ type }: { type: "alphabetically" | "count" }) => {
    let sortedProductsCopy = [...sortedProducts];
    if (type === "alphabetically") {
      sortedProductsCopy.sort((a, b) => a.name.localeCompare(b.name));
    } else if (type === "count") {
      sortedProductsCopy.sort((a, b) => a.count - b.count);
    }
    return sortedProductsCopy;
    // Not done!
  };

  useEffect(() => {
    sortProducts({ type: sortBy });
  }, [sortProducts, sortBy]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <SectionContainer>
        <Title>Product List</Title>
        <AddProductButton
          type="button"
          onClick={() => setAddProductModalOpen((prev) => !prev)}
        >
          Add product
        </AddProductButton>
        <SortDiv>
          <TiSortAlphabetically
            size={40}
            onClick={() => {
              sortProducts({ type: "alphabetically" });
              setSortBy("alphabetically");
            }}
          />
          <TbSortAscendingNumbers
            size={40}
            onClick={() => {
              sortProducts({ type: "count" });
              setSortBy("count");
            }}
          />
        </SortDiv>
      </SectionContainer>
      <AddProductForm
        isOpen={addProductModalOpen}
        onOpenChange={setAddProductModalOpen}
      />

      <ProductsContainer>
        {sortedProducts.map(({ id, name, count, imageUrl, size, weight }) => (
          <ProductItem
            key={id}
            id={id as string}
            name={name}
            count={count}
            imageUrl={imageUrl as string}
            size={size}
            weight={weight}
          ></ProductItem>
        ))}
      </ProductsContainer>
    </>
  );
};

export default ProductList;

const SectionContainer = styled.div`
  color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  margin: 0;
  font-size: 24px;
`;

const AddProductButton = styled.button`
  background-color: #0c7ca8;
  color: white;
  border: none;
  margin-top: 10px;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  text-transform: uppercase;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #149ba0;
  }
`;

const ProductsContainer = styled.ul`
  max-width: 1200px;
  margin: 20px auto;
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-between;
  overflow-y: auto;
  max-height: 700px;
`;

const SortDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 200px;
  margin: 10px auto;
  & > * {
    cursor: pointer;
    background-color: transparent;
  }
`;
