import {
  useRef,
  useState,
  type ChangeEvent,
  type ClipboardEvent,
  type FC,
  type KeyboardEvent,
} from "react";

interface OtpInput {
  maxInputs: number;
  onChange?: (otp: string) => void;
}

const isNumber = (value: string) => /^[0-9]/.test(value);

const OtpInput: FC<OtpInput> = ({ maxInputs }) => {
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showClearPassword, setShowClearPassword] = useState(false);

  const onHandleInputChange = (otp: string) => {
    setShowClearPassword(otp.length > 0);

    // handle onChange from props.
  };

  const onChange = (event: ChangeEvent<HTMLDivElement>) => {
    const targetEl = event.target as HTMLInputElement;
    const { value, nextElementSibling } = targetEl;

    // Disallow typing anything other than number
    if (!isNumber(value)) {
      targetEl.value = "";

      return;
    }

    // Focus next sibling element to continue typing
    if (nextElementSibling && value.length > 0) {
      (nextElementSibling as HTMLInputElement).focus();
    }

    const inputRefs = refs.current as HTMLInputElement[];

    const otp = inputRefs.reduce(
      (otp, input) => (!input.value ? otp : `${otp}${input.value}`),
      "",
    );

    onHandleInputChange(otp);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const key = event.key;

    switch (key) {
      case "Backspace": {
        const inputEl = event.target as HTMLInputElement;
        const { previousElementSibling } = inputEl;

        inputEl.value = "";

        const siblingEl = previousElementSibling as HTMLInputElement | null;

        if (siblingEl) {
          siblingEl.focus();
          event.preventDefault();
        }

        break;
      }
    }
  };

  const onPaste = (event: ClipboardEvent<HTMLDivElement>) => {
    if (!containerRef.current) {
      return;
    }

    const pasteString = event.clipboardData.getData("text");

    if (!isNumber(pasteString)) {
      event.preventDefault();
      return;
    }

    const inputRefs = refs.current as HTMLInputElement[];
    const activeInputEl = inputRefs.find((el) => el === document.activeElement);
    const startIdx = activeInputEl
      ? Array.from(inputRefs).indexOf(activeInputEl)
      : 0;
    const otpPasteString = pasteString.slice(0, maxInputs);

    otpPasteString.split("").forEach((otp, index) => {
      const inputEl = inputRefs[startIdx + index];

      if (inputEl) {
        inputEl.value = otp;
        inputEl.focus();
      }
    });
  };

  const onClearInput = () => {
    const inputRefs = refs.current as HTMLInputElement[];

    inputRefs.forEach((inputEl) => {
      inputEl.value = "";
    });

    setShowClearPassword(false);
    inputRefs[0].focus();
  };

  return (
    <div>
      <div
        className="otp-input-wrapper"
        onChange={onChange}
        onKeyDown={onKeyDown}
        onPaste={onPaste}
        ref={containerRef}
      >
        {Array.from({ length: maxInputs }).map((_, index) => {
          const id = `otp-input-${index}`;

          return (
            <input
              className="otp-input"
              id={id}
              maxLength={1}
              name={id}
              ref={(ref) => {
                refs.current[index] = ref;
              }}
              type="text"
            />
          );
        })}
      </div>

      {showClearPassword ? (
        <button className="clear-password-btn" onClick={onClearInput}>
          clear
        </button>
      ) : null}
    </div>
  );
};

export default function OtpInputApp() {
  return (
    <main>
      <OtpInput maxInputs={6} />
    </main>
  );
}
