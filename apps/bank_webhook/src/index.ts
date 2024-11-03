import express from 'express';
import prisma from '@repo/database/client';

const app = express();
const port = process.env.WEBHOOK_PORT || 3003;
app.use(express.json())

app.post('/hdfcWebhook', async (req, res) => {
    // zod validation

    const paymentInformation = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    }

    try {
        await prisma.$transaction([
            prisma.balance.updateMany({
                where: { 
                    userId: Number(paymentInformation.userId),
                    user: { onRampTransaction: { some: { status: 'Processing' } } }
                },
                data: {
                    amount: { increment: parseInt(paymentInformation.amount)}
                }
            }),

            prisma.onRampTransaction.updateMany({
                where: {
                    token: paymentInformation.token,
                },
                data: {
                    status: 'Success'
                }
            })
        ])
    
        res.status(200).json({
            message: 'Captured'
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Error while processing webhook'
        })
    }
})

app.listen(port, () => console.log('Webhook service running on port ', port))