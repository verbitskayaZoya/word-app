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


// export async function display() {
//     try {
// //       return await sql`SELECT * FROM Cards` 

//     } catch (error) {
//         return NextResponse.json({ error }, { status: 500 });
//       }
// }

