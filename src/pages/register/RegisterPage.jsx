import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import MainLayout from "../../components/MainLayout";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const submitHandler = (data) => {
    console.log(data);
  };

  const password = watch("password");

  return (
    <MainLayout>
      <section className="container mx-auto px-5 py-10">
        <div className="w-full max-w-sm mx-auto">
          <h1 className="font-roboto text-2xl font-bold text-center text-dark-hard mb-8">
            Inscription
          </h1>
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="flex flex-col mb-6 w-full">
              <label
                htmlFor="name"
                className="text-[#5a7184] font-semibold block"
              >
                Pseudonyme
              </label>
              <input
                type="text"
                id="name"
                {...register("name", {
                  minLength: {
                    value: 1,
                    message:
                      "La taille du pseudonyme doit être au minimum d'un caractère",
                  },
                  required: {
                    value: true,
                    message: "Le pseudonyme est requis",
                  },
                })}
                placeholder="Entrez votre pseudodyme"
                className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none bg-transparent border ${
                  errors.name ? "border-red-500" : "border-[#c3cad9]"
                }`}
              />
              {errors.name?.message && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name?.message}
                </p>
              )}
            </div>
            <div className="flex flex-col mb-6 w-full">
              <label
                htmlFor="email"
                className="text-[#5a7184] font-semibold block"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email", {
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Veuillez entrer une adresse email valide",
                  },
                  required: {
                    value: true,
                    message: "L'email est requis",
                  },
                })}
                placeholder="Entrez votre email"
                className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none bg-transparent border ${
                  errors.email ? "border-red-500" : "border-[#c3cad9]"
                }`}
              />
              {errors.email?.message && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email?.message}
                </p>
              )}
            </div>
            <div className="flex flex-col mb-6 w-full">
              <label
                htmlFor="password"
                className="text-[#5a7184] font-semibold block"
              >
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Le mot de passe est requis",
                  },
                  minLength: {
                    value: 6,
                    message: "Le mot de passe doit faire au moins 6 caractères",
                  },
                })}
                placeholder="Entrez votre mot de passe"
                className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none bg-transparent border ${
                  errors.password ? "border-red-500" : "border-[#c3cad9]"
                }`}
              />
              {errors.password?.message && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password?.message}
                </p>
              )}
            </div>
            <div className="flex flex-col mb-6 w-full">
              <label
                htmlFor="confirmPassword"
                className="text-[#5a7184] font-semibold block"
              >
                Confirmez le mot de passe
              </label>
              <input
                type="password"
                id="confirmPassword"
                {...register("confirmPassword", {
                  required: {
                    value: true,
                    message: "La confirmation du mot de passe est requise",
                  },
                  validate: (value) => {
                    if (value !== password) {
                      return "Les mots de passe ne correspondent pas";
                    }
                  },
                })}
                placeholder="Confirmez votre mot de passe"
                className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none bg-transparent border ${
                  errors.confirmPassword ? "border-red-500" : "border-[#c3cad9]"
                }`}
              />
              {errors.confirmPassword?.message && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword?.message}
                </p>
              )}
            </div>
            <Link
              to="/mot-de-passe-oublie"
              className="font-semibold text-sm text-primary"
            >
              Mot de passe oublié?
            </Link>
            <button
              type="submit"
              disabled={!isValid}
              className="bg-primary text-white font-bold text-lg py-4 px-8 w-full rounded-lg my-6 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              Inscription
            </button>
            <p className="text-sm font-semibold text-[#5a7184]">
              Vous avez déjà un compte?{" "}
              <Link to="/connexion" className="text-primary">
                Connectez le maintenant
              </Link>
            </p>
          </form>
        </div>
      </section>
    </MainLayout>
  );
};

export default RegisterPage;
