import pgPromise from 'pg-promise'

const pgp = pgPromise();
const db = pgp('postgres://isot:123456@localhost:5432/social_media')

export default db
