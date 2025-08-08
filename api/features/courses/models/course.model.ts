import { model, Schema, Types } from 'mongoose';
import { CourseStatus, CreateBaseSchema } from 'shared';
import { CourseEntity } from '../entity';

const createCourseSchema = () => {
  const baseSchema = CreateBaseSchema();

  const courseSchema = new Schema({
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

    // Default total lectures (can be overridden per batch)
    defaultTotalLectures: {
      type: Number,
      required: [true, 'Default total lectures is required'],
      min: [1, 'Course must have at least 1 lecture'],
    },

    // Topics/Roadmap stored as array of objects - INTEGRATED APPROACH
    topics: [
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
          min: [1, 'Order must be at least 1'],
        },
        estimatedHours: {
          type: Number,
          min: [0, 'Estimated hours cannot be negative'],
          default: 1,
        },
        // INTEGRATED: Store completion per batch directly in topic
        batchCompletions: [
          {
            batch: {
              type: Schema.Types.ObjectId,
              ref: 'Batch',
              required: true,
            },
            completedBy: {
              type: Schema.Types.ObjectId,
              ref: 'User',
              required: true,
            },
            completedAt: {
              type: Date,
              default: Date.now,
            },
            notes: {
              type: String,
              trim: true,
              maxlength: [300, 'Notes cannot exceed 300 characters'],
            },
          },
        ],
      },
    ],

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

  // Method to mark topic as completed for a specific batch
  //   courseSchema.methods.markTopicCompleted = function (
  //     topicId: string,
  //     batchId: string,
  //     facultyId: string,
  //     notes?: string
  //   ) {
  //     const topic = this.topics.id(topicId);
  //     if (!topic) throw new Error('Topic not found');

  //     // Check if already completed for this batch
  //     const existingCompletion = topic.batchCompletions.find(
  //       (completion: any) => completion.batch.toString() === batchId
  //     );

  //     if (existingCompletion) {
  //       throw new Error('Topic already completed for this batch');
  //     }

  //     topic.batchCompletions.push({
  //       batch: batchId,
  //       completedBy: facultyId,
  //       completedAt: new Date(),
  //       notes: notes || '',
  //     });

  //     return this.save();
  //   };

  // Method to get completion status for a specific batch
  //   courseSchema.methods.getCompletionForBatch = function (batchId: string) {
  //     const totalTopics = this.topics.length;
  //     const completedTopics = this.topics.filter((topic: any) =>
  //       topic.batchCompletions.some(
  //         (completion: any) => completion.batch.toString() === batchId
  //       )
  //     ).length;

  //     return {
  //       totalTopics,
  //       completedTopics,
  //       completionPercentage:
  //         totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0,
  //     };
  //   };

  return courseSchema;
};

export const CourseModel = model<CourseEntity>('Course', createCourseSchema());
