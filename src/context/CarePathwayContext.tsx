"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

export type PathwayStage =
  | 'selection'
  | 'assessment'
  | 'risk-classification'
  | 'interventions'
  | 'monitoring'
  | 'response-evaluation'
  | 'outcome-review';

export type RiskLevel = 'standard' | 'high' | 'complex';

export interface Assessment {
  id: string;
  type: 'lab' | 'imaging' | 'scoring' | 'physical-exam';
  name: string;
  completed: boolean;
  result?: string;
}

export interface DecisionFork {
  id: string;
  question: string;
  options: {
    value: string;
    label: string;
    nextStage: PathwayStage;
  }[];
  selected?: string;
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
  dueDate?: string;
  completed: boolean;
}

export interface CarePathway {
  diagnosisId: string;
  diagnosisName: string;
  entryCriteria: {
    age?: number;
    gender?: string;
    symptoms?: string;
  };
  assessments: Assessment[];
  decisionForks: DecisionFork[];
  riskLevel?: RiskLevel;
  interventions: Intervention[];
  monitoring: MonitoringTask[];
  transitions: {
    from: PathwayStage;
    to: PathwayStage;
    reason: string;
    timestamp: string;
  }[];
  outcomes: {
    status: 'ongoing' | 'resolved' | 'escalated' | 'referred';
    notes: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface CarePathwayState {
  currentStage: PathwayStage;
  selectedDiagnosisId: string | null;
  pathway: CarePathway | null;
}

interface CarePathwayContextType extends CarePathwayState {
  setCurrentStage: (stage: PathwayStage) => void;
  initializePathway: (diagnosisId: string, diagnosisName: string, entryCriteria: any) => void;
  updateAssessment: (assessmentId: string, completed: boolean, result?: string) => void;
  updateDecisionFork: (forkId: string, selected: string) => void;
  setRiskLevel: (level: RiskLevel) => void;
  updateIntervention: (interventionId: string, completed: boolean) => void;
  updateMonitoringTask: (taskId: string, completed: boolean) => void;
  addTransition: (from: PathwayStage, to: PathwayStage, reason: string) => void;
  updateOutcome: (status: string, notes: string) => void;
  exportPathway: () => any;
  resetPathway: () => void;
}

const CarePathwayContext = createContext<CarePathwayContextType | undefined>(undefined);

export function CarePathwayProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CarePathwayState>({
    currentStage: 'selection',
    selectedDiagnosisId: null,
    pathway: null
  });

  const setCurrentStage = (stage: PathwayStage) => {
    setState(prev => ({ ...prev, currentStage: stage }));
  };

  const initializePathway = (diagnosisId: string, diagnosisName: string, entryCriteria: any) => {
    const now = new Date().toISOString();

    // Mock assessments based on diagnosis
    const mockAssessments: Assessment[] = [
      { id: 'a1', type: 'lab', name: 'Complete Blood Count (CBC)', completed: false },
      { id: 'a2', type: 'lab', name: 'B-type Natriuretic Peptide (BNP)', completed: false },
      { id: 'a3', type: 'imaging', name: 'Chest X-Ray', completed: false },
      { id: 'a4', type: 'imaging', name: 'Echocardiogram', completed: false },
      { id: 'a5', type: 'scoring', name: 'NYHA Functional Classification', completed: false },
    ];

    const mockDecisionFork: DecisionFork = {
      id: 'df1',
      question: 'What is the patient\'s risk/severity level?',
      options: [
        { value: 'standard', label: 'Standard Risk (NYHA Class I-II)', nextStage: 'interventions' },
        { value: 'high', label: 'High Risk (NYHA Class III)', nextStage: 'interventions' },
        { value: 'complex', label: 'Complex/Comorbid (NYHA Class IV)', nextStage: 'interventions' }
      ]
    };

    const mockInterventions: Intervention[] = [
      { id: 'i1', category: 'medication', description: 'ACE Inhibitor (e.g., Lisinopril 10mg daily)', priority: 'high', completed: false },
      { id: 'i2', category: 'medication', description: 'Beta-blocker (e.g., Metoprolol 25mg BID)', priority: 'high', completed: false },
      { id: 'i3', category: 'medication', description: 'Diuretic (e.g., Furosemide 20mg daily)', priority: 'medium', completed: false },
      { id: 'i4', category: 'education', description: 'Dietary sodium restriction counseling', priority: 'high', completed: false },
      { id: 'i5', category: 'education', description: 'Daily weight monitoring education', priority: 'medium', completed: false },
      { id: 'i6', category: 'referral', description: 'Cardiology consultation', priority: 'high', completed: false },
    ];

    const mockMonitoring: MonitoringTask[] = [
      { id: 'm1', task: 'Follow-up visit', frequency: '2 weeks', completed: false },
      { id: 'm2', task: 'Repeat BNP level', frequency: '4 weeks', completed: false },
      { id: 'm3', task: 'Echocardiogram reassessment', frequency: '3 months', completed: false },
      { id: 'm4', task: 'Electrolyte monitoring', frequency: '1 month', completed: false },
    ];

    const newPathway: CarePathway = {
      diagnosisId,
      diagnosisName,
      entryCriteria,
      assessments: mockAssessments,
      decisionForks: [mockDecisionFork],
      interventions: mockInterventions,
      monitoring: mockMonitoring,
      transitions: [],
      outcomes: {
        status: 'ongoing',
        notes: ''
      },
      createdAt: now,
      updatedAt: now
    };

    setState(prev => ({
      ...prev,
      selectedDiagnosisId: diagnosisId,
      pathway: newPathway,
      currentStage: 'assessment'
    }));
  };

  const updateAssessment = (assessmentId: string, completed: boolean, result?: string) => {
    setState(prev => {
      if (!prev.pathway) return prev;

      return {
        ...prev,
        pathway: {
          ...prev.pathway,
          assessments: prev.pathway.assessments.map(a =>
            a.id === assessmentId ? { ...a, completed, result } : a
          ),
          updatedAt: new Date().toISOString()
        }
      };
    });
  };

  const updateDecisionFork = (forkId: string, selected: string) => {
    setState(prev => {
      if (!prev.pathway) return prev;

      return {
        ...prev,
        pathway: {
          ...prev.pathway,
          decisionForks: prev.pathway.decisionForks.map(df =>
            df.id === forkId ? { ...df, selected } : df
          ),
          updatedAt: new Date().toISOString()
        }
      };
    });
  };

  const setRiskLevel = (level: RiskLevel) => {
    setState(prev => {
      if (!prev.pathway) return prev;

      return {
        ...prev,
        pathway: {
          ...prev.pathway,
          riskLevel: level,
          updatedAt: new Date().toISOString()
        }
      };
    });
  };

  const updateIntervention = (interventionId: string, completed: boolean) => {
    setState(prev => {
      if (!prev.pathway) return prev;

      return {
        ...prev,
        pathway: {
          ...prev.pathway,
          interventions: prev.pathway.interventions.map(i =>
            i.id === interventionId ? { ...i, completed } : i
          ),
          updatedAt: new Date().toISOString()
        }
      };
    });
  };

  const updateMonitoringTask = (taskId: string, completed: boolean) => {
    setState(prev => {
      if (!prev.pathway) return prev;

      return {
        ...prev,
        pathway: {
          ...prev.pathway,
          monitoring: prev.pathway.monitoring.map(m =>
            m.id === taskId ? { ...m, completed } : m
          ),
          updatedAt: new Date().toISOString()
        }
      };
    });
  };

  const addTransition = (from: PathwayStage, to: PathwayStage, reason: string) => {
    setState(prev => {
      if (!prev.pathway) return prev;

      return {
        ...prev,
        pathway: {
          ...prev.pathway,
          transitions: [
            ...prev.pathway.transitions,
            {
              from,
              to,
              reason,
              timestamp: new Date().toISOString()
            }
          ],
          updatedAt: new Date().toISOString()
        }
      };
    });
  };

  const updateOutcome = (status: string, notes: string) => {
    setState(prev => {
      if (!prev.pathway) return prev;

      return {
        ...prev,
        pathway: {
          ...prev.pathway,
          outcomes: {
            status: status as any,
            notes
          },
          updatedAt: new Date().toISOString()
        }
      };
    });
  };

  const exportPathway = () => {
    if (!state.pathway) return null;

    // Return structured JSON for export
    return {
      ...state.pathway,
      exportFormat: 'care-pathway-v1',
      exportedAt: new Date().toISOString()
    };
  };

  const resetPathway = () => {
    setState({
      currentStage: 'selection',
      selectedDiagnosisId: null,
      pathway: null
    });
  };

  return (
    <CarePathwayContext.Provider value={{
      ...state,
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
    }}>
      {children}
    </CarePathwayContext.Provider>
  );
}

export function useCarePathway() {
  const context = useContext(CarePathwayContext);
  if (!context) {
    throw new Error('useCarePathway must be used within CarePathwayProvider');
  }
  return context;
}
