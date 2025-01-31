import mongoose from "mongoose";
import {randomUUID} from "node:crypto";


const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    name: {
        required: true,
        type: String,
    },
    description: {
        type: String,
    },
    activeUser:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    availablePlace:{
        type: Number,
        default: 8,
    },
    inviteCode:{
        type: String,
        default: () => randomUUID(),
    }
})

const Project = mongoose.model('Project', ProjectSchema);
export default Project;
