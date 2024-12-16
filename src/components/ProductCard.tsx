'use client'

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Product } from "@/types/woocommerce"
import { useState } from "react"
import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'

interface ProductCardProps {
    product: Product
}

function truncateHTML(html: string, maxLength: number = 250): { text: string; isTruncated: boolean } {
    const tmp = document.createElement('div')
    tmp.innerHTML = html
    const text = tmp.textContent || tmp.innerText || ''

    const isTruncated = text.length > maxLength
    return {
        text: isTruncated ? text.slice(0, maxLength).trim() + '...' : text,
        isTruncated
    }
}

function formatPrice(price: string | number): string {
    return Number(price).toLocaleString('es-CL')
}

export function ProductCard({ product }: ProductCardProps) {
    const [isExpanded, setIsExpanded] = useState(false)
    const { text, isTruncated } = truncateHTML(product.short_description)
    const description = isExpanded ?
        (product.short_description ? document.createElement('div').textContent = product.short_description : '') :
        text

    return (
        <div className="group relative overflow-hidden rounded-lg border bg-background p-2 flex flex-col h-full">
            <div className="aspect-[4/3] overflow-hidden rounded-md relative h-[240px]">
                <Image
                    src={product.images[0]?.src || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>
            <div className="p-4 flex flex-col flex-1">
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <div className="text-sm text-muted-foreground mt-2">
                    <div
                        className="text-sm text-muted-foreground"
                        dangerouslySetInnerHTML={{ __html: description }}
                    />
                    {isTruncated && (
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="text-blue-500 hover:text-blue-600 mt-1 text-sm font-medium"
                        >
                            {isExpanded ? 'Ver menos' : 'Ver más'}
                        </button>
                    )}
                </div>
                <div className="mt-auto pt-4 flex items-center justify-between">
                    <div className="flex items-baseline gap-1">
                        <span className="text-xl font-bold">${formatPrice(product.price)}</span>
                        <span className="text-sm text-muted-foreground">/Persona</span>
                    </div>
                    <div className="flex gap-2">
                        <Link href={`/tours/${product.slug}`}>
                            <Button
                                variant="secondary"
                                size="sm"
                            >
                                Ver Detalles
                            </Button>
                        </Link>
                        <Link href={`/checkout/${product.id}`}>
                            <Button
                                size="sm"
                                className="bg-hotumatur-primary text-white hover:bg-hotumatur-primary/90"
                            >
                                <ShoppingCart className="w-4 h-4 mr-1" />
                                Reservar
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
