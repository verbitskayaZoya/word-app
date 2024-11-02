'use server'
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function create(value) {
    console.log(value)
    try {
              // if (!petName || !ownerName) throw new Error('Pet and owner names required');
              await sql`INSERT INTO Cards (Name, Definition) VALUES (${value}, ${value});`;
            } catch (error) {
              console.log(error)
              return NextResponse.json({ error }, { status: 500 });
            }
}