import { ProjectStatus, MilestoneStatus, ProposalStatus } from "../types/sync";

export const ProjectStatusLabels: Record<ProjectStatus, string> = {
  [ProjectStatus.CLOSED]: "COMPLETED",
  [ProjectStatus.DRAFT]: "DRAFT",
  [ProjectStatus.IN_PROGRESS]: "IN PROGRESS",
};

export const MilestoneStatusLabels: Record<MilestoneStatus, string> = {
  [MilestoneStatus.UNDER_REVIEW]: "Under Review",
  [MilestoneStatus.COMPLETED]: "Completed",
  [MilestoneStatus.NOT_ASSIGNED]: "Not Assigned",
  [MilestoneStatus.REJECTED]: "Rejected",
  [MilestoneStatus.NOT_STARTED]: "Not Started",
  [MilestoneStatus.IN_PROGRESS]: "In Progress"
}

export const ProposalStatusLabels: Record<ProposalStatus, string> = {
  [ProposalStatus.ACCEPTED]: "ACCEPTED", 
  [ProposalStatus.PENDING]: "PENDING",
  [ProposalStatus.DECLINED]: "DECLINED",
}