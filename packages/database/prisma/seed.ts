import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    const alice = await prisma.user.upsert({
        where: { number: '1234567890' },
        update: {},
        create: {
            number: '1234567890',
            password: 'alice',
            name: 'alice',
            onRampTransaction: {
                create: {
                    startTime: new Date(),
                    status: "Processing",
                    flow: 'Credit',
                    amount: 24600,
                    token: "122",
                    provider: "HDFC Bank"
                }
            }
        }
    })

    const bob = await prisma.user.upsert({
        where: { number: '0987654321' },
        update: {},
        create: {
            number: '0987654321',
            password: 'bob',
            name: 'bob',
            onRampTransaction: {
                create: {
                    startTime: new Date(),
                    status: "Success",
                    flow: 'Credit',
                    amount: 24600,
                    token: "122",
                    provider: "HDFC Bank"
                }
            }
        }
    })
}

main().then( async () => {
    await prisma.$disconnect()
}).catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})