export const TextInput = ({
    bottomRightLabel = undefined,
    topLeftLabel = undefined,
    topRightLabel = undefined,
    placeholder = undefined,
    inputProps = {},
    errorMessage,
}: { 
    bottomRightLabel?: string | undefined,
    topLeftLabel?: string | undefined,
    topRightLabel?: string | undefined,
    placeholder?: string | undefined,
    inputProps?: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    errorMessage: string | undefined,
}): JSX.Element => {
    return (
        <label className="form-control w-full max-w-sm">
            <div className="label">
                <span className="label-text">{topLeftLabel}</span>
                <span className="label-text-alt">{topRightLabel}</span>
            </div>
            <input type="text" placeholder={placeholder} className="input input-bordered w-full max-w-xs" {...inputProps} />
            <div className="label">
                {errorMessage && (<span className="label-text-alt text-secondary">{errorMessage}</span>)}
                <span className="label-text-alt">{bottomRightLabel}</span>
            </div>
        </label>
    )
}
