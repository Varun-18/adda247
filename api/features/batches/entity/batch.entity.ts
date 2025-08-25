import { ObjectId } from 'mongoose';
import { BaseDocument } from 'shared';

export interface BatchEntity extends BaseDocument {
  name: string;
  courseTemplateId: ObjectId;
  startDate: Date;
  endDate: Date;
  subjects: BatchSubjectEntity[];
}

export interface BatchSubjectEntity {
  _id: ObjectId;
  subjectId: ObjectId;
  title: string;
  facultyId: ObjectId;
  totalLectures: number;
  topics: BatchTopicEntity[];
}

export interface BatchTopicEntity {
  _id: ObjectId;
  topicId: ObjectId;
  title: string;
  facultyId: ObjectId;
  lectures: BatchLectureEntity[];
}

export interface BatchLectureEntity {
  _id: ObjectId;
  lectureId: ObjectId;
  title: string;
  facultyId: ObjectId;
  completedBy?: ObjectId;
  completedAt?: Date;
}
