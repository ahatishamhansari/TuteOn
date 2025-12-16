import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Zap, CreditCard } from "lucide-react"

const plans = [
    {
        name: "Starter",
        coins: 100,
        price: "$9",
        featured: false,
        description: "Perfect for trying out the platform."
    },
    {
        name: "Pro",
        coins: 500,
        price: "$39",
        featured: true,
        description: "Best for active teachers."
    },
    {
        name: "Volume",
        coins: 1200,
        price: "$89",
        featured: false,
        description: "Maximum value for agencies."
    }
]

export default function CreditsPage() {
    return (
        <div className="container py-20">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold mb-4">Purchase Credits</h1>
                <p className="text-muted-foreground text-lg">Unlock student contacts securely. 1 Contact = 50 Coins.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {plans.map((plan) => (
                    <Card key={plan.name} className={`relative flex flex-col ${plan.featured ? 'border-blue-500 shadow-2xl scale-105' : 'border-muted'}`}>
                        {plan.featured && (
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                <Badge className="bg-blue-500 hover:bg-blue-600 px-4 py-1 text-sm">Most Popular</Badge>
                            </div>
                        )}
                        <CardHeader>
                            <CardTitle className="flex justify-between items-baseline">
                                <span>{plan.name}</span>
                                <span className="text-3xl font-bold">{plan.price}</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1 space-y-4">
                            <div className="flex items-center gap-2 mb-4">
                                <Zap className="h-5 w-5 text-yellow-500" />
                                <span className="font-bold text-xl">{plan.coins} Coins</span>
                            </div>
                            <p className="text-muted-foreground">{plan.description}</p>
                            <ul className="space-y-2 text-sm">
                                <li className="flex gap-2">
                                    <Check className="h-4 w-4 text-green-500" />
                                    {Math.floor(plan.coins / 50)} Contacts
                                </li>
                                <li className="flex gap-2">
                                    <Check className="h-4 w-4 text-green-500" />
                                    Secure Transactions
                                </li>
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button className={`w-full ${plan.featured ? 'bg-blue-600 hover:bg-blue-700' : ''}`} size="lg">
                                <CreditCard className="mr-2 h-4 w-4" /> Buy Now
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}
