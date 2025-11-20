"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

export type PathwayBuilderStep =
  | 'welcome'
  | 'basic-info'
  | 'assessment'
  | 'risk-classification'
  | 'interventions'
  | 'monitoring'
  | 'review';

export interface Assessment {
  id: string;
  type: 'lab' | 'imaging' | 'scoring' | 'physical-exam';
  name: string;
  selected: boolean;
}

export interface Intervention {
  id: string;
  category: 'medication' | 'procedure' | 'education' | 'referral' | 'lifestyle';
  description: string;
  priority: 'high' | 'medium' | 'low';
  selected: boolean;
}

export interface MonitoringTask {
  id: string;
  task: string;
  frequency: string;
  selected: boolean;
}

interface PathwayBuilderState {
  step: PathwayBuilderStep;
  pathwayName: string;
  specialty: string;
  description: string;
  assessments: Assessment[];
  riskLevel: 'standard' | 'high' | 'complex' | null;
  interventions: Intervention[];
  monitoring: MonitoringTask[];
}

interface PathwayBuilderContextType extends PathwayBuilderState {
  setStep: (step: PathwayBuilderStep) => void;
  setBasicInfo: (name: string, specialty: string, description: string) => void;
  updateAssessment: (assessmentId: string, selected: boolean) => void;
  setRiskLevel: (level: 'standard' | 'high' | 'complex') => void;
  updateIntervention: (interventionId: string, selected: boolean) => void;
  updateMonitoringTask: (taskId: string, selected: boolean) => void;
  advanceStep: () => void;
  goBackStep: () => void;
  resetToWelcome: () => void;
  savePathway: () => void;
}

const PathwayBuilderContext = createContext<PathwayBuilderContextType | undefined>(undefined);

const initialAssessments: Assessment[] = [
  { id: '1', type: 'lab', name: 'Complete Blood Count (CBC)', selected: false },
  { id: '2', type: 'lab', name: 'Comprehensive Metabolic Panel', selected: false },
  { id: '3', type: 'imaging', name: 'Chest X-Ray', selected: false },
  { id: '4', type: 'imaging', name: 'ECG', selected: false },
  { id: '5', type: 'scoring', name: 'NYHA Functional Classification', selected: false },
  { id: '6', type: 'physical-exam', name: 'Cardiovascular Examination', selected: false },
];

const initialInterventions: Intervention[] = [
  { id: '1', category: 'medication', description: 'ACE Inhibitor or ARB', priority: 'high', selected: false },
  { id: '2', category: 'medication', description: 'Beta-blocker', priority: 'high', selected: false },
  { id: '3', category: 'medication', description: 'Diuretic therapy', priority: 'medium', selected: false },
  { id: '4', category: 'lifestyle', description: 'Sodium restriction (<2g/day)', priority: 'high', selected: false },
  { id: '5', category: 'education', description: 'Patient education on symptoms', priority: 'medium', selected: false },
  { id: '6', category: 'referral', description: 'Cardiology consultation', priority: 'high', selected: false },
];

const initialMonitoring: MonitoringTask[] = [
  { id: '1', task: 'Daily weight monitoring', frequency: 'Daily', selected: false },
  { id: '2', task: 'Blood pressure check', frequency: 'Weekly', selected: false },
  { id: '3', task: 'Lab work review', frequency: 'Monthly', selected: false },
  { id: '4', task: 'Symptom assessment', frequency: 'Bi-weekly', selected: false },
];

export function PathwayBuilderProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PathwayBuilderState>({
    step: 'welcome',
    pathwayName: '',
    specialty: '',
    description: '',
    assessments: initialAssessments,
    riskLevel: null,
    interventions: initialInterventions,
    monitoring: initialMonitoring
  });

  const setStep = (step: PathwayBuilderStep) => {
    setState(prev => ({ ...prev, step }));
  };

  const setBasicInfo = (name: string, specialty: string, description: string) => {
    setState(prev => ({
      ...prev,
      pathwayName: name,
      specialty,
      description,
      step: 'assessment'
    }));
  };

  const updateAssessment = (assessmentId: string, selected: boolean) => {
    setState(prev => ({
      ...prev,
      assessments: prev.assessments.map(a =>
        a.id === assessmentId ? { ...a, selected } : a
      )
    }));
  };

  const setRiskLevel = (level: 'standard' | 'high' | 'complex') => {
    setState(prev => ({ ...prev, riskLevel: level }));
  };

  const updateIntervention = (interventionId: string, selected: boolean) => {
    setState(prev => ({
      ...prev,
      interventions: prev.interventions.map(i =>
        i.id === interventionId ? { ...i, selected } : i
      )
    }));
  };

  const updateMonitoringTask = (taskId: string, selected: boolean) => {
    setState(prev => ({
      ...prev,
      monitoring: prev.monitoring.map(m =>
        m.id === taskId ? { ...m, selected } : m
      )
    }));
  };

  const advanceStep = () => {
    const stepOrder: PathwayBuilderStep[] = [
      'welcome',
      'basic-info',
      'assessment',
      'risk-classification',
      'interventions',
      'monitoring',
      'review'
    ];
    const currentIndex = stepOrder.indexOf(state.step);
    if (currentIndex < stepOrder.length - 1) {
      setState(prev => ({ ...prev, step: stepOrder[currentIndex + 1] }));
    }
  };

  const goBackStep = () => {
    const stepOrder: PathwayBuilderStep[] = [
      'welcome',
      'basic-info',
      'assessment',
      'risk-classification',
      'interventions',
      'monitoring',
      'review'
    ];
    const currentIndex = stepOrder.indexOf(state.step);
    if (currentIndex > 0) {
      setState(prev => ({ ...prev, step: stepOrder[currentIndex - 1] }));
    }
  };

  const resetToWelcome = () => {
    setState({
      step: 'welcome',
      pathwayName: '',
      specialty: '',
      description: '',
      assessments: initialAssessments,
      riskLevel: null,
      interventions: initialInterventions,
      monitoring: initialMonitoring
    });
  };

  const savePathway = () => {
    // Save pathway logic
    console.log('Saving pathway:', state);
    // Would typically call an API here
    alert('Pathway saved successfully!');
    resetToWelcome();
  };

  return (
    <PathwayBuilderContext.Provider
      value={{
        ...state,
        setStep,
        setBasicInfo,
        updateAssessment,
        setRiskLevel,
        updateIntervention,
        updateMonitoringTask,
        advanceStep,
        goBackStep,
        resetToWelcome,
        savePathway
      }}
    >
      {children}
    </PathwayBuilderContext.Provider>
  );
}

export function usePathwayBuilder() {
  const context = useContext(PathwayBuilderContext);
  if (context === undefined) {
    throw new Error('usePathwayBuilder must be used within a PathwayBuilderProvider');
  }
  return context;
}
