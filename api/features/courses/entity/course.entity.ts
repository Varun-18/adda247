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
  defaultTotalLectures: number;
  topics: TopicEntity[];
  status: CourseStatus;
  createdBy: ObjectId;
}

export interface TopicEntity {
  _id: ObjectId;
  title: string;
  description?: string;
  order: number;
  estimatedHours: number;
  batchCompletions: TopicCompletionEntity[];
}

export interface TopicCompletionEntity {
  batch: ObjectId;
  completedBy: ObjectId;
  completedAt: Date;
  notes?: string;
}
