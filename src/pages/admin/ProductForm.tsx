import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { z } from "zod";
import { ProductContext } from "../../contexts/ProductContext";
import { Product } from "../../interface/Product";

const productSchema = z.object({
  title: z.string().min(6),
  price: z.number().min(0),
  description: z.string().optional(),
});

const ProductForm = () => {
  const { id } = useParams();
  const { onSubmit, getDetail, state } = useContext(ProductContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Product>({
    resolver: zodResolver(productSchema),
  });

  if (id) {
    useEffect(() => {
      (async () => {
        await getDetail(id);
        reset(state.selectedProduct);
      })();
    }, [id]);
  }
  return (
    <form onSubmit={handleSubmit((data) => onSubmit({ ...data, id }))}>
      <h2>{id ? "Edit product" : "Add product"}</h2>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          {...register("title", { required: true })}
        />
        {errors.title && (
          <span className="text-danger">{errors.title.message}</span>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="price" className="form-label">
          price
        </label>
        <input
          type="number"
          className="form-control"
          {...register("price", { required: true, valueAsNumber: true })}
        />
        {errors.price && (
          <span className="text-danger">{errors.price.message}</span>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          description
        </label>
        <input
          type="text"
          className="form-control"
          {...register("description", { required: true })}
        />
      </div>

      <div className="mb-3">
        <button className="btn btn-primary w-100">
          {id ? "Edit product" : "Add product"}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
