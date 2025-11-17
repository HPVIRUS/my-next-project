'use server';

import { prisma } from '@/lib/prisma';
import { Product, ProductCategoey as ProductCategory } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const validationUpsertProduct = (data: {
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
}) => {
  const formSchema = z.object({
    name: z.string().min(1, { message: 'name is required' }),
    description: z.string(),
    price: z.number({ invalid_type_error: 'price is required' }).min(1, {
      message: 'price must be at least 1',
    }),
    quantity: z.number({ invalid_type_error: 'quantity is required' })
      .min(1, { message: 'quantity must be at least 1' })
      .max(1000, { message: 'quantity must be at most 1000' }),
    category: z.enum(Object.values(ProductCategory) as [ProductCategory, ...ProductCategory[]]),
  });

  const result = formSchema.safeParse(data);

  if (!result.success) {
    const errors: Record<string, string> = {};
    const fieldErrors = result.error.flatten().fieldErrors;
    for (const key in fieldErrors) {
      if (fieldErrors[key]?.length) {
        errors[key] = fieldErrors[key]![0];
      }
    }
    return errors;
  }

  return null;
};

export const upsertProduct = async (
  prevData: { data: Product | null; error: Record<string, string> | null },
  formData: FormData,
) => {
  const id = formData.get('id')?.toString() || null;

  const productData = {
    name: formData.get('name')?.toString() || '',
    category: formData.get('category')?.toString() || '',
    description: formData.get('description')?.toString() || '',
    price: parseInt(formData.get('price')?.toString() || '0', 10),
    quantity: parseInt(formData.get('quantity')?.toString() || '0', 10),
  };

  const error = validationUpsertProduct(productData);
  if (error) {
    return { data: prevData.data, error };
  }

  try {
    let result: Product;
    if (id) {
      result = await prisma.product.update({
        where: { id },
        data: productData,
      });
    } else {
      result = await prisma.product.create({
        data: productData,
      });
    }

    revalidatePath('/dashboard/products');

    return { data: result, error: null };
  } catch (e) {
    return { data: prevData.data, error: { general: 'upsert failed' } };
  }
};
