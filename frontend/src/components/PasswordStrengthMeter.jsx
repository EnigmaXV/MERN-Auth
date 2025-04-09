import React from "react";
import styled from "styled-components";
import { FiCheck as Check, FiX as X } from "react-icons/fi";

// =================== Password Criteria ===================

const CriteriaWrapper = styled.div`
  margin-top: 0.5rem;
`;

const CriteriaItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.75rem;
  margin-bottom: 0.25rem;
`;

const IconWrapper = styled.span`
  margin-right: 0.5rem;
  font-size: 1rem;
  color: ${({ met }) => (met ? "#22c55e" : "#9ca3af")}; /* green or gray */
`;

const CriteriaLabel = styled.span`
  color: ${({ met }) => (met ? "#22c55e" : "#9ca3af")}; /* green or gray */
`;

const PasswordCriteria = ({ password }) => {
  const criteria = [
    { label: "At least 6 characters", met: password.length >= 6 },
    { label: "Contains uppercase letter", met: /[A-Z]/.test(password) },
    { label: "Contains lowercase letter", met: /[a-z]/.test(password) },
    { label: "Contains a number", met: /\d/.test(password) },
    { label: "Contains special character", met: /[^A-Za-z0-9]/.test(password) },
  ];

  return (
    <CriteriaWrapper>
      {criteria.map((item) => (
        <CriteriaItem key={item.label}>
          <IconWrapper met={item.met}>
            {item.met ? <Check /> : <X />}
          </IconWrapper>
          <CriteriaLabel met={item.met}>{item.label}</CriteriaLabel>
        </CriteriaItem>
      ))}
    </CriteriaWrapper>
  );
};

// =================== Password Strength Meter ===================

const MeterWrapper = styled.div`
  margin-top: 0.5rem;
`;

const MeterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.25rem;
`;

const MeterLabel = styled.span`
  font-size: 0.75rem;
  color: #9ca3af;
`;

const MeterContainer = styled.div`
  display: flex;
  gap: 0.25rem;
`;

const MeterSegment = styled.div`
  height: 0.25rem;
  width: 25%;
  border-radius: 9999px;
  transition: background-color 0.3s;

  background-color: ${({ active, strength }) =>
    active
      ? strength === 0
        ? "#ef4444"
        : strength === 1
        ? "#f87171"
        : strength === 2
        ? "#f59e0b"
        : strength === 3
        ? "#facc15"
        : "#22c55e"
      : "#4b5563"};
`;

const PasswordStrengthMeter = ({ password }) => {
  const getStrength = (pass) => {
    let strength = 0;
    if (pass.length >= 6) strength++;
    if (pass.match(/[a-z]/) && pass.match(/[A-Z]/)) strength++;
    if (pass.match(/\d/)) strength++;
    if (pass.match(/[^a-zA-Z\d]/)) strength++;
    return strength;
  };

  const strength = getStrength(password);

  const getStrengthText = (strength) => {
    if (strength === 0) return "Very Weak";
    if (strength === 1) return "Weak";
    if (strength === 2) return "Fair";
    if (strength === 3) return "Good";
    return "Strong";
  };

  return (
    <MeterWrapper>
      <MeterHeader>
        <MeterLabel>Password strength</MeterLabel>
        <MeterLabel>{getStrengthText(strength)}</MeterLabel>
      </MeterHeader>

      <MeterContainer>
        {[...Array(4)].map((_, index) => (
          <MeterSegment
            key={index}
            active={index < strength}
            strength={strength}
          />
        ))}
      </MeterContainer>

      <PasswordCriteria password={password} />
    </MeterWrapper>
  );
};

export default PasswordStrengthMeter;
