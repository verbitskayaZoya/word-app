'use server'
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function create(wordValue, definitionValue ) {
    try {
              // if (!petName || !ownerName) throw new Error('Pet and owner names required');
              await sql`INSERT INTO Cards (Name, Definition) VALUES (${wordValue}, ${definitionValue});`
            } catch (error) {
              return NextResponse.json({ error }, { status: 500 });
            }
}

export async function select() {
    try {
            const res = await sql`select * from cards`
            const rows = await res.rows
            return rows
        } catch (error) {
            console.log("eror")
            return NextResponse.json({ error }, { status: 500 });
        }
}



