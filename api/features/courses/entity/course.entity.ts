import { ObjectId } from 'mongoose';
import { BaseDocument, CourseStatus } from 'shared';

export interface CourseEntity extends BaseDocument {
  title: string;
  description?: string;
  courseCode: string;
  duration: {
    value: number;
    unit: 'days' | 'weeks' | 'months' | 'years';
  };
  subjects: SubjectEntity[];
  status: CourseStatus;
  createdBy: ObjectId;
}

export interface SubjectEntity {
  _id: ObjectId;
  title: string;
  description?: string;
  order: number;
  topics: TopicEntity[];
}

export interface TopicEntity {
  _id: ObjectId;
  title: string;
  description?: string;
  order: number;
  lectures: LectureEntity[];
}

export interface LectureEntity {
  _id: ObjectId;
  title: string;
  description?: string;
  order: number;
}
