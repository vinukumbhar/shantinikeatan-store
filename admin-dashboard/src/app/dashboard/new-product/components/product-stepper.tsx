"use client";

import { cn } from "@/lib/utils";

const steps = [
  { id: 1, title: "Basic Information", description: "Product details" },
  { id: 2, title: "Variants", description: "Add variants (if any)" },
  { id: 3, title: "Barcode ", description: " Barcode & SKU" },
  { id: 4, title: "Images", description: "Upload product images" },
  { id: 5, title: "Review", description: "Confirm and save" },
];

interface ProductStepperProps {
  currentStep: number;
}

export default function ProductStepper({ currentStep }: ProductStepperProps) {
  return (
    <div className="relative w-full rounded-xl border bg-background px-4 sm:px-6 md:px-8 pb-4 md:pb-0 pt-6">
      {/* Horizontal Steps Container */}
      <div className="flex w-full items-start justify-between">
        {steps.map((step, index) => {
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id;

          return (
            <div
              key={step.id}
              className="relative flex flex-1 flex-col items-center"
            >
              {/* Connector Line between circles */}
              {index !== steps.length - 1 && (
                <div className="absolute left-[50%] top-3.5 sm:top-4 h-[1px] w-full bg-slate-200">
                  <div
                    className={cn(
                      "h-full bg-blue-600 transition-all duration-300",
                      isCompleted ? "w-full" : "w-0"
                    )}
                  />
                </div>
              )}

              {/* Step Indicator Circle */}
              <div
                className={cn(
                  "relative z-10 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full border text-[11px] sm:text-xs font-medium transition-all duration-300",
                  isActive && "border-blue-600 bg-blue-600 text-white font-semibold shadow-sm",
                  isCompleted && "border-blue-600 bg-blue-600 text-white",
                  !isActive && !isCompleted && "border-slate-300 bg-white text-slate-600"
                )}
              >
                {step.id}
              </div>

              {/* Desktop Step Text Labels (Hidden on mobile viewports) */}
              <div className="mt-4 flex flex-col items-center text-center hidden md:flex">
                <h4
                  className={cn(
                    "text-xs font-bold tracking-tight transition-colors duration-300",
                    isActive || isCompleted ? "text-slate-900" : "text-slate-400"
                  )}
                >
                  {step.title}
                </h4>
                <p className="mt-1 text-[11px] text-slate-500 whitespace-nowrap lg:block hidden">
                  {step.description}
                </p>
                <p className="mt-1 text-[11px] text-slate-500 whitespace-nowrap lg:hidden block">
                  {step.title}
                </p>
              </div>

              {/* Mobile Active Step Text Fallback Container */}
              <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[160px] text-center mt-1 block md:hidden pointer-events-none">
                {isActive && (
                  <div className="animate-in fade-in slide-in-from-top-1 duration-200">
                    <h4 className="text-[11px] font-bold text-slate-900 leading-tight">
                      {step.title}
                    </h4>
                    <p className="text-[10px] text-slate-500 leading-tight mt-0.5">
                      {step.description}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Tab Bottom Highlight Indicator Line */}
      <div className="relative mt-14 md:mt-6 h-[3px] w-full bg-transparent transition-all">
        <div
          className="absolute bottom-0 h-full bg-blue-600 transition-all duration-300 ease-in-out"
          style={{
            width: `${100 / steps.length}%`,
            left: `${((currentStep - 1) * 100) / steps.length}%`,
          }}
        />
      </div>
    </div>
  );
}
