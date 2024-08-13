import { useNavigation } from "@remix-run/react";
import { ReactNode, useState } from "react";

type Step = {
  id: number;
  title: string;
  content: ReactNode;
};

type StepperProps = {
  steps: Step[];
  formRef: React.RefObject<HTMLFormElement>;
};

const Stepper = ({ steps, formRef }: StepperProps) => {
  const [activeStep, setActiveStep] = useState(1);
  const isLastStep = activeStep === steps.length;

  const navigation = useNavigation();
  const isCreating = navigation.state === "submitting";

  const validateAndProceed = (action: () => void) => {
    if (formRef.current?.checkValidity()) {
      action();
    } else {
      formRef.current?.reportValidity();
    }
  };

  const handleClickStep = (stepId: number) => {
    validateAndProceed(() => setActiveStep(stepId));
  };

  const handleNextStep = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isLastStep) return;
    e.preventDefault();
    validateAndProceed(() => setActiveStep((prev) => prev + 1));
  };

  return (
    <>
      <ol className="flex w-full flex-col items-center gap-4 lg:flex-row lg:space-y-0">
        {steps.map((step) => (
          <li key={step.id} className="w-full">
            <button
              className={`flex w-full items-center rounded-lg px-4 py-3 font-medium duration-300 hover:bg-violet-50 ${activeStep >= step.id ? "bg-violet-50" : "bg-gray-50"}`}
              onClick={() => handleClickStep(step.id)}
              type="button"
            >
              <span
                className={`mr-3 flex h-8 w-8 items-center justify-center rounded-full border text-sm lg:h-10 lg:w-10 ${
                  activeStep >= step.id
                    ? "bg-violet-600 text-white"
                    : "border-violet-600 bg-violet-50 text-violet-600"
                }`}
              >
                {step.id}
              </span>
              <h4
                className={`text-base ${activeStep >= step.id ? "text-violet-600" : "text-gray-900"}`}
              >
                {step.title}
              </h4>
            </button>
          </li>
        ))}
      </ol>

      {steps.map((step) => (
        <div
          key={step.id}
          className={`my-8 ${activeStep !== step.id ? "hidden" : ""}`}
        >
          {step.content}
        </div>
      ))}

      <div className="flex justify-between">
        {activeStep > 1 ? (
          <button
            onClick={() => setActiveStep((prev) => Math.max(prev - 1, 1))}
            className="rounded-lg border px-6 py-2 font-semibold shadow-sm hover:bg-gray-50 focus:outline-none"
            type="button"
          >
            Back
          </button>
        ) : (
          <div />
        )}
        <button
          onClick={handleNextStep}
          className="rounded-lg bg-violet-600 px-6 py-2 font-semibold text-white disabled:pointer-events-none disabled:opacity-50"
          type={isLastStep ? "submit" : "button"}
          disabled={isCreating}
        >
          {isLastStep ? `${isCreating ? "Submitting..." : "Create"}` : "Next"}
        </button>
      </div>
    </>
  );
};

export default Stepper;
