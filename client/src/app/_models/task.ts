import { Member } from './member';
import { Project } from './project';

export interface Task {
    id: number;
    deadline: Date;
    progress: number;
    status: string;
    description: string;
    user: Member;
    project: Project;
}