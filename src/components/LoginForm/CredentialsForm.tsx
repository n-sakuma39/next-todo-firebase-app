import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const loginSchema = z.object({
  id: z.string().min(1, "IDは必須です"),
  password: z.string().min(6, "パスワードは6文字以上である必要があります"),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface CredentialsFormProps {
  onSubmit: (data: LoginFormData) => void;
  error: string;
}

const CredentialsForm: React.FC<CredentialsFormProps> = ({
  onSubmit,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-7">
      <div className="mb-4">
        <Label
          htmlFor="id"
          className="mb-2 block text-sm text-muted-foreground"
        >
          ID
        </Label>
        <Input {...register("id")} type="text" id="id" />
        {errors.id && (
          <p className="text-red-500 text-sm mt-1">{errors.id.message}</p>
        )}
      </div>
      <div className="mb-5 relative">
        <Label
          htmlFor="password"
          className="mb-2 block text-sm text-muted-foreground"
        >
          パスワード
        </Label>
        <div className="relative">
          <Input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            id="password"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-400 hover:text-gray-500"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>
      {error && (
        <p className="text-red-500 text-base mb-5 text-center">{error}</p>
      )}
      <button type="submit" className={cn(buttonVariants(), "w-full py-6")}>
        SIGN IN
      </button>
    </form>
  );
};

export default CredentialsForm;
