var mongoose=require('mongoose'),
    Schema = mongoose.Schema,
    entrySchema = new Schema({
      date: {type: Date, required: [true, 'Date is required']},
      time: {type: String, required: [true, 'Time is required']},
      complaint: {type: String, required: [true, 'Complaint is required']},
      name: {type: String, required: [true, 'Name is required']},
      _patient: {type: Schema.Types.ObjectId, ref: 'User'},
    }, {timestamps: true})

mongoose.model('Entry', entrySchema);
