import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const petName = searchParams.get('petName');
  const ownerName = searchParams.get('ownerName');

 
  try {
    if (!petName || !ownerName) throw new Error('Pet and owner names required');
    await sql`INSERT INTO Pets (Name, Owner) VALUES (${petName}, ${ownerName});`;
    console.log(1)
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
 
  const pets = await sql`SELECT * FROM Pets;`;
  return NextResponse.json({ pets }, { status: 200 });
}
// // export default async function handler(request, response) {
// //     const client = await db.connect();

// //     try {
// //         await client.sql`CREATE TABLE Cards (Name varchar(255), Definition varchar(255) );`;
// //     } catch (error) {
// //         return response.status(500).json( {error} );
// //     }
// // }

// export default async function handler(request, response) {
//   try {
//     const petName = request.query.petName;
//     const ownerName = request.query.ownerName;
//     if (!petName || !ownerName) throw new Error('Pet and owner names required');
//     await sql`INSERT INTO Pets (Name, Owner) VALUES (${petName}, ${ownerName});`;
//   } catch (error) {
//     return response.status(500).json({ error });
//   }
 
//   const pets = await sql`SELECT * FROM Pets;`;
//   console.log(response.status(200).json({ pets }) );
// }

// const client = await db.connect();

// async function seedUsers() {
//   await client.sql`
//     CREATE TABLE IF NOT EXISTS pets (
//       name VARCHAR(255) NOT NULL
//       owner VARCHAR(255) NOT NULL
//     );
//   `;
// }

// export default async function GET() {
//     try {
//       await client.sql`BEGIN`;
//       await seedUsers();
//       await client.sql`COMMIT`;
//       console.log("success")
//       return Response.json({ message: 'Database seeded successfully' });
//     } catch (error) {
//       await client.sql`ROLLBACK`;
//       console.log("fail")
//       return Response.json({ error }, { status: 500 });
//     }
//   }