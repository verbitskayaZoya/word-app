import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 

// export async function GET(request) {
//   const { searchParams } = new URL(request.url);
//   const petName = searchParams.get('petName');
//   const ownerName = searchParams.get('ownerName');

 
//   try {
//     // await sql`CREATE TABLE Cards (Name varchar(255), Definition varchar(255) );`;
//     if (!petName || !ownerName) throw new Error('Pet and owner names required');
//     await sql`INSERT INTO Pets (Name, Owner) VALUES (${petName}, ${ownerName});`;
//   } catch (error) {
//     return NextResponse.json({ error }, { status: 500 });
//   }
 
  // const pets = await sql`SELECT * FROM Pets;`;
  // return NextResponse.json({ pets }, { status: 200 });
// }





// async function seedUsers() {
//   await client.sql`
//     CREATE TABLE IF NOT EXISTS pets (
//       name VARCHAR(255) NOT NULL
//       owner VARCHAR(255) NOT NULL
//     );
//   `;
// }

