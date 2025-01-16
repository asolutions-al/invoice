"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Minus, Plus, X } from "lucide-react"
import Image from "next/image"

interface ProductCardProps {
  id: string
  name: string
  description: string
  price: number
  image: string
  quantity: number
  onQuantityChange: (id: string, newQuantity: number) => void
  onRemove: (id: string) => void
}

export function CheckoutProductCard({
  id,
  name,
  description,
  price,
  quantity,
  onQuantityChange,
  onRemove,
}: ProductCardProps) {
  const handleQuantityChange = (change: number) => {
    const newQuantity = Math.max(1, quantity + change)
    onQuantityChange(id, newQuantity)
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row">
          <div className="relative h-48 w-full sm:h-auto sm:w-48 flex-shrink-0">
            <Image
              src={"/placeholder.svg"}
              alt={name}
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none"
            />
          </div>
          <div className="flex-grow p-4 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold">{name}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {description}
              </p>
              <p className="text-lg font-bold mt-2">${price.toFixed(2)}</p>
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(-1)}
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  type="number"
                  value={quantity}
                  onChange={(e) =>
                    onQuantityChange(id, parseInt(e.target.value, 10) || 1)
                  }
                  className="w-16 text-center"
                  min="1"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(1)}
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemove(id)}
                className="text-destructive"
                aria-label="Remove item"
              >
                <X className="h-4 w-4 mr-2" />
                Remove
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
