
export enum EducationalLevel {
  HIGH_SCHOOL = "High School",
  UNDERGRADUATE = "Undergraduate",
  POSTGRADUATE = "Postgraduate",
  PROFESSIONAL_DEVELOPMENT = "Professional Development",
}

export interface SubjectRecommendation {
  subject: string;
  reason: string;
  careerProspects: string;
}

export interface Competition {
  name: string;
  description: string;
  url: string;
}

export interface GeminiSubjectResponse {
  recommendations: SubjectRecommendation[];
}

export interface GeminiCompetitionResponse {
  competitions: Competition[];
}
