import clsx from "clsx";
import { z } from "zod";
import { useZodForm } from "@/utils/forms";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  auth,
  facebookProvider,
  googleProvider,
  twitterProvider,
} from "../../firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/navigation";
import { PlatformIcon } from "@/components/common/SocialButtons";
import { PasswordInput } from "@/components/form/PasswordInput";
import { TextInput } from "@/components/form/TextInput";

const registrationFormSchema = z
  .object({
    username: z
      .string()
      .refine((value) => value !== "", "Please enter a username"),
    password: z
      .string()
      .refine((value) => value !== "", "Please enter a password"),
    confirmPassword: z
      .string()
      .refine((value) => value !== "", "Please confirm password"),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match.",
        path: ["confirmPassword"],
      });
    }
  });

type Registration = z.infer<typeof registrationFormSchema>;
const initialRegistration: Registration = {
  username: "",
  password: "",
  confirmPassword: "",
};

export const RegistrationForm = (): JSX.Element => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useZodForm({
    schema: registrationFormSchema,
    defaultValues: { username: "", password: "", confirmPassword: "" },
  });

  const router = useRouter();

  return (
    <div
      className={clsx(
        "max-w-xs sm:max-w-sm bg-base-100 rounded-lg drop-shadow-lg p-4",
      )}
    >
      <form
        onSubmit={handleSubmit(async ({ username, password }) => {
          try {
            const { user } = await createUserWithEmailAndPassword(
              auth,
              username,
              password,
            );
            console.log(user);
            // Generate itinerary and navigate to home page
            router.push("registered");
          } catch (error) {}
        })}
      >
        <div className={clsx("flex flex-col max-w-sm mx-auto")}>
          <TextInput
            errorMessage={errors.username?.message}
            topLeftLabel="Username:"
            placeholder="Email address or phone number"
            inputProps={register("username", { required: true })}
          />
          <PasswordInput
            errorMessage={errors.password?.message}
            topLeftLabel="Password:"
            placeholder="*******"
            inputProps={register("password", { required: true })}
          />
          <PasswordInput
            errorMessage={errors.confirmPassword?.message}
            topLeftLabel="Confirm Password:"
            placeholder="*******"
            inputProps={register("confirmPassword", { required: true })}
          />
        </div>
        <div
          className={clsx(
            "flex flex-col gap-4 mx-16 justify-center items-center",
          )}
        >
          <button type="submit" className={clsx("btn btn-primary ")}>
            Register and view!
          </button>
          <div className={clsx("text-lg")}>or register with</div>
          <div
            className={clsx("flex justify-center items-center rounded-lg pb-2")}
          >
            <div
              className={"rounded-lg hover:ring hover:ring-primary pt-2"}
              onClick={async () => {
                const auth = getAuth();
                const { user } = await signInWithPopup(auth, googleProvider);
                console.log({ user });
                // Generate itinerary and navigate to home page
                router.push("app");
              }}
            >
              <PlatformIcon icon={"Google"} />
            </div>
            <div
              className={"rounded-lg hover:ring hover:ring-primary pt-2"}
              onClick={async () => {
                const auth = getAuth();
                const { user } = await signInWithPopup(auth, facebookProvider);
                console.log({ user });
                // Generate itinerary and navigate to home page
                router.push("app");
              }}
            >
              <PlatformIcon icon={"Facebook"} />
            </div>
            <div
              className={"rounded-lg hover:ring hover:ring-primary pt-2"}
              onClick={async () => {
                const auth = getAuth();
                const { user } = await signInWithPopup(auth, twitterProvider);
                console.log({ user });
                // Generate itinerary and navigate to home page
                router.push("app");
              }}
            >
              <PlatformIcon icon={"Twitter"} />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
