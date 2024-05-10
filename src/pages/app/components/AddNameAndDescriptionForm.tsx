import { TextInput } from '@/components/form/TextInput';
import clsx from 'clsx';
import AddEventsForm from './AddEventsForm';

const AddNameAndDescriptionForm = (): JSX.Element => {
    return (
        <form className={clsx('flex flex-col gap-2 self-center justify-center items-center w-full h-full')}>
            <div className={clsx('flex flex-col w-3/5  text-center')}>
                {"Let\'s get a name for the itinerary and add a description"}
                <TextInput errorMessage="" topLeftLabel="Name:" placeholder="Monday Murder Mystery, Dave\'s Birthday, etc." />
                <TextInput errorMessage="" topLeftLabel="Description:" placeholder="Let\'s all gather and play a murder mystery game for Dave's birthday!" />
            </div>
        </form>
    )
}

export default AddNameAndDescriptionForm;