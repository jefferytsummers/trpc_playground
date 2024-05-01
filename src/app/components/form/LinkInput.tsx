export const LinkInput = ({
    bottomLeftLabel = undefined,
    bottomRightLabel = undefined,
    topLeftLabel = undefined,
    topRightLabel = undefined,
    placeholder = undefined,
    inputProps = {},
}: { 
    bottomLeftLabel?: string | undefined,
    bottomRightLabel?: string | undefined,
    topLeftLabel?: string | undefined,
    topRightLabel?: string | undefined,
    placeholder?: string | undefined,
    inputProps?: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
}): JSX.Element => {
    return (
        <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text">{topLeftLabel}</span>
                <span className="label-text-alt">{topRightLabel}</span>
            </div>
            <input type="text" placeholder={placeholder} className="input input-bordered w-full max-w-xs" {...inputProps} />
            <div className="label">
                <span className="label-text-alt">{bottomLeftLabel}</span>
                <span className="label-text-alt">{bottomRightLabel}</span>
            </div>
        </label>
    )
}