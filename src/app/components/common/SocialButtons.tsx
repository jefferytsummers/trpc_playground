import clsx from "clsx";

import SheetsLogo from "../../../../public/Google_Sheets_logo.svg";
import FormsLogo from "../../../../public/Google_Forms_logo.svg";
import DocsLogo from "../../../../public/Google_Docs_logo.svg";

type PlatformIcons =
  | "Facebook"
  | "YouTube"
  | "Google"
  | "Twitter"
  | "GoogleDocs"
  | "GoogleSheets"
  | "GoogleForms";

const GoogleDocsIcon = (): JSX.Element => (
  <button className={clsx("btn border-none bg-inherit")}>
    <DocsLogo />
  </button>
);

const GoogleSheetsIcon = (): JSX.Element => (
  <button className={clsx("btn border-none bg-inherit")}>
    <SheetsLogo />
  </button>
);

const GoogleFormsIcon = (): JSX.Element => (
  <button className={clsx("btn border-none bg-inherit")}>
    <FormsLogo />
  </button>
);

const SvgSpan = ({
  children,
  fillHex,
}: {
  fillHex: string;
  children: JSX.Element;
}): JSX.Element => (
  <span className={clsx(`[&>svg]:h-16 [&>svg]:w-16 [&>svg]:fill-${fillHex}`)}>
    {children}
  </span>
);

const GoogleIcon = (): JSX.Element => (
  <button type="button" className={clsx("btn border-none bg-inherit hover:bg-inherit")}>
    <SvgSpan fillHex="[#ea4335]">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
        <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
      </svg>
    </SvgSpan>
  </button>
);

const FacebookIcon = (): JSX.Element => (
  <button type="button" className={clsx("btn border-none bg-inherit hover:bg-inherit")}>
    <SvgSpan fillHex="[#1877F2]">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
        <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
      </svg>
    </SvgSpan>
  </button>
);

const TwitterIcon = (): JSX.Element => (
  <button type="button" className={clsx("btn border-none bg-inherit hover:bg-inherit")}>
    <SvgSpan fillHex="black">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 512 512"
      >
        <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
      </svg>
    </SvgSpan>
  </button>
);

const YouTubeIcon = (): JSX.Element => (
  <button type="button" className={clsx("btn border-none bg-inherit hover:bg-inherit")}>
    <SvgSpan fillHex="[#ff0000]">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
        <path d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z" />
      </svg>
    </SvgSpan>
  </button>
);

export const PlatformIcon = ({
  icon,
}: {
  icon: PlatformIcons;
}): JSX.Element => {
  switch (icon) {
    case "Facebook": {
      return <FacebookIcon />;
    }
    case "YouTube": {
      return <YouTubeIcon />;
    }
    case "Google": {
      return <GoogleIcon />;
    }
    case "GoogleDocs": {
      return <GoogleDocsIcon />;
    }
    case "GoogleSheets": {
      return <GoogleSheetsIcon />;
    }
    case "GoogleForms": {
      return <GoogleFormsIcon />;
    }
    case "Twitter": {
      return <TwitterIcon />;
    }
    default:
      return <FacebookIcon />;
  }
};

export const SocialButtons = ({
  include = ["YouTube", "Google", "Twitter"],
  readonly = false,
}: {
  include: PlatformIcons[];
  readonly?: boolean;
}): JSX.Element => {
  return (
    <div className={clsx("h-full flex justify-center items-center gap-2")}>
      {include.map((icon) => (
        <div
          key={icon}
          className={clsx(
            "justify-center items-center h-24 flex rounded-lg w-16 flex",
            {
              "hover:ring hover:ring-primary": !readonly,
              "hover:cursor-default": readonly,
            },
          )}
        >
          <PlatformIcon icon={icon} />
        </div>
      ))}
    </div>
  );
};
