import * as z from "zod";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { addComment } from "../../state/commentsSlice";
import { useForm } from "react-hook-form";
import { ReviewSchema } from "../../schemas";
import { AppDispatch } from "../../state/store";

interface AddCommentFormProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  productId: string;
}

const AddCommentForm = ({
  isOpen,
  onOpenChange,
  productId,
}: AddCommentFormProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const { register, handleSubmit, reset } =
    useForm<z.infer<typeof ReviewSchema>>();

  const onSubmit = (values: z.infer<typeof ReviewSchema>) => {
    const comment = {
      productId: productId,
      description: values.description,
    };
    dispatch(addComment(comment));
    reset();
  };

  return (
    <>
      {isOpen && (
        <Overlay>
          <button onClick={() => onOpenChange(false)}>Close</button>
          <FormContainer onSubmit={handleSubmit(onSubmit)}>
            <TextArea
              {...register("description")}
              placeholder="Add your comment..."
            />
            <Button type="submit">Add Comment</Button>
          </FormContainer>
        </Overlay>
      )}
    </>
  );
};

export default AddCommentForm;

const Overlay = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 40;
`;

const FormContainer = styled.form`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
`;

const TextArea = styled.textarea`
  width: 350px;
  height: 100px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;
