import { Schema, model } from 'mongoose';

const ProjectCategory = {
  CONSULTATION: 'Consultation',
  CONSTRUCTION: 'Construction',
  RENOVATION: 'Renovation',
  DESIGN: 'Design',
  MARKETING: 'Marketing',
};

const ProjectSchema = new Schema({
  category: {
    type: String,
    enum: Object.values(ProjectCategory),
    required: true,
  },
  name: String,
  location: String,
  image: String,
});

export default model('Project', ProjectSchema);
