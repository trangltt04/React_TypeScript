import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AuthContext } from "../contexts/AuthContext";
import { User } from "../interface/User";

type Props = {
  isLogin?: boolean;
};
const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const AuthForm = ({ isLogin }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    resolver: zodResolver(userSchema),
  });

  const { onSubmit } = useContext(AuthContext);

  return (
    <form onSubmit={handleSubmit((user) => onSubmit(user, isLogin))}>
      <h2>{isLogin ? "Login" : "Register"}</h2>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          className="form-control"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <span className="text-danger">{errors.email.message}</span>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          {...register("password", { required: true })}
        />
        {errors.password && (
          <span className="text-danger">{errors.password.message}</span>
        )}
      </div>
      <div className="mb-3">
        <button className="btn btn-primary w-100">
          {isLogin ? "Login" : "Register"}
        </button>
      </div>
    </form>
  );
};

export default AuthForm;
