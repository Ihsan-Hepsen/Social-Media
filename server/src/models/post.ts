import User from './user'
import Photo from './photo'

export default interface Post {
    publisher: User
    publishDate: Date
    photo: Photo
    caption?: string
}
