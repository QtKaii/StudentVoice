import { MessageSquare, Vote, FileText, Users } from 'lucide-react'

export interface Feature {
  name: string;
  description: string;
  Icon: LucideIcon;
}


export const features: Feature[] = [
  {
    name: 'Open Discussions',
    description: 'Engage in meaningful conversations with your peers on topics that matter to you.',
    Icon: MessageSquare,
  },
  {
    name: 'Proposal Voting',
    description: 'Vote on student-initiated proposals to show support for changes you want to see.',
    Icon: Vote,
  },
  {
    name: 'Digital Petitions',
    description: 'Your school email acts as a digital signature, giving weight to the causes you support.',
    Icon: FileText,
  },
  {
    name: 'Direct Communication',
    description: 'Bridge the gap between students and administration with a unified voice.',
    Icon: Users,
  },
];
