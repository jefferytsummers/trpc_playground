export const TimeInput = ({
  bottomRightLabel = undefined,
  topLeftLabel = undefined,
  topRightLabel = undefined,
  inputProps = {},
  errorMessage,
}: {
  bottomRightLabel?: string | undefined;
  topLeftLabel?: string | undefined;
  topRightLabel?: string | undefined;
  placeholder?: string | undefined;
  inputProps?: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
  errorMessage: string | undefined;
}): JSX.Element => {
  return (
    <label className="form-control w-26 max-w-xs">
      <div className="label">
        <span className="label-text">{topLeftLabel}</span>
        <span className="label-text-alt">{topRightLabel}</span>
      </div>
      <input
        type="time"
        className="input input-bordered w-full max-w-xs"
        {...inputProps}
      />
      <div className="label">
        <span className="label-text-alt text-secondary h-4">{errorMessage ? `* ${errorMessage}` : ' '}</span>
        <span className="label-text-alt">{bottomRightLabel}</span>
      </div>
    </label>
  );
};
