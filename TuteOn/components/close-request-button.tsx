"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle2, Loader2 } from "lucide-react"
import { useState } from "react"
import { closeRequest } from "@/app/actions"
import { useRouter } from "next/navigation"

export function CloseRequestButton({ requestId }: { requestId: string }) {
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleClose = async () => {
        if (!confirm("Are you sure you hired a tutor? This will close the request.")) return

        setLoading(true)
        await closeRequest(requestId)
        setLoading(false)
        router.refresh()
    }

    return (
        <Button
            size="sm"
            variant="outline"
            className="text-green-600 border-green-200 hover:bg-green-50"
            onClick={handleClose}
            disabled={loading}
        >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="mr-2 h-4 w-4" />}
            Mark as Hired
        </Button>
    )
}
