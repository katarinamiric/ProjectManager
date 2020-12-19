import { Identifiers } from '@angular/compiler';
import { Member } from './member';

export interface Project{

    id: number;
    name: string;
    member: Member;

}