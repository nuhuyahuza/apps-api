import { hash } from 'bcrypt'
import User from '../models/user.model'
import App from '../models/app.model'
import sequelize from './database.js'

const seedDatabase = async (): Promise<void> => {
  try {
    await sequelize.sync({ force: true })

    const hashedAdminPassword = await hash(process.env.ADMIN_PASSWORD || 'adminpassword', 10)
    await User.create({ name: 'Admin', email: 'admin@example.com', password: hashedAdminPassword })

    const hashedGuestPassword = await hash(process.env.GUEST_PASSWORD || 'guestpassword', 10)
    await User.create({ name: 'Guest', email: 'guest@example.com', password: hashedGuestPassword})

    await App.create({ name: 'App1', icon: 'icon1@example.com', url: 'icon1@example.com' })

    await App.create({ name: 'App2', icon: 'icon1@example.com', url: 'icon1@example.com' })

    console.log('Database seeded successfully.')
  } catch (error) {
    console.error(error)
  } finally {
    process.exit() // Terminate the process after seeding
  }
}

seedDatabase()
