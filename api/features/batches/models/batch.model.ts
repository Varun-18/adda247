import { model, Schema, Types } from 'mongoose';
import { CreateBaseSchema } from 'shared';
import { BatchEntity } from '../entity';

const createBatchSchema = () => {
  const baseSchema = CreateBaseSchema();

  const lectureSchema = new Schema(
    {
      _id: { type: Schema.Types.ObjectId, default: () => new Types.ObjectId() },
      lectureId: { type: Schema.Types.ObjectId, required: true },
      title: { type: String, required: true, trim: true },
      facultyId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
      completedBy: { type: Schema.Types.ObjectId, ref: 'User' },
      completedAt: { type: Date },
    },
    { _id: false }
  );

  const topicSchema = new Schema(
    {
      _id: { type: Schema.Types.ObjectId, default: () => new Types.ObjectId() },
      topicId: { type: Schema.Types.ObjectId, required: true },
      title: { type: String, required: true, trim: true },
      facultyId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
      lectures: [lectureSchema],
    },
    { _id: false }
  );

  const subjectSchema = new Schema(
    {
      _id: { type: Schema.Types.ObjectId, default: () => new Types.ObjectId() },
      subjectId: { type: Schema.Types.ObjectId, required: true },
      title: { type: String, required: true, trim: true },
      facultyId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
      totalLectures: { type: Number, required: true },
      topics: [topicSchema],
    },
    { _id: false }
  );

  const batchSchema = new Schema<BatchEntity>({
    ...baseSchema.obj,

    name: {
      type: String,
      required: [true, 'Batch name is required'],
      trim: true,
      maxlength: [200, 'Batch name cannot exceed 200 characters'],
    },

    courseTemplateId: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },

    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },

    subjects: [subjectSchema],
  });

  return batchSchema;
};

export const BatchModel = model<BatchEntity>('Batch', createBatchSchema());
