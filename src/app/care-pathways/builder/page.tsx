"use client";

import { useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MobileFrame } from '@/components/MobileFrame';
import { PathwayBuilderProvider, usePathwayBuilder } from '@/context/PathwayBuilderContext';
import { PathwayWelcome } from '@/components/care-pathways/PathwayWelcome';
import { PathwayBasicInfo } from '@/components/care-pathways/PathwayBasicInfo';
import { PathwayBuilderStage } from '@/components/care-pathways/PathwayBuilderStage';
import { PathwayBuilderAssessment } from '@/components/care-pathways/PathwayBuilderAssessment';
import { PathwayBuilderRiskClassification } from '@/components/care-pathways/PathwayBuilderRiskClassification';
import { PathwayBuilderInterventions } from '@/components/care-pathways/PathwayBuilderInterventions';
import { PathwayBuilderMonitoring } from '@/components/care-pathways/PathwayBuilderMonitoring';
import { PathwayBuilderReview } from '@/components/care-pathways/PathwayBuilderReview';

function PathwayBuilderContent() {
  const router = useRouter();
  const { step, resetToWelcome } = usePathwayBuilder();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current && step !== 'welcome') {
      setTimeout(() => {
        scrollRef.current?.scrollTo({
          top: scrollRef.current.scrollHeight,
          behavior: 'smooth'
        });
      }, 100);
    }
  }, [step]);

  const handleBack = () => {
    if (step === 'welcome') {
      router.back();
    } else {
      resetToWelcome();
    }
  };

  const getStageInfo = (currentStep: typeof step) => {
    const stageMap = {
      'assessment': {
        number: 1,
        total: 5,
        name: 'Assessment',
        description: 'Select recommended assessments to assign to the patient',
        icon: (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" x2="8" y1="13" y2="13"/>
            <line x1="16" x2="8" y1="17" y2="17"/>
            <polyline points="10 9 9 9 8 9"/>
          </svg>
        )
      },
      'risk-classification': {
        number: 2,
        total: 5,
        name: 'Risk Classification',
        description: "Define the patient's risk/severity levels",
        icon: (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
          </svg>
        )
      },
      'interventions': {
        number: 3,
        total: 5,
        name: 'Interventions',
        description: 'Select recommended interventions for the treatment plan',
        icon: (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 11H3v10h6V11Z"/>
            <path d="M15 7H9v14h6V7Z"/>
            <path d="M21 3h-6v18h6V3Z"/>
          </svg>
        )
      },
      'monitoring': {
        number: 4,
        total: 5,
        name: 'Monitoring & Follow-up',
        description: 'Set up monitoring schedule and follow-up timeline',
        icon: (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
        )
      },
      'review': {
        number: 5,
        total: 5,
        name: 'Review & Save',
        description: 'Review your care pathway and save',
        icon: (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" x2="8" y1="13" y2="13"/>
            <line x1="16" x2="8" y1="17" y2="17"/>
          </svg>
        )
      }
    };

    return stageMap[currentStep as keyof typeof stageMap] || stageMap['assessment'];
  };

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      {/* Status Bar */}
      <div className="sticky top-0 z-50 w-full bg-white shadow-[0px_2px_18px_0px_rgba(0,0,0,0.08)]">
        <div className="flex items-center justify-between px-6 py-3 h-[54px] bg-white">
          <p className="font-poppins font-medium text-base text-black tracking-[0.1px]">9:41</p>
          <div className="flex items-center gap-1.5 text-black">
            <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
              <rect x="0" y="7" width="3" height="5" rx="1" fill="currentColor" />
              <rect x="4.5" y="5" width="3" height="7" rx="1" fill="currentColor" />
              <rect x="9" y="3" width="3" height="9" rx="1" fill="currentColor" />
              <rect x="13.5" y="0" width="3" height="12" rx="1" fill="currentColor" />
            </svg>
            <svg width="15" height="11" viewBox="0 0 15 11" fill="none" className="ml-1">
              <path d="M0 3.5C2.5 1 5 0 7.5 0C10 0 12.5 1 15 3.5M3 6.5C4.5 5 6 4.5 7.5 4.5C9 4.5 10.5 5 12 6.5M6 9.5C6.5 9 7 8.5 7.5 8.5C8 8.5 8.5 9 9 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <svg width="25" height="12" viewBox="0 0 25 12" fill="none" className="ml-1">
              <rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="currentColor" />
              <rect x="2" y="2" width="18" height="8" rx="1" fill="currentColor" />
              <rect x="23" y="4" width="2" height="4" rx="1" fill="currentColor" />
            </svg>
          </div>
        </div>
      </div>

      {/* Header - Only show if NOT on welcome step */}
      {step !== 'welcome' && step !== 'basic-info' && (
        <div className="flex-shrink-0 w-full bg-white border-b border-gray-100">
          <div className="flex items-center justify-between px-6 py-3 h-[54px]">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-[#4b4ad5] font-medium text-sm hover:opacity-80 transition-opacity"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              New Pathway
            </button>
            <button
              onClick={resetToWelcome}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="1 4 1 10 7 10"/>
                <polyline points="23 20 23 14 17 14"/>
                <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/>
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Content Area - Scrollable */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto bg-[#f5f5f7]">
        <div className={step === 'welcome' ? '' : 'pb-8'}>
          {step === 'welcome' && (
            <PathwayWelcome onGetStarted={() => {}} onBack={handleBack} />
          )}

          {step === 'basic-info' && <PathwayBasicInfo />}

          {(step === 'assessment' || step === 'risk-classification' || step === 'interventions' || step === 'monitoring' || step === 'review') && (
            <PathwayBuilderStage
              stageName={getStageInfo(step).name}
              stageDescription={getStageInfo(step).description}
              stageIcon={getStageInfo(step).icon}
              currentStage={getStageInfo(step).number}
              totalStages={getStageInfo(step).total}
            >
              {step === 'assessment' && <PathwayBuilderAssessment />}
              {step === 'risk-classification' && <PathwayBuilderRiskClassification />}
              {step === 'interventions' && <PathwayBuilderInterventions />}
              {step === 'monitoring' && <PathwayBuilderMonitoring />}
              {step === 'review' && <PathwayBuilderReview />}
            </PathwayBuilderStage>
          )}
        </div>
      </div>
    </div>
  );
}

export default function PathwayBuilderPage() {
  return (
    <PathwayBuilderProvider>
      <MobileFrame>
        <PathwayBuilderContent />
      </MobileFrame>
    </PathwayBuilderProvider>
  );
}
