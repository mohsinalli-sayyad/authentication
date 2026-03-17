import { loginUser } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be 6 characters"),
});

export default function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await loginUser(data);

      toast.success(res.data.message);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register("email")}
            name="email"
            placeholder="Email"
            className="w-full p-2 border rounded"
          />
          <p className="text-red-500 text-sm">{errors.email?.message}</p>

          <input
            {...register("password")}
            name="password"
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded"
          />
          <p className="text-red-500 text-sm">{errors.password?.message}</p>

          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Login
          </button>

          <p className="text-center text-sm">
            Don't have an account?{" "}
            <Link to={"/register"} className="text-blue-600">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
