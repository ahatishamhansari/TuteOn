"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { purchaseCoins } from "@/app/actions/payment"
import { toast } from "sonner"
import { Check, CreditCard, Gem, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

const pricing = [
    {
        id: "starter",
        name: "Starter Pack",
        coins: 100,
        price: 5,
        description: "Perfect for trying out the platform.",
        features: ["Unlock 2 Student Contacts", "Basic Support"]
    },
    {
        id: "pro",
        name: "Professional",
        coins: 500,
        price: 20,
        popular: true,
        description: "Best for active tutors.",
        features: ["Unlock 10 Student Contacts", "Priority Support", "Profile Badge"]
    },
    {
        id: "elite",
        name: "Elite",
        coins: 1500,
        price: 50,
        description: "Maximum value for agencies.",
        features: ["Unlock 30+ Student Contacts", "Dedicated Manager", "Featured Profile"]
    }
]

export default function CreditsPage() {
    const [loading, setLoading] = useState<string | null>(null)
    const router = useRouter()

    const handlePurchase = async (pack: typeof pricing[0]) => {
        setLoading(pack.id)

        // 1. Simulate Gateway Popup
        toast.info("Connecting to Secure Payment Gateway...", { duration: 1500 })

        // 2. Simulate User entering details & processing
        setTimeout(async () => {
            // Call Server Action
            const paymentId = `pay_${Math.random().toString(36).substring(7)}` // Mock ID

            const res = await purchaseCoins(pack.coins, pack.price, paymentId)

            if (res.error) {
                toast.error(`Purchase Failed: ${res.error}`)
            } else {
                toast.success(`Success! Added ${pack.coins} coins to your wallet.`)
                router.refresh() // Update balance in UI
            }
            setLoading(null)
        }, 3000)
    }

    return (
        <div className="container py-12 max-w-6xl">
            <div className="text-center mb-16 space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                    Invest in Your Teaching Career
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Purchase secure credits to unlock student details. Pay only when you find the perfect match.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {pricing.map((pack) => (
                    <Card key={pack.id} className={`relative flex flex-col ${pack.popular ? 'border-primary shadow-2xl scale-105' : 'hover:shadow-lg transition-all'}`}>
                        {pack.popular && (
                            <div className="absolute -top-4 left-0 right-0 flex justify-center">
                                <span className="bg-primary text-primary-foreground text-sm font-bold px-3 py-1 rounded-full shadow-sm">
                                    Most Popular
                                </span>
                            </div>
                        )}
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                {pack.name}
                                <Gem className={`h-5 w-5 ${pack.popular ? 'text-primary' : 'text-muted-foreground'}`} />
                            </CardTitle>
                            <CardDescription>{pack.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 space-y-6">
                            <div className="text-3xl font-bold">
                                ${pack.price}
                                <span className="text-sm font-normal text-muted-foreground"> / {pack.coins} Coins</span>
                            </div>
                            <ul className="space-y-2">
                                {pack.features.map((feature) => (
                                    <li key={feature} className="flex items-center gap-2 text-sm">
                                        <Check className="h-4 w-4 text-green-500" /> {feature}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button
                                className="w-full"
                                size="lg"
                                variant={pack.popular ? "default" : "outline"}
                                disabled={!!loading}
                                onClick={() => handlePurchase(pack)}
                            >
                                {loading === pack.id ? (
                                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...</>
                                ) : (
                                    <><CreditCard className="mr-2 h-4 w-4" /> Buy Now</>
                                )}
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}
