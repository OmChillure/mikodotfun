import { migrate } from 'drizzle-orm/postgres-js/migrator'
import { db } from './index'

async function runMigrations() {
  console.log('Running database migrations...')
  
  try {
    await migrate(db, { migrationsFolder: './drizzle' })
    console.log('Migrations completed successfully!')
  } catch (error) {
    console.error('Migration failed:', error)
    throw error
  } finally {
    process.exit(0)
  }
}

runMigrations().catch((error) => {
  console.error('Migration error:', error)
  process.exit(1)
})