"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

export type DDxStep = 'welcome' | 'gender' | 'age' | 'symptoms' | 'results';
export type Gender = 'Male' | 'Female' | null;

export interface Diagnosis {
  id: string;
  name: string;
  label: string;
  expanded: boolean;
}

interface DDxState {
  step: DDxStep;
  gender: Gender;
  age: number | null;
  symptoms: string;
  files: File[];
  diagnoses: Diagnosis[];
}

interface DDxContextType extends DDxState {
  setStep: (step: DDxStep) => void;
  setGender: (gender: Gender) => void;
  setAge: (age: number) => void;
  setSymptoms: (symptoms: string) => void;
  setFiles: (files: File[]) => void;
  generateDiagnoses: () => void;
  resetFromStep: (step: DDxStep) => void;
  toggleDiagnosisExpanded: (id: string) => void;
}

const DDxContext = createContext<DDxContextType | undefined>(undefined);

export function DDxProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DDxState>({
    step: 'welcome',
    gender: null,
    age: null,
    symptoms: '',
    files: [],
    diagnoses: []
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

  const toggleDiagnosisExpanded = (id: string) => {
    setState(prev => ({
      ...prev,
      diagnoses: prev.diagnoses.map(d =>
        d.id === id ? { ...d, expanded: !d.expanded } : d
      )
    }));
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
      toggleDiagnosisExpanded
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
