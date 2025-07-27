"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBaseRepository = void 0;
const CreateBaseRepository = (model) => {
    const create = async (data) => {
        const entity = new model(data);
        return await entity.save();
    };
    const findById = async (id) => {
        return await model.findOne({
            _id: id,
            deletedAt: null,
        });
    };
    const findOne = async (filter, includePassword = false) => {
        const query = model.findOne({
            ...filter,
            deletedAt: null,
        });
        // Include password if requested
        if (includePassword) {
            query.select('+password');
        }
        return await query.exec();
    };
    const findAll = async (filter = {}, pagination = {}) => {
        const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc', } = pagination;
        const skip = (page - 1) * limit;
        const sort = {
            [sortBy]: sortOrder === 'asc' ? 1 : -1,
        };
        const mongoFilter = {
            ...filter,
            deletedAt: null,
        };
        const [data, totalItems] = await Promise.all([
            model.find(mongoFilter).sort(sort).skip(skip).limit(limit).exec(),
            model.countDocuments(mongoFilter),
        ]);
        const totalPages = Math.ceil(totalItems / limit);
        return {
            data,
            pagination: {
                currentPage: page,
                totalPages,
                totalItems,
                itemsPerPage: limit,
                hasNextPage: page < totalPages,
                hasPreviousPage: page > 1,
            },
        };
    };
    const update = async (id, data) => {
        return await model.findOneAndUpdate({ _id: id, deletedAt: null }, { ...data, updatedAt: new Date() }, { new: true, runValidators: true });
    };
    const deleteEntity = async (id, softDelete = true) => {
        if (softDelete) {
            return await model.findOneAndUpdate({ _id: id, deletedAt: null }, { deletedAt: new Date() }, { new: true });
        }
        else {
            return await model.findOneAndDelete({
                _id: id,
            });
        }
    };
    const deleteMany = async (filter, softDelete = true) => {
        const mongoFilter = {
            ...filter,
            deletedAt: null,
        };
        if (softDelete) {
            const result = await model.updateMany(mongoFilter, {
                deletedAt: new Date(),
            });
            return result.modifiedCount;
        }
        else {
            const result = await model.deleteMany(mongoFilter);
            return result.deletedCount;
        }
    };
    const exists = async (filter) => {
        const doc = await model.findOne({
            ...filter,
            deletedAt: null,
        });
        return !!doc;
    };
    const count = async (filter = {}) => {
        return await model.countDocuments({
            ...filter,
            deletedAt: null,
        });
    };
    return {
        create,
        findById,
        findOne,
        findAll,
        update,
        delete: deleteEntity,
        deleteMany,
        exists,
        count,
    };
};
exports.CreateBaseRepository = CreateBaseRepository;
