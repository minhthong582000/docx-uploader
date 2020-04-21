const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const deadlineSchema = mongoose.Schema({
    deadline: {
        type: Date
    }
})

module.exports = mongoose.model('deadlines', deadlineSchema);