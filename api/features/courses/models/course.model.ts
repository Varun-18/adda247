import { model, Schema, Types } from 'mongoose';
import { CourseStatus, CreateBaseSchema } from 'shared';
import { CourseEntity } from '../entity';

const createCourseSchema = () => {
  const baseSchema = CreateBaseSchema();

  const lectureSchema = new Schema(
    {
      _id: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
      },
      title: {
        type: String,
        required: [true, 'Lecture title is required'],
        trim: true,
        maxlength: [200, 'Lecture title cannot exceed 200 characters'],
      },
      description: {
        type: String,
        trim: true,
        maxlength: [500, 'Lecture description cannot exceed 500 characters'],
      },
      order: {
        type: Number,
        required: true,
        min: [1, 'Lecture order must be at least 1'],
      },
      durationMinutes: {
        type: Number,
        min: [1, 'Lecture duration must be at least 1 minute'],
        default: 60,
      },
    },
    { _id: false }
  );

  const topicSchema = new Schema(
    {
      _id: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
      },
      title: {
        type: String,
        required: [true, 'Topic title is required'],
        trim: true,
        maxlength: [200, 'Topic title cannot exceed 200 characters'],
      },
      description: {
        type: String,
        trim: true,
        maxlength: [500, 'Topic description cannot exceed 500 characters'],
      },
      order: {
        type: Number,
        required: true,
        min: [1, 'Topic order must be at least 1'],
      },
      lectures: [lectureSchema],
    },
    { _id: false }
  );

  const subjectSchema = new Schema(
    {
      _id: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
      },
      title: {
        type: String,
        required: [true, 'Subject title is required'],
        trim: true,
        maxlength: [200, 'Subject title cannot exceed 200 characters'],
      },
      description: {
        type: String,
        trim: true,
        maxlength: [500, 'Subject description cannot exceed 500 characters'],
      },
      order: {
        type: Number,
        required: true,
        min: [1, 'Subject order must be at least 1'],
      },
      topics: [topicSchema],
    },
    { _id: false }
  );

  const courseSchema = new Schema<CourseEntity>({
    ...baseSchema.obj,

    title: {
      type: String,
      required: [true, 'Course title is required'],
      trim: true,
      maxlength: [200, 'Course title cannot exceed 200 characters'],
      index: true,
    },

    description: {
      type: String,
      trim: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },

    courseCode: {
      type: String,
      trim: true,
      uppercase: true,
      maxlength: [10, 'Course code cannot exceed 10 characters'],
      unique: true,
    },

    duration: {
      value: {
        type: Number,
        required: [true, 'Duration value is required'],
        min: [1, 'Duration must be at least 1'],
      },
      unit: {
        type: String,
        enum: {
          values: ['days', 'weeks', 'months', 'years'],
          message: '{VALUE} is not a valid duration unit',
        },
        required: [true, 'Duration unit is required'],
      },
    },

    subjects: [subjectSchema],

    status: {
      type: String,
      enum: Object.values(CourseStatus),
      default: CourseStatus.DRAFT,
      index: true,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Created by is required'],
      index: true,
    },
  });

  return courseSchema;
};

export const CourseModel = model<CourseEntity>('Course', createCourseSchema());
