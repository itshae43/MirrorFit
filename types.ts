export interface UserProfile {
  name?: string;
  photoBase64?: string;
  avatarUrl?: string; // Generated digital twin
  height?: number; // cm
  weight?: number; // kg
  bodyType?: 'slim' | 'average' | 'athletic' | 'plus';
  skinTone?: string;
  styles?: string[];
  budget?: string;
  gender?: string;
}

export interface WardrobeItem {
  id: string;
  type: string;
  imageUrl: string;
  tags: string[];
  metadata?: any;
}

export interface FitAnalysis {
  overall_fit: string;
  length: string;
  width: string;
  confidence: number;
  size_recommendation: string;
  style_advice: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  image?: string;
  isTyping?: boolean;
}
