import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";

import { useDispatch } from "react-redux";

import { AppDispatch } from "../../state/store";
import { addProduct } from "../../state/productsSlice";
import { useForm } from "react-hook-form";
import { ProductSchema } from "../../schemas";

import styled from "styled-components";
import Modal from "./modal-wrapper";

import { faker } from "@faker-js/faker";

interface AddProductFormProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const AddProductForm = ({ isOpen, onOpenChange }: AddProductFormProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
  });

  const imageUrl = faker.image.urlPicsumPhotos();

  const onSubmit = (values: z.infer<typeof ProductSchema>) => {
    const { name, count, size, weight } = values;
    const { width, height } = size;

    dispatch(
      addProduct({
        id: uuidv4(),
        name,
        count: parseInt(count),
        size: {
          width,
          height,
        },
        weight,
        imageUrl: imageUrl,
      })
    );

    reset();
    onOpenChange(false);
  };

  return (
    <>
      {isOpen && (
        <Modal>
          <FormContainer onSubmit={handleSubmit(onSubmit)}>
            <InputContainer>
              <Label>Product Name</Label>
              <Input type="text" {...register("name")} />
              {errors.name && (
                <ErrorMessage>{errors.name.message}</ErrorMessage>
              )}
            </InputContainer>

            <InputContainer>
              <Label>Count</Label>
              <Input type="number" {...register("count")} />
              {errors.count && (
                <ErrorMessage>{errors.count.message}</ErrorMessage>
              )}
            </InputContainer>
            <InputContainer>
              <Label>Width</Label>
              <Input type="number" {...register("size.width")} />
              {errors.size?.width && (
                <ErrorMessage>{errors.size.width.message}</ErrorMessage>
              )}
            </InputContainer>
            <InputContainer>
              <Label>Height</Label>
              <Input type="number" {...register("size.height")} />
              {errors.size?.height && (
                <ErrorMessage>{errors.size.height.message}</ErrorMessage>
              )}
            </InputContainer>
            <InputContainer>
              <Label>Weight</Label>
              <Input type="number" {...register("weight")} />
              {errors.weight && (
                <ErrorMessage>{errors.weight.message}</ErrorMessage>
              )}
            </InputContainer>
            <ButtonsContainer>
              <SubmitButton type="submit">Add Product</SubmitButton>
              <CloseButton onClick={() => onOpenChange(false)}>
                Вийти
              </CloseButton>
            </ButtonsContainer>
          </FormContainer>
        </Modal>
      )}
    </>
  );
};

export default AddProductForm;

const FormContainer = styled.form`
  display: flex;
  gap: 10px;
  min-width: 500px;
  max-width: 800px;
  margin: 0 auto;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(50% - 2rem);
`;

const Label = styled.label`
  font-weight: bold;
  color: black;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ErrorMessage = styled.p`
  color: red;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  z-index: 40;
  width: 100%;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: calc(50% - 2rem);
  transition: background-color 0.3s ease;
  text-transform: uppercase;

  &:hover {
    background-color: #0056b3;
  }
`;

const CloseButton = styled.button`
  padding: 10px 20px;
  background-color: #f11023;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: calc(50% - 2rem);
  transition: background-color 0.3s ease;
  text-transform: uppercase;

  &:hover {
    background-color: #e61515;
  }
`;
