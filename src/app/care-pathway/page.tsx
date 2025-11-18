"use client";

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { MobileFrame } from '@/components/MobileFrame';
import { CarePathwayProvider, useCarePathway } from '@/context/CarePathwayContext';
import { PathwayStepper } from '@/components/care-pathway/PathwayStepper';
import { AssessmentStage } from '@/components/care-pathway/AssessmentStage';
import { RiskClassificationStage } from '@/components/care-pathway/RiskClassificationStage';
import { InterventionsStage } from '@/components/care-pathway/InterventionsStage';
import { MonitoringStage } from '@/components/care-pathway/MonitoringStage';
import { OutcomeReviewStage } from '@/components/care-pathway/OutcomeReviewStage';

function CarePathwayContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    currentStage,
    pathway,
    setCurrentStage,
    initializePathway,
    updateAssessment,
    updateDecisionFork,
    setRiskLevel,
    updateIntervention,
    updateMonitoringTask,
    addTransition,
    updateOutcome,
    exportPathway,
    resetPathway
  } = useCarePathway();

  useEffect(() => {
    // Initialize pathway from URL params
    const diagnosisId = searchParams.get('diagnosisId');
    const diagnosisName = searchParams.get('diagnosisName');

    if (diagnosisId && diagnosisName && !pathway) {
      // Mock patient data - in real app, this would come from DDx context
      const entryCriteria = {
        age: 45,
        gender: 'Male',
        symptoms: 'Chest pain, shortness of breath, fatigue'
      };

      initializePathway(diagnosisId, diagnosisName, entryCriteria);
    }
  }, [searchParams, pathway, initializePathway]);

  if (!pathway) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#f5f5f7]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#4b4ad5] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#454551]">Loading Care Pathway...</p>
        </div>
      </div>
    );
  }

  const completedStages: import('@/context/CarePathwayContext').PathwayStage[] = [];
  if (currentStage !== 'assessment') completedStages.push('assessment');
  if (['interventions', 'monitoring', 'response-evaluation', 'outcome-review'].includes(currentStage)) {
    completedStages.push('risk-classification');
  }
  if (['monitoring', 'response-evaluation', 'outcome-review'].includes(currentStage)) {
    completedStages.push('interventions');
  }
  if (['response-evaluation', 'outcome-review'].includes(currentStage)) {
    completedStages.push('monitoring');
  }
  if (currentStage === 'outcome-review') {
    completedStages.push('response-evaluation');
  }

  const handleExport = () => {
    const pathwayData = exportPathway();
    console.log('Exported Pathway Data:', pathwayData);

    // Create downloadable JSON file
    const dataStr = JSON.stringify(pathwayData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `care-pathway-${pathway.diagnosisId}-${new Date().toISOString()}.json`;
    link.click();
    URL.revokeObjectURL(url);

    alert('Care Pathway exported successfully!');
  };

  const handleNewPathway = () => {
    resetPathway();
    router.push('/ddx');
  };

  return (
    <div className="flex flex-col h-full w-full overflow-hidden bg-[#f5f5f7]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center w-10 h-10 text-[#171725] hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Go back"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>

          <h1 className="text-[#171725] text-lg font-semibold">Care Pathway</h1>

          <button
            onClick={handleExport}
            className="flex items-center justify-center w-10 h-10 text-[#4b4ad5] hover:bg-[#4b4ad5]/10 rounded-full transition-colors"
            aria-label="Export pathway"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" x2="12" y1="15" y2="3"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Diagnosis Info Banner */}
      <div className="bg-gradient-to-r from-[#4b4ad5] to-[#a461d8] px-4 py-4">
        <h2 className="text-white font-semibold text-lg">{pathway.diagnosisName}</h2>
        <p className="text-white/80 text-sm mt-1">
          Patient: {pathway.entryCriteria.gender}, {pathway.entryCriteria.age} years
        </p>
      </div>

      {/* Stepper */}
      <PathwayStepper currentStage={currentStage} completedStages={completedStages} />

      {/* Stage Content - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        {currentStage === 'assessment' && (
          <AssessmentStage
            assessments={pathway.assessments}
            onUpdateAssessment={(id, completed, result) => {
              updateAssessment(id, completed, result);
            }}
            onContinue={() => {
              addTransition('assessment', 'risk-classification', 'All assessments completed');
              setCurrentStage('risk-classification');
            }}
          />
        )}

        {currentStage === 'risk-classification' && pathway.decisionForks[0] && (
          <RiskClassificationStage
            decisionFork={pathway.decisionForks[0]}
            onSelectOption={(value) => {
              updateDecisionFork(pathway.decisionForks[0].id, value);
              setRiskLevel(value as any);
            }}
            onContinue={() => {
              addTransition('risk-classification', 'interventions', `Risk level: ${pathway.decisionForks[0].selected}`);
              setCurrentStage('interventions');
            }}
          />
        )}

        {currentStage === 'interventions' && (
          <InterventionsStage
            interventions={pathway.interventions}
            onUpdateIntervention={updateIntervention}
            onContinue={() => {
              addTransition('interventions', 'monitoring', 'High priority interventions completed');
              setCurrentStage('monitoring');
            }}
          />
        )}

        {currentStage === 'monitoring' && (
          <MonitoringStage
            monitoringTasks={pathway.monitoring}
            onUpdateTask={updateMonitoringTask}
            onContinue={() => {
              addTransition('monitoring', 'response-evaluation', 'Monitoring plan established');
              setCurrentStage('response-evaluation');
            }}
          />
        )}

        {currentStage === 'response-evaluation' && (
          <div className="px-4 py-6 space-y-4">
            <h2 className="text-xl font-semibold text-[#171725] mb-2">Response to Treatment Evaluation</h2>
            <p className="text-sm text-[#454551] mb-4">
              Evaluate patient's response to the care plan and determine next steps.
            </p>

            <div className="space-y-3">
              <button
                onClick={() => {
                  addTransition('response-evaluation', 'outcome-review', 'Patient responding well - continue plan');
                  setCurrentStage('outcome-review');
                }}
                className="w-full p-4 border-2 border-green-500 bg-green-50 rounded-lg text-left hover:bg-green-100 transition-colors"
              >
                <h4 className="text-base font-semibold text-green-700 mb-1">Positive Response</h4>
                <p className="text-sm text-green-600">Patient responding well to treatment, continue current plan</p>
              </button>

              <button
                onClick={() => {
                  addTransition('response-evaluation', 'interventions', 'Suboptimal response - modifying plan');
                  setCurrentStage('interventions');
                }}
                className="w-full p-4 border-2 border-orange-500 bg-orange-50 rounded-lg text-left hover:bg-orange-100 transition-colors"
              >
                <h4 className="text-base font-semibold text-orange-700 mb-1">Modify Treatment</h4>
                <p className="text-sm text-orange-600">Suboptimal response, return to interventions to adjust plan</p>
              </button>

              <button
                onClick={() => {
                  addTransition('response-evaluation', 'outcome-review', 'Escalation required');
                  setCurrentStage('outcome-review');
                }}
                className="w-full p-4 border-2 border-red-500 bg-red-50 rounded-lg text-left hover:bg-red-100 transition-colors"
              >
                <h4 className="text-base font-semibold text-red-700 mb-1">Escalate Care</h4>
                <p className="text-sm text-red-600">Condition worsening or not responding, escalate to higher level of care</p>
              </button>
            </div>
          </div>
        )}

        {currentStage === 'outcome-review' && (
          <OutcomeReviewStage
            diagnosisName={pathway.diagnosisName}
            onUpdateOutcome={updateOutcome}
            onExport={handleExport}
            onNewPathway={handleNewPathway}
          />
        )}
      </div>
    </div>
  );
}

export default function CarePathwayPage() {
  return (
    <CarePathwayProvider>
      <MobileFrame>
        <Suspense fallback={
          <div className="flex items-center justify-center h-screen bg-[#f5f5f7]">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-[#4b4ad5] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-[#454551]">Loading Care Pathway...</p>
            </div>
          </div>
        }>
          <CarePathwayContent />
        </Suspense>
      </MobileFrame>
    </CarePathwayProvider>
  );
}
