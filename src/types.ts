export type QuestionType = 'Pilihan Ganda' | 'Pilihan Ganda Kompleks' | 'Benar Salah' | 'Menjodohkan';
export type DifficultyType = 'Mudah' | 'Sedang' | 'Sulit';

export interface Question {
  id: number;
  type: QuestionType;
  difficulty: DifficultyType;
  topic: string;
  stimulus: string;
  questionText: string;
  illustrationType: 'none' | 'relation_graph' | 'infographic_pie' | 'cartesian_line';
  options?: string[]; // for normal multiple choice
  complexOptions?: string[]; // for multiple response checkboxes
  matchingLeft?: string[]; // matching prompts
  matchingRight?: string[]; // matching targets
  correctAnswer: any; // validation target
  scoreValue: number; // point score for this question (e.g., 2 or 3 marks)
}

export interface StudentAnswers {
  [questionId: number]: {
    answered: boolean;
    val: any; // could be index string, arrays of indices, true/false dictionary, or matching map
    isDoubtful: boolean;
  };
}

export interface StudentProfile {
  nama: string;
  kelas: string;
}

export interface ExamStats {
  tanggalDanWaktu: string;
  nama: string;
  kelas: string;
  benar: number;
  salah: number;
  terjawab: number;
  raguRagu: number;
  belumTerjawab: number;
  nilai: number;
}

export interface LeaderboardEntry {
  nama: string;
  kelas: string;
  nilai: number;
  tanggalWall: string;
}
