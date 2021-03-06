const Schema = {}

Schema.Target = new SimpleSchema({
  type: {
    type: String,
    allowedValues: ['about', 'least', 'most'],
  },
  length: {
    type: Number,
    optional: true,
  },
  complete: {
    type: Number,
    optional: true,
  },
})

Schema.Member = new SimpleSchema({
  userId: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
  },
})

Schema.Note = new SimpleSchema({
  folderId: {
    type: String,
    optional: true,
  },
  name: {
    type: String,
  },
  summary: {
    type: String,
    optional: true,
  },
  isArchive: {
    type: Boolean,
    optional: true,
  },
  target: {
    type: Schema.Target,
  },
  stars: {
    type: Array,
    optional: true,
  },
  'stars.$': {
    type: String,
  },
  members: {
    type: Array,
  },
  'members.$': {
    type: Schema.Member,
  },
  createdAt: {
    type: Date,
    autoValue() {
      if (this.isInsert) {
        return new Date()
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date()}
      } else {
        this.unset()
      }
    },
  },
  updatedAt: {
    type: Date,
    optional: true,
    denyInsert: true,
    autoValue() {
      if (this.isUpdate) {
        return new Date()
      }
    },
  },
})

Notes = new Mongo.Collection('notes')
Notes.attachSchema(Schema.Note)

Notes.helpers({
  isMember(userId) {
    const isMember = !!_.find(this.members, (member) => {
      return member.userId == userId
    })

    return isMember
  },
  isAdmin(userId) {
    const isAdmin = !!_.find(this.members, (member) => {
      return member.userId == userId && member.isAdmin
    })

    return isAdmin
  },
  getStatus(length) {
    const {target} = this
    const progressPercent = (!!target.length && target.length > 0) ? length * 100 / target.length : 0

    if (!target.length) {
      target.length = ''
    }

    let status = null
    if (!!target.length && target.length > 0 ) {
      if (progressPercent < 100) {
        status = 'start'
      }

      if ((target.type == 'about' && progressPercent >= 100 && progressPercent < 120) || (target.type == 'least' && progressPercent >= 100) || (target.type == 'most' && progressPercent == 100)) {
        status = 'done'
      }

      if ((target.type == 'about' && progressPercent >= 120) || (target.type == 'most' && progressPercent > 100)) {
        status = 'surplus'
      }
    }

    return {status, progressPercent}
  },
})
