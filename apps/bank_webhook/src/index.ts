import express from 'express';
import prisma from '@repo/database/client';

const app = express();
const port = process.env.WEBHOOK_PORT;

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
                where: { userId: parseInt(paymentInformation.userId) },
                data: {
                    amount: { increment: parseInt(paymentInformation.amount)}
                }
            }),
            prisma.onRampTransaction.updateMany({
                where: { token: paymentInformation.token },
                data: {
                    status: 'Success'
                }
            })
        ])
    
        res.status(200).json({
            message: 'Success'
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Error while processing webhook'
        })
    }
})

app.listen(port, () => console.log('Webhook service running on port ', port))