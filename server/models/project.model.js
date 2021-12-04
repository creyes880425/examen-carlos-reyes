const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const ProjectSchema = new mongoose.Schema({
    project: {
        type: String,
        required: [true, 'El Proyecto es requerido'],
        minlength: [3, 'El Proyecto debe tener al menos 3 caracteres'],
        unique: true
    },
    due_date: {
        type: Date,
        required: [true, 'La Fecha de Vencimiento es requerida']
    },
    status: {
        type: String,
        required: [true, 'El Estado es requerido']
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, 'El usuario es requerido']
    }
}, { timestamps: true });

ProjectSchema.plugin(uniqueValidator, { message: 'El proyecto debe ser único.' });

ProjectSchema.virtual('user', {
    ref: 'User',
    localField: 'userId',
    foreignField: '_id'
});

ProjectSchema.set('toObject', { virtuals: true });
ProjectSchema.set('toJSON', { virtuals: true });

const Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;