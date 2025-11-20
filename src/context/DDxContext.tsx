"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

export type DDxStep = 'welcome' | 'gender' | 'age' | 'symptoms' | 'results';
export type Gender = 'Male' | 'Female' | null;

export type PathwayStage =
  | 'assessment'
  | 'risk-classification'
  | 'interventions'
  | 'monitoring'
  | 'outcome-review';

export interface Diagnosis {
  id: string;
  name: string;
  label: string;
  expanded: boolean;
}

export interface Assessment {
  id: string;
  type: 'lab' | 'imaging' | 'scoring' | 'physical-exam';
  name: string;
  completed: boolean;
  result?: string;
}

export interface Intervention {
  id: string;
  category: 'medication' | 'procedure' | 'education' | 'referral' | 'lifestyle';
  description: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
}

export interface MonitoringTask {
  id: string;
  task: string;
  frequency: string;
  completed: boolean;
}

export interface CarePathwayState {
  diagnosisId: string;
  diagnosisName: string;
  mode: 'view' | 'create';
  currentStage: PathwayStage;
  assessments: Assessment[];
  riskLevel: 'standard' | 'high' | 'complex' | null;
  interventions: Intervention[];
  monitoring: MonitoringTask[];
}

interface DDxState {
  step: DDxStep;
  gender: Gender;
  age: number | null;
  symptoms: string;
  files: File[];
  diagnoses: Diagnosis[];
  carePathway: CarePathwayState | null;
}

interface DDxContextType extends DDxState {
  setStep: (step: DDxStep) => void;
  setGender: (gender: Gender) => void;
  setAge: (age: number) => void;
  setSymptoms: (symptoms: string) => void;
  setFiles: (files: File[]) => void;
  generateDiagnoses: () => void;
  resetFromStep: (step: DDxStep) => void;
  resetToWelcome: () => void;
  toggleDiagnosisExpanded: (id: string) => void;
  startCarePathway: (diagnosisId: string, diagnosisName: string, mode: 'view' | 'create') => void;
  updateAssessment: (assessmentId: string, completed: boolean, result?: string) => void;
  setRiskLevel: (level: 'standard' | 'high' | 'complex') => void;
  updateIntervention: (interventionId: string, completed: boolean) => void;
  updateMonitoringTask: (taskId: string, completed: boolean) => void;
  advancePathwayStage: () => void;
  goBackToPathwayStage: (stage: PathwayStage) => void;
}

const DDxContext = createContext<DDxContextType | undefined>(undefined);

export function DDxProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DDxState>({
    step: 'welcome',
    gender: null,
    age: null,
    symptoms: '',
    files: [],
    diagnoses: [],
    carePathway: null
  });

  const setStep = (step: DDxStep) => {
    setState(prev => ({ ...prev, step }));
  };

  const setGender = (gender: Gender) => {
    setState(prev => ({ ...prev, gender, step: 'age' }));
  };

  const setAge = (age: number) => {
    setState(prev => ({ ...prev, age, step: 'symptoms' }));
  };

  const setSymptoms = (symptoms: string) => {
    setState(prev => ({ ...prev, symptoms }));
  };

  const setFiles = (files: File[]) => {
    setState(prev => ({ ...prev, files }));
  };

  const generateDiagnoses = () => {
    // Generate mock diagnoses based on symptoms
    const mockDiagnoses: Diagnosis[] = [
      {
        id: '1',
        name: 'Congestive Heart Failure',
        label: 'Most Likely Diagnosis',
        expanded: false
      },
      {
        id: '2',
        name: 'Pulmonary Embolism',
        label: 'Most Likely Diagnosis',
        expanded: false
      },
      {
        id: '3',
        name: 'Anemia of Chronic Disease',
        label: 'Most Likely Diagnosis',
        expanded: false
      }
    ];

    setState(prev => ({ ...prev, diagnoses: mockDiagnoses, step: 'results' }));
  };

  const resetFromStep = (step: DDxStep) => {
    // Clear all subsequent steps when editing
    const stepOrder: DDxStep[] = ['welcome', 'gender', 'age', 'symptoms', 'results'];
    const currentIndex = stepOrder.indexOf(step);

    setState(prev => {
      const newState = { ...prev, step };

      if (currentIndex <= stepOrder.indexOf('age')) {
        newState.age = null;
      }
      if (currentIndex <= stepOrder.indexOf('symptoms')) {
        newState.symptoms = '';
        newState.files = [];
      }
      if (currentIndex <= stepOrder.indexOf('results')) {
        newState.diagnoses = [];
      }

      return newState;
    });
  };

  const resetToWelcome = () => {
    // Complete reset - start fresh chat at gender selection (like "Get Started" button)
    setState({
      step: 'gender',
      gender: null,
      age: null,
      symptoms: '',
      files: [],
      diagnoses: [],
      carePathway: null
    });
  };

  const toggleDiagnosisExpanded = (id: string) => {
    setState(prev => ({
      ...prev,
      diagnoses: prev.diagnoses.map(d =>
        d.id === id ? { ...d, expanded: !d.expanded } : d
      )
    }));
  };

  const startCarePathway = (diagnosisId: string, diagnosisName: string, mode: 'view' | 'create' = 'create') => {
    // Generate mock data for care pathway
    const mockAssessments: Assessment[] = [
      { id: 'a1', type: 'lab', name: 'Complete Blood Count (CBC)', completed: mode === 'view' },
      { id: 'a2', type: 'lab', name: 'B-type Natriuretic Peptide (BNP)', completed: mode === 'view' },
      { id: 'a3', type: 'imaging', name: 'Chest X-Ray', completed: mode === 'view' },
      { id: 'a4', type: 'imaging', name: 'Echocardiogram', completed: mode === 'view' },
      { id: 'a5', type: 'scoring', name: 'NYHA Functional Classification', completed: false },
    ];

    const mockInterventions: Intervention[] = [
      { id: 'i1', category: 'medication', description: 'ACE Inhibitor (e.g., Lisinopril 10mg daily)', priority: 'high', completed: mode === 'view' },
      { id: 'i2', category: 'medication', description: 'Beta-blocker (e.g., Metoprolol 25mg BID)', priority: 'high', completed: mode === 'view' },
      { id: 'i3', category: 'medication', description: 'Diuretic (e.g., Furosemide 20mg daily)', priority: 'medium', completed: mode === 'view' },
      { id: 'i4', category: 'education', description: 'Dietary sodium restriction counseling', priority: 'high', completed: mode === 'view' },
      { id: 'i5', category: 'education', description: 'Daily weight monitoring education', priority: 'medium', completed: false },
      { id: 'i6', category: 'referral', description: 'Cardiology consultation', priority: 'high', completed: mode === 'view' },
    ];

    const mockMonitoring: MonitoringTask[] = [
      { id: 'm1', task: 'Follow-up visit', frequency: '2 weeks', completed: mode === 'view' },
      { id: 'm2', task: 'Repeat BNP level', frequency: '4 weeks', completed: mode === 'view' },
      { id: 'm3', task: 'Echocardiogram reassessment', frequency: '3 months', completed: mode === 'view' },
      { id: 'm4', task: 'Electrolyte monitoring', frequency: '1 month', completed: false },
    ];

    setState(prev => ({
      ...prev,
      carePathway: {
        diagnosisId,
        diagnosisName,
        mode,
        currentStage: 'assessment',
        assessments: mockAssessments,
        riskLevel: mode === 'view' ? 'high' : null,
        interventions: mockInterventions,
        monitoring: mockMonitoring
      }
    }));
  };

  const updateAssessment = (assessmentId: string, completed: boolean, result?: string) => {
    setState(prev => {
      if (!prev.carePathway) return prev;
      return {
        ...prev,
        carePathway: {
          ...prev.carePathway,
          assessments: prev.carePathway.assessments.map(a =>
            a.id === assessmentId ? { ...a, completed, result } : a
          )
        }
      };
    });
  };

  const setRiskLevel = (level: 'standard' | 'high' | 'complex') => {
    setState(prev => {
      if (!prev.carePathway) return prev;
      return {
        ...prev,
        carePathway: {
          ...prev.carePathway,
          riskLevel: level
        }
      };
    });
  };

  const updateIntervention = (interventionId: string, completed: boolean) => {
    setState(prev => {
      if (!prev.carePathway) return prev;
      return {
        ...prev,
        carePathway: {
          ...prev.carePathway,
          interventions: prev.carePathway.interventions.map(i =>
            i.id === interventionId ? { ...i, completed } : i
          )
        }
      };
    });
  };

  const updateMonitoringTask = (taskId: string, completed: boolean) => {
    setState(prev => {
      if (!prev.carePathway) return prev;
      return {
        ...prev,
        carePathway: {
          ...prev.carePathway,
          monitoring: prev.carePathway.monitoring.map(m =>
            m.id === taskId ? { ...m, completed } : m
          )
        }
      };
    });
  };

  const advancePathwayStage = () => {
    setState(prev => {
      if (!prev.carePathway) return prev;

      const stageOrder: PathwayStage[] = [
        'assessment',
        'risk-classification',
        'interventions',
        'monitoring',
        'outcome-review'
      ];

      const currentIndex = stageOrder.indexOf(prev.carePathway.currentStage);
      const nextStage = currentIndex < stageOrder.length - 1
        ? stageOrder[currentIndex + 1]
        : prev.carePathway.currentStage;

      return {
        ...prev,
        carePathway: {
          ...prev.carePathway,
          currentStage: nextStage
        }
      };
    });
  };

  const goBackToPathwayStage = (stage: PathwayStage) => {
    setState(prev => {
      if (!prev.carePathway) return prev;
      return {
        ...prev,
        carePathway: {
          ...prev.carePathway,
          currentStage: stage
        }
      };
    });
  };

  return (
    <DDxContext.Provider value={{
      ...state,
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
    }}>
      {children}
    </DDxContext.Provider>
  );
}

export function useDDx() {
  const context = useContext(DDxContext);
  if (!context) {
    throw new Error('useDDx must be used within DDxProvider');
  }
  return context;
}
