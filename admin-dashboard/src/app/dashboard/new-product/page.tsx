"use client";

import { Button } from "@/components/ui/button";
import ProductStepper from "./components/product-stepper";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import StepOneForm from "./components/step1";
import StepTwoForm from "./components/step2";
import StepThreeForm from "./components/step3"
import StepFourForm from "./components/step4"
import StepFourFIve from "./components/step5"


export default function NewProduct() {
  const [step, setStep] = useState(1);

  return (
    <div className="flex min-h-screen w-full flex-1 flex-col bg-[#F8FAFC]">
      {/* Responsive Work Area Container - Scaled down padding on mobile */}
      <div className="w-full flex-1 px-4 sm:px-6 md:px-8 py-5 md:py-6 space-y-5 md:space-y-6">
        {/* Page Title & Subtitle */}
        <div>
          <h1 className="text-lg md:text-xl font-bold tracking-tight text-slate-900">
            New Product
          </h1>
          <p className="mt-0.5 text-2xs md:text-xs text-slate-500">
            Add a new product to inventory
          </p>
        </div>

        {/* Full Width Stepper Card Container */}
        <div className="w-full rounded-xl border border-slate-100 bg-white shadow-sm overflow-hidden">
          <ProductStepper currentStep={step} />
        </div>

        {/* Responsive Grid - Drops to 1 column on mobile/tablet, returns to 2 columns on lg screens */}
        <div className="grid gap-5 md:gap-6 lg:grid-cols-[1fr_360px] items-start">
          {/* Main Context Form Step Window */}
          <div className="rounded-xl border border-slate-100 bg-white p-4 sm:p-6 shadow-sm min-h-[350px] md:min-h-[460px]">
            {step === 1 && (
              <StepOneForm onNext={() => setStep((s) => Math.min(5, s + 1))} />
            )}
            {step === 2 && (
              <StepTwoForm onNext={() => setStep((s) => Math.min(5, s + 1))} />
            )}
           
            {step === 3 && (
              <div className="text-xs font-semibold text-slate-500">
              <StepThreeForm onNext={() => setStep((s) => Math.min(5, s + 1))} />
              </div>
            )}
            {step === 4 && (
              <div className="text-xs font-semibold text-slate-500">
               <StepFourForm onNext={() => setStep((s) => Math.min(5, s + 1))} />
              </div>
            )}
            {step === 5 && (
              <div className="text-xs font-semibold text-slate-500">
               <StepFourFIve  onNext={() => setStep((s) => Math.min(5, s + 1))} />
              </div>
            )}
          </div>

          {/* Persistent Side Advisory Panel */}
          <div className="rounded-xl border border-slate-100 bg-white p-4 sm:p-6 shadow-sm min-h-[350px] md:min-h-[460px]">
            <h3 className="text-sm font-semibold text-slate-900">
              Product Tips
            </h3>
          </div>
        </div>
      </div>

      {/* Floating Action Sticky Basebar - Mobile optimized spacing */}
      <div className="sticky bottom-0 z-40 w-full border-t border-slate-100 bg-white shadow-md">
        <div className="flex w-full items-center justify-between px-4 sm:px-6 md:px-8 py-3">
          {/* Escape Action */}
          <Button
            variant="outline"
            className="h-9 rounded-md border-blue-200 px-4 text-xs font-medium text-blue-600 hover:bg-blue-50/50"
          >
            Cancel
          </Button>

          {/* Stepper Control Stack */}
          <div className="flex gap-2 sm:gap-3">
            {step > 1 && (
              <Button
                variant="outline"
                onClick={() => setStep((s) => Math.max(1, s - 1))}
                className="h-9 rounded-md border-slate-200 px-4 text-xs font-medium text-slate-600 bg-white hover:bg-slate-50"
              >
                Previous
              </Button>
            )}

            {/* <Button
              onClick={() => setStep((s) => Math.min(5, s + 1))}
              className="rounded-md bg-blue-600 px-4 sm:px-5 text-xs font-medium text-white hover:bg-blue-700 shadow-sm flex items-center gap-1.5"
            >
              {step === 5 ? "Confirm & Save" : "Next"}
              {step < 5 && <ChevronRight className="h-3.5 w-3.5" />}
            </Button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
