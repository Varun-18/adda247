"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const shared_1 = require("../../../shared");
const createUserSchema = () => {
    const baseSchema = (0, shared_1.CreateBaseSchema)();
    const userSchema = new mongoose_1.Schema({
        ...baseSchema.obj,
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
            match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [8, 'Password must be at least 8 characters'],
            select: false, // Don't return password by default
        },
        firstName: {
            type: String,
            required: [true, 'First name is required'],
            trim: true,
            maxlength: [50, 'First name cannot exceed 50 characters'],
        },
        lastName: {
            type: String,
            required: [true, 'Last name is required'],
            trim: true,
            maxlength: [50, 'Last name cannot exceed 50 characters'],
        },
        role: {
            type: String,
            enum: {
                values: Object.values(shared_1.UserRole),
                message: '{VALUE} is not a valid role',
            },
            required: true,
            index: true,
        },
        phoneNumber: {
            type: String,
            trim: true,
            match: [/^\+?[\d\s\-()]+$/, 'Please enter a valid phone number'],
            sparse: true, // Allow multiple null values
        },
        // Faculty-specific profile (optional)
        facultyProfile: {
            employeeId: {
                type: String,
                trim: true,
                sparse: true, // Only enforce uniqueness for non-null values
            },
            department: {
                type: String,
                trim: true,
            },
            specialization: [
                {
                    type: String,
                    trim: true,
                },
            ],
            experience: {
                type: Number,
                min: [0, 'Experience cannot be negative'],
                max: [50, 'Experience seems unrealistic'],
            },
            qualification: {
                type: String,
                trim: true,
            },
            joiningDate: {
                type: Date,
                validate: {
                    validator: function (value) {
                        return !value || value <= new Date();
                    },
                    message: 'Joining date cannot be in the future',
                },
            },
            isActive: {
                type: Boolean,
                default: true,
            },
        },
    });
    //   // Indexes for performance
    //   userSchema.index({ email: 1 });
    //   userSchema.index({ role: 1 });
    //   userSchema.index({ 'facultyProfile.employeeId': 1 }, { sparse: true });
    //   userSchema.index({ 'facultyProfile.department': 1 });
    //   userSchema.index({ 'facultyProfile.isActive': 1 });
    //   // Compound indexes
    //   userSchema.index({ role: 1, 'facultyProfile.isActive': 1 });
    //   userSchema.index({
    //     'facultyProfile.department': 1,
    //     'facultyProfile.isActive': 1,
    //   });
    //   // Virtual fields
    //   userSchema.virtual('fullName').get(function () {
    //     return `${this.firstName} ${this.lastName}`;
    //   });
    //   userSchema.virtual('isFaculty').get(function () {
    //     return this.role === UserRole.FACULTY;
    //   });
    //   userSchema.virtual('isBusinessUser').get(function () {
    //     return this.role === UserRole.BUSINESS_USER || this.role === UserRole.ADMIN;
    //   });
    //   // Pre-save middleware for validation
    //   userSchema.pre('save', function (next) {
    //     // Ensure email is lowercase
    //     if (this.isModified('email')) {
    //       this.email = this.email.toLowerCase();
    //     }
    //     if (!this.get('isFaculty') && this.facultyProfile) {
    //       this.facultyProfile = undefined;
    //     }
    //     next();
    //   });
    //   userSchema.set('toJSON', {
    //     virtuals: true,
    //     transform: function (doc, ret) {
    //       delete ret.password;
    //       delete ret.__v;
    //       ret.id = ret._id;
    //       delete ret._id;
    //       return ret;
    //     },
    //   });
    return userSchema;
};
exports.UserModel = (0, mongoose_1.model)('User', createUserSchema());
