const { PrismaClient } = require('@prisma/client')

const prismaClient = new PrismaClient()

async function main() {
    console.log('Seeding...')

    // 1. Create a Student
    const student = await prismaClient.user.upsert({
        where: { email: 'student@example.com' },
        update: {},
        create: {
            email: 'student@example.com',
            name: 'John Student',
            role: 'STUDENT',
            studentRequests: {
                create: [
                    {
                        subject: 'Mathematics',
                        grade: '10th',
                        description: 'Need help with Calculus and Algebra. Evenings preferred.',
                        status: 'OPEN'
                    },
                    {
                        subject: 'Physics',
                        grade: '12th',
                        description: 'Preparing for entrance exams. Need intensive coaching.',
                        status: 'OPEN'
                    }
                ]
            }
        },
    })

    // 2. Create a Teacher with coins
    const teacher = await prismaClient.user.upsert({
        where: { email: 'teacher@example.com' },
        update: {},
        create: {
            email: 'teacher@example.com',
            name: 'Jane Teacher',
            role: 'TEACHER',
            teacherProfile: {
                create: {
                    bio: "Experienced Math tutor.",
                    coins: 100 // Enough for 2 unlocks
                }
            }
        },
    })

    console.log({ student, teacher })
}

main()
    .then(async () => {
        await prismaClient.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prismaClient.$disconnect()
        process.exit(1)
    })
