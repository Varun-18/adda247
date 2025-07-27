"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUserSchema = void 0;
const yup = __importStar(require("yup"));
const shared_1 = require("../../../shared");
exports.registerUserSchema = yup.object({
    body: yup.object({
        email: yup
            .string()
            .email('Invalid email format')
            .required('Email is required')
            .lowercase()
            .trim(),
        password: yup
            .string()
            .min(8, 'Password must be at least 8 characters')
            .required('Password is required')
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
        firstName: yup
            .string()
            .required('First name is required')
            .trim()
            .max(50, 'First name cannot exceed 50 characters')
            .matches(/^[a-zA-Z\s]+$/, 'First name can only contain letters and spaces'),
        lastName: yup
            .string()
            .required('Last name is required')
            .trim()
            .max(50, 'Last name cannot exceed 50 characters')
            .matches(/^[a-zA-Z\s]+$/, 'Last name can only contain letters and spaces'),
        role: yup
            .string()
            .oneOf(Object.values(shared_1.UserRole), 'Invalid role')
            .required('Role is required'),
        phoneNumber: yup
            .string()
            .trim()
            .matches(/^\+?[\d\s\-()]+$/, 'Please enter a valid phone number')
            .optional(),
        facultyProfile: yup
            .object({
            employeeId: yup
                .string()
                .trim()
                .max(20, 'Employee ID cannot exceed 20 characters')
                .when('$isFaculty', {
                is: true,
                then: (schema) => schema.required('Employee ID is required for faculty'),
                otherwise: (schema) => schema.optional(),
            }),
            department: yup
                .string()
                .trim()
                .max(100, 'Department name cannot exceed 100 characters')
                .when('$isFaculty', {
                is: true,
                then: (schema) => schema.required('Department is required for faculty'),
                otherwise: (schema) => schema.optional(),
            }),
            specialization: yup
                .array()
                .of(yup
                .string()
                .trim()
                .max(50, 'Each specialization cannot exceed 50 characters'))
                .min(1, 'At least one specialization is required for faculty')
                .max(10, 'Cannot have more than 10 specializations')
                .when('$isFaculty', {
                is: true,
                then: (schema) => schema.required('Specialization is required for faculty'),
                otherwise: (schema) => schema.optional(),
            }),
            experience: yup
                .number()
                .min(0, 'Experience cannot be negative')
                .max(50, 'Experience cannot exceed 50 years')
                .integer('Experience must be a whole number')
                .when('$isFaculty', {
                is: true,
                then: (schema) => schema.required('Experience is required for faculty'),
                otherwise: (schema) => schema.optional(),
            }),
            qualification: yup
                .string()
                .trim()
                .max(100, 'Qualification cannot exceed 100 characters')
                .when('$isFaculty', {
                is: true,
                then: (schema) => schema.required('Qualification is required for faculty'),
                otherwise: (schema) => schema.optional(),
            }),
            joiningDate: yup
                .date()
                .max(new Date(), 'Joining date cannot be in the future')
                .when('$isFaculty', {
                is: true,
                then: (schema) => schema.required('Joining date is required for faculty'),
                otherwise: (schema) => schema.optional(),
            }),
            isActive: yup.boolean().default(true),
        })
            .when(['role'], {
            is: (role) => role === shared_1.UserRole.FACULTY,
            then: (schema) => schema.required('Faculty profile is required for faculty members'),
            otherwise: (schema) => schema.optional(),
        }),
    }),
});
