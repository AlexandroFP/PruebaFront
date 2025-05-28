export interface CapacityDemand {
  id: number;
  zone: string;
  participant: string;
  subaccount: string;
  demandCapacityMW: number;
  annualPowerRequirementMW: number;
  efficientAnnualRequirementMW: number;
  createdAt: string;
}
