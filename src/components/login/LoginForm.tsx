import clsx from 'clsx';
import { useZodForm } from "@/utils/forms";
import { z } from "zod";
import { TextInput } from "../form/TextInput";
import { PasswordInput } from "../form/PasswordInput";
import { getAuth, signInWithPopup } from 'firebase/auth';
import { facebookProvider, googleProvider, twitterProvider } from '@/firebase';
import { PlatformIcon } from '../common/SocialButtons';
import { useRouter } from 'next/navigation';

const loginSchema = z.object({
    username: z.string(),
    password: z.string(),
});

type LoginSchema = z.infer<typeof loginSchema>;
const initialLoginValues = {
    username: "",
    password: "",
};

export const LoginForm = (): JSX.Element => {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useZodForm({
        schema: loginSchema,
        defaultValues: initialLoginValues,
    });
    const router = useRouter();
    return (
        <form
            className={clsx('rounded-lg max-w-sm sm:max-w-lg w-full flex flex-col gap-4 bg-base-100 text-base-content mx-6 my-4 justify-center items-center p-4 drop-shadow-lg')}
            onSubmit={handleSubmit((data) => {
                console.log(data);
                // Verify user and redirect to app
                router.push('app');
            })}
        >
            <TextInput
                errorMessage={errors.username?.message}
                inputProps={register("username", { required: true })}
                topLeftLabel="Username:"
            />
            <PasswordInput
                errorMessage={errors.password?.message}
                inputProps={register("password", { required: true })}
                topLeftLabel="Password:"
            />
            <button className={clsx('btn btn-primary')}>Login</button>
            <div className={clsx("text-lg")}>or register with</div>
            <div
                className={clsx(
                    "flex justify-center items-center rounded-lg h-full w-full flex pb-2 h-full",
                )}
            >
                <div className={"rounded-lg hover:ring hover:ring-primary pt-2"} onClick={async () => {
                    const auth = getAuth();
                    const { user } = await signInWithPopup(auth, googleProvider);
                    console.log({ user })
                    // Generate itinerary and navigate to home page
                    router.push('app');
                }}>
                    <PlatformIcon icon={"Google"} />
                </div>
                <div className={"rounded-lg hover:ring hover:ring-primary pt-2"} onClick={async () => {
                    const auth = getAuth();
                    const { user } = await signInWithPopup(auth, facebookProvider);
                    console.log({ user })
                    // Generate itinerary and navigate to home page
                    router.push('app');
                }}>
                    <PlatformIcon icon={"Facebook"} />
                </div>
                <div className={"rounded-lg hover:ring hover:ring-primary pt-2"} onClick={async () => {
                    const auth = getAuth();
                    const { user } = await signInWithPopup(auth, twitterProvider);
                    console.log({ user })
                    // Generate itinerary and navigate to home page
                    router.push('app');
                }}>
                    <PlatformIcon icon={"Twitter"} />
                </div>
            </div>
        </form>
    );
};
