import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectProductById } from "../state/productsSlice";
import { RootState } from "../state/store";
import ProductItem from "./ProductItem";
import styled from "styled-components";
import { useState } from "react";
import AddCommentForm from "./modals/add-review";

const ProductView = () => {
  const { id } = useParams();

  const product = useSelector((state: RootState) =>
    selectProductById(state, id as string)
  );

  if (!product) {
    return <div>Product not found.</div>;
  }

  const { count, name, size, weight, comments, imageUrl } = product;

  const [isAddReviewModalOpen, setIsAddReviewModalOpen] = useState(false);

  console.log(comments);

  return (
    <>
      <AddCommentForm
        isOpen={isAddReviewModalOpen}
        onOpenChange={setIsAddReviewModalOpen}
        productId={id as string}
      />
      <Wrapper>
        <ProductItem
          count={count}
          name={name}
          size={size}
          weight={weight}
          imageUrl={imageUrl as string}
        />
        <button
          onClick={() => {
            setIsAddReviewModalOpen((prev) => !prev);
          }}
        >
          Add review
        </button>
        <div>
          <h2>Reviews:</h2>
          {comments?.map((comment) => (
            <p key={comment.id}>{comment.description}</p>
          ))}
        </div>
      </Wrapper>
    </>
  );
};

export default ProductView;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
