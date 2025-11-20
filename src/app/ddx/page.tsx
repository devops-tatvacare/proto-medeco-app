"use client";

import { useState, useRef, useEffect } from 'react';
import { MobileFrame } from '@/components/MobileFrame';
import { DDxProvider, useDDx } from '@/context/DDxContext';
import { DDxHeader } from '@/components/ddx/DDxHeader';
import { WelcomeMessage } from '@/components/ddx/WelcomeMessage';
import { BotMessage } from '@/components/ddx/BotMessage';
import { UserConfirmation } from '@/components/ddx/UserConfirmation';
import { GenderSelector } from '@/components/ddx/GenderSelector';
import { AgePicker } from '@/components/ddx/AgePicker';
import { SymptomsInput } from '@/components/ddx/SymptomsInput';
import { ResultsMessage } from '@/components/ddx/ResultsMessage';
import { HistoryModal } from '@/components/ddx/HistoryModal';
import { PathwayIntro } from '@/components/ddx/PathwayIntro';
import { PathwayAssessment } from '@/components/ddx/PathwayAssessment';
import { PathwayRiskClassification } from '@/components/ddx/PathwayRiskClassification';
import { PathwayInterventions } from '@/components/ddx/PathwayInterventions';
import { PathwayMonitoring } from '@/components/ddx/PathwayMonitoring';
import { PathwayOutcomeReview } from '@/components/ddx/PathwayOutcomeReview';
import { ViewCarePathway } from '@/components/ddx/ViewCarePathway';

function DDxChatContent() {
  const {
    step,
    gender,
    age,
    symptoms,
    files,
    diagnoses,
    carePathway,
    setStep,
    setGender,
    setAge,
    setSymptoms,
    setFiles,
    generateDiagnoses,
    resetFromStep,
    resetToWelcome,
    toggleDiagnosisExpanded,
    startCarePathway,
    updateAssessment,
    setRiskLevel,
    updateIntervention,
    updateMonitoringTask,
    advancePathwayStage,
    goBackToPathwayStage
  } = useDDx();

  const [showHistory, setShowHistory] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when step changes or content updates
  useEffect(() => {
    if (scrollRef.current && step !== 'welcome') {
      setTimeout(() => {
        scrollRef.current?.scrollTo({
          top: scrollRef.current.scrollHeight,
          behavior: 'smooth'
        });
      }, 100);
    }
  }, [step, gender, age, symptoms, carePathway?.currentStage]);

  const handleGetStarted = () => {
    setStep('gender');
  };

  const handleGenderSelect = (selectedGender: 'Male' | 'Female' | null) => {
    if (selectedGender) {
      setGender(selectedGender);
    }
  };

  const handleAgeSelect = (selectedAge: number) => {
    setAge(selectedAge);
  };

  const handleSymptomsSubmit = (enteredSymptoms: string, uploadedFiles: File[]) => {
    setSymptoms(enteredSymptoms);
    setFiles(uploadedFiles);
    // Simulate API delay
    setTimeout(() => {
      generateDiagnoses();
    }, 500);
  };

  const handleEditGender = () => {
    resetFromStep('gender');
  };

  const handleEditAge = () => {
    resetFromStep('age');
  };

  const handleEditSymptoms = () => {
    resetFromStep('symptoms');
  };

  const handleViewCarePathway = (diagnosisId: string, diagnosisName: string, mode: 'view' | 'create') => {
    startCarePathway(diagnosisId, diagnosisName, mode);
  };

  const handleEditPathwayStage = (stage: 'assessment' | 'risk-classification' | 'interventions' | 'monitoring') => {
    if (carePathway) {
      setState(prev => ({
        ...prev,
        carePathway: prev.carePathway ? {
          ...prev.carePathway,
          mode: 'create',
          currentStage: stage
        } : null
      }));
    }
  };

  const handleLinkPatient = () => {
    alert('Link to Patient Record - This would open a patient selection/linking interface');
  };

  const getStageNumber = (stage: string): number => {
    const stages = ['assessment', 'risk-classification', 'interventions', 'monitoring', 'outcome-review'];
    return stages.indexOf(stage) + 1;
  };

  const getStageInfo = (stage: string) => {
    const stageMap: Record<string, { name: string; description: string; icon: React.ReactNode }> = {
      'assessment': {
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
        name: 'Risk Classification',
        description: "Select the patient's risk/severity level",
        icon: (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
          </svg>
        )
      },
      'interventions': {
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
      'outcome-review': {
        name: 'Doctor Notes & Link Patient',
        description: `Care pathway for ${carePathway?.diagnosisName || 'diagnosis'} is ready`,
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
    return stageMap[stage] || stageMap['assessment'];
  };

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      {/* Status Bar - Always shown */}
      <div className="sticky top-0 z-50 w-full bg-white shadow-[0px_2px_18px_0px_rgba(0,0,0,0.08)]">
        <div className="flex items-center justify-between px-6 py-3 h-[54px] bg-white">
          {/* Time */}
          <p className="font-poppins font-medium text-base text-black tracking-[0.1px]">
            9:41
          </p>

          {/* Status Icons */}
          <div className="flex items-center gap-1.5 text-black">
            {/* Signal strength */}
            <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
              <rect x="0" y="7" width="3" height="5" rx="1" fill="currentColor" />
              <rect x="4.5" y="5" width="3" height="7" rx="1" fill="currentColor" />
              <rect x="9" y="3" width="3" height="9" rx="1" fill="currentColor" />
              <rect x="13.5" y="0" width="3" height="12" rx="1" fill="currentColor" />
            </svg>
            {/* WiFi */}
            <svg width="15" height="11" viewBox="0 0 15 11" fill="none" className="ml-1">
              <path d="M0 3.5C2.5 1 5 0 7.5 0C10 0 12.5 1 15 3.5M3 6.5C4.5 5 6 4.5 7.5 4.5C9 4.5 10.5 5 12 6.5M6 9.5C6.5 9 7 8.5 7.5 8.5C8 8.5 8.5 9 9 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            {/* Battery */}
            <svg width="25" height="12" viewBox="0 0 25 12" fill="none" className="ml-1">
              <rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="currentColor" />
              <rect x="2" y="2" width="18" height="8" rx="1" fill="currentColor" />
              <rect x="23" y="4" width="2" height="4" rx="1" fill="currentColor" />
            </svg>
          </div>
        </div>
      </div>

      {/* Header - Only show if NOT on welcome step */}
      {step !== 'welcome' && (
        <DDxHeader
          onHistoryClick={() => setShowHistory(true)}
          onNewChatClick={resetToWelcome}
          onBack={() => window.history.back()}
        />
      )}

      {/* Chat Messages Area - WHITE BACKGROUND - Scrollable */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto bg-[#f5f5f7] relative">
        <div className={step === 'welcome' ? '' : step === 'symptoms' ? 'pb-[180px]' : 'pb-8'}>
          {/* Welcome Message - FULL SCREEN with purple gradient */}
          {step === 'welcome' && (
            <WelcomeMessage
              onGetStarted={handleGetStarted}
              onBack={() => window.history.back()}
            />
          )}

          {/* Gender Flow */}
          {(step !== 'welcome') && (
            <>
              <BotMessage
                message="Let's get started! To begin, please select the"
                description="Patient's Gender from the options below"
              />
              {step === 'gender' && (
                <GenderSelector onSelect={handleGenderSelect} selectedGender={gender} />
              )}
              {gender && (step === 'age' || step === 'symptoms' || step === 'results') && (
                <UserConfirmation
                  label="Patient's Gender"
                  value={gender}
                  onEdit={handleEditGender}
                />
              )}
            </>
          )}

          {/* Age Flow */}
          {(step === 'age' || step === 'symptoms' || step === 'results') && (
            <>
              <BotMessage message="Great! Please select the Patient's Age" />
              {step === 'age' && <AgePicker onSelect={handleAgeSelect} />}
              {age && (step === 'symptoms' || step === 'results') && (
                <UserConfirmation
                  label="Patient's Age"
                  value={`${age} years`}
                  onEdit={handleEditAge}
                />
              )}
            </>
          )}

          {/* Symptoms Flow - Bot Message Only */}
          {(step === 'symptoms' || step === 'results') && (
            <BotMessage
              message="Thank you! Now, please add the Symptoms"
              description="along with any relevant details like the patient's history, past data, or clinical findings for better accuracy."
            />
          )}

          {/* Results */}
          {step === 'results' && symptoms && (
            <ResultsMessage
              symptoms={symptoms}
              files={files}
              diagnoses={diagnoses}
              onToggleDiagnosis={toggleDiagnosisExpanded}
              onEditSymptoms={handleEditSymptoms}
              onViewCarePathway={handleViewCarePathway}
              showCarePathwayButtons={true}
            />
          )}

          {/* Care Pathway Flow */}
          {carePathway && carePathway.mode === 'view' && (
            <ViewCarePathway
              pathway={carePathway}
              onLinkToPatient={handleLinkPatient}
              onEdit={handleEditPathwayStage}
            />
          )}

          {carePathway && carePathway.mode === 'create' && (
            <PathwayIntro
              diagnosisName={carePathway.diagnosisName}
              currentStage={getStageNumber(carePathway.currentStage)}
              totalStages={5}
              stageName={getStageInfo(carePathway.currentStage).name}
              stageDescription={getStageInfo(carePathway.currentStage).description}
              stageIcon={getStageInfo(carePathway.currentStage).icon}
              onBack={carePathway.currentStage !== 'assessment' ? goBackToPathwayStage : undefined}
            >
              {carePathway.currentStage === 'assessment' && (
                <PathwayAssessment
                  assessments={carePathway.assessments}
                  onUpdateAssessment={updateAssessment}
                  onContinue={advancePathwayStage}
                />
              )}

              {carePathway.currentStage === 'risk-classification' && (
                <PathwayRiskClassification
                  riskLevel={carePathway.riskLevel}
                  onSelectRisk={setRiskLevel}
                  onContinue={advancePathwayStage}
                />
              )}

              {carePathway.currentStage === 'interventions' && (
                <PathwayInterventions
                  interventions={carePathway.interventions}
                  onUpdateIntervention={updateIntervention}
                  onContinue={advancePathwayStage}
                />
              )}

              {carePathway.currentStage === 'monitoring' && (
                <PathwayMonitoring
                  monitoringTasks={carePathway.monitoring}
                  onUpdateTask={updateMonitoringTask}
                  onContinue={advancePathwayStage}
                />
              )}

              {carePathway.currentStage === 'outcome-review' && (
                <PathwayOutcomeReview
                  diagnosisName={carePathway.diagnosisName}
                  onLinkPatient={handleLinkPatient}
                  onStartNewDDx={resetToWelcome}
                />
              )}
            </PathwayIntro>
          )}

        </div>
      </div>

      {/* Sticky Symptoms Input - Only on Symptoms Step */}
      {step === 'symptoms' && (
        <div className="absolute bottom-0 left-0 right-0 z-40">
          <SymptomsInput onSubmit={handleSymptomsSubmit} />
        </div>
      )}

      {/* History Modal */}
      <HistoryModal isOpen={showHistory} onClose={() => setShowHistory(false)} />
    </div>
  );
}

export default function DDxPage() {
  return (
    <DDxProvider>
      <MobileFrame>
        <DDxChatContent />
      </MobileFrame>
    </DDxProvider>
  );
}
