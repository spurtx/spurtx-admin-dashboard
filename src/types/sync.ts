;



// ----- User Types -----
export enum UserRole {
    ADMIN = "ADMIN",
    SUPER_ADMIN = "SUPER_ADMIN",
  }
  
  export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: UserRole;
  }
  
  // ----- Project Types -----
  // export enum ProjectStatus {
  //   COMPLETED = "COMPLETED",
  //   DRAFT = "DRAFT",
  //   IN_PROGRESS = "IN_PROGRESS", // Fixed typo: "IN PROGRESS"
  // }
export enum ProjectStatus {
  CLOSED = "CLOSED",
  DRAFT = "DRAFT",
  IN_PROGRESS = "IN PROGRESS",
}
  export interface ProjectsByStatus {
  [ProjectStatus.DRAFT]?: number;
  [ProjectStatus.IN_PROGRESS]?: number;
  [ProjectStatus.CLOSED]?: number;
}
  
  export enum ProjectInvitationStatus {
    ACCEPTED_INVITE = "ACCEPTED-INVITE",
    REJECTED_INVITE = "REJECTED-INVITE",
    PENDING_INVITE = "PENDING-INVITE",
  }
  
  export interface ProjectMetrics {
    totalProjects: number;
    totalInvitationsSent: number;
    avgTeamMembers: number;
    avgMembersRemoved: number;
    avgCompletionDays: number;
  }
  
  export interface Project {
    id: string;
    title: string;
    description: string;
    status: ProjectStatus;
    createdAt: string;
    updatedAt: string;
    owner: User;
  }
  
  // ----- Proposal Types -----
  export enum ProjectProposalStatus {
    ACCEPTED = "ACCEPTED",
    REJECTED = "REJECTED",
    PENDING = "PENDING",
  }
  
  export interface Proposal {
    id: string;
    projectId: string;
    summary: string;
    status: ProjectStatus;
    submittedBy: User;
    submittedAt: string;
  }
  
  // ----- Milestone Types -----
  export interface Milestone {
    id: string;
    projectId: string;
    title: string;
    description: string;
    dueDate: string;
    completed: boolean;
  }

  export enum MilestoneStatus {
    UNDER_REVIEW = "UNDER REVIEW",
    COMPLETED = "COMPLETED",
    NOT_ASSIGNED = "NOT ASSIGNED",
    REJECTED = "REJECTED",
    NOT_STARTED = "NOT STARTED",
    IN_PROGRESS = "IN PROGRESS"
  }

  export enum ProposalStatus {
    PENDING = "PENDING",
    ACCEPTED = "ACCEPTED",
    DECLINED = "DECLINED",
  }
  
  // ----- Task Types -----
  export interface Task {
    id: string;
    milestoneId: string;
    title: string;
    isCompleted: boolean;
    assignedTo: User | null;
    dueDate: string;
  }
  
  // ----- Subscription Types -----
  export enum SubscriptionPlan {
    MONTHLY_MEMBER = "MONTHLY_MEMBER",
    MONTHLY_PARTNER = "MONTHLY_PARTNER",
    QUARTERLY_MEMBER = "QUARTERLY_MEMBER",
    QUARTERLY_PARTNER = "QUARTERLY_PARTNER",
    YEARLY_MEMBER = "YEARLY_MEMBER",
    YEARLY_PARTNER = "YEARLY_PARTNER",
  }
  