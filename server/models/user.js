var mongoose=require('mongoose'),
    Schema = mongoose.Schema,
    userSchema = new Schema({
      name: {
        type: String,
        required: [true, "Username is required."],
        trim: true
      },
      _entries: [{type: Schema.Types.ObjectId, ref: 'Entry'}]
    }, {timestamps: true})

mongoose.model('User', userSchema);
