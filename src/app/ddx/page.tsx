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

function DDxChatContent() {
  const {
    step,
    gender,
    age,
    symptoms,
    files,
    diagnoses,
    setStep,
    setGender,
    setAge,
    setSymptoms,
    setFiles,
    generateDiagnoses,
    resetFromStep,
    toggleDiagnosisExpanded
  } = useDDx();

  const [showHistory, setShowHistory] = useState(false);

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

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      {/* Header - Only show if NOT on welcome step */}
      {step !== 'welcome' && (
        <DDxHeader
          onHistoryClick={() => setShowHistory(true)}
          onBack={() => window.history.back()}
        />
      )}

      {/* Chat Messages Area - WHITE BACKGROUND - Scrollable */}
      <div className="flex-1 overflow-y-auto bg-[#f5f5f7]">
        <div className={step === 'welcome' ? '' : 'pb-8'}>
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

          {/* Symptoms Flow */}
          {(step === 'symptoms' || step === 'results') && (
            <>
              <BotMessage
                message="Thank you! Now, please add the Symptoms"
                description="along with any relevant details like the patient's history, past data, or clinical findings for better accuracy."
              />
              {step === 'symptoms' && <SymptomsInput onSubmit={handleSymptomsSubmit} />}
            </>
          )}

          {/* Results */}
          {step === 'results' && symptoms && (
            <ResultsMessage
              symptoms={symptoms}
              files={files}
              diagnoses={diagnoses}
              onToggleDiagnosis={toggleDiagnosisExpanded}
              onEditSymptoms={handleEditSymptoms}
            />
          )}

        </div>
      </div>

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
