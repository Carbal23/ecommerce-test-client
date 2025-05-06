
import React from 'react'
import { API_HOST } from '@/app/config-global';
import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/context/product/types';


function Card(product: Product) {
  return (
    <Link
      href={`/productDetail/${product._id}`}
      className="border rounded-lg p-4 bg-white shadow hover:shadow-md transition block"
    >
      <div className="w-full h-40 relative mb-3">
        {product.images?.[0]?.url && (
          <Image
            src={`${API_HOST}${product.images[0].url}`}
            alt={product.images[0].alt || product.title}
            fill
            className="object-contain"
          />
        )}
      </div>
      <h3 className="text-lg font-bold text-gray-800">{product.title}</h3>
      <p className="text-sm text-gray-600 mb-2 line-clamp-3">
        {product.description}
      </p>
      <p className="text-red-500 font-bold mb-1">${product.price.toLocaleString()}</p>
      <p className="text-sm text-gray-500">
        Puntuación: ⭐ {product.rating.average.toFixed(1)} (
        {product.rating.count} votos)
      </p>
    </Link>
  )
}

export default Card
