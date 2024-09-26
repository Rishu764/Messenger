"use client";

import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

type Varient = "Login" | "Register";
const AuthForm = () => {
  const [varient, setVarient] = useState<Varient>("Login");
  const [loading, setLoading] = useState(false);

  const toogleVarient = useCallback(() => {
    setVarient((currentVarient) =>
      currentVarient === "Login" ? "Register" : "Login"
    );
  }, [varient]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setLoading(true);
    if (varient === "Register") {
      axios.post('/api/register', data)
      .catch(()=>toast.error("Something went wrong"))
      .finally(()=>setLoading(false));
    }
    if (varient === "Login") {
      signIn('credentials', {
        ...data,
        redirect:false,
      }).then((callback)=>{
        if(callback?.error){
          toast.error('Invalid credentials');
        }
        if(callback?.ok && !callback?.error){
          toast.success('Logged in!');
        }
      }).finally(()=>setLoading(false));
    }
  };
  const socialAction = (action: string) => {
    setLoading(true);
    signIn(action, {
      redirect:false,
    }).then((callback)=>{
      if(callback?.error){
        toast.error('Invalid credentials');
      }
      if(callback?.ok && !callback?.error){
        toast.success('Logged in!');
      }
    }).finally(()=>setLoading(false));

    
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {varient === "Register" && (
            <Input label="Name" register={register} id="name" errors={errors} />
          )}
          <Input
            label="Email Address"
            register={register}
            type="email"
            id="email"
            errors={errors}
          />
          <Input
            label="Password"
            register={register}
            type="password"
            id="password"
            errors={errors}
          />
          <div>
            <Button disabled={loading} fullWidth type="submit">
              {varient === "Login" ? "Sign In" : "Register"}
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>
          
          <div className="mt-6 flex gap-2">
             <AuthSocialButton icon={BsGithub} onClick={() => socialAction("github")} />
             <AuthSocialButton icon={BsGoogle} onClick={() => socialAction("google")} />
          </div>
        </div>

        <div
        className="
          flex
          gap-2
          justify-center
          text-sm
          mt-6
          px-2
          text-gray-500"
        >
          <div>
            {varient === "Login" ? "New to Messenger?" : "Already have an account?"}
          </div>
          <div onClick={toogleVarient} className="underline cursor-pointer">{varient === "Login" ? "Create an account" : "Login"}</div>

          
        </div>

      </div>
    </div>
  );
};
export default AuthForm;
