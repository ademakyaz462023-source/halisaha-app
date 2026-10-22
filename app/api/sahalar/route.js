import { NextResponse } from 'next/server';
import db from '../../lib/db'; 

export async function GET() {
  try {
    const [sahalar] = await db.query('SELECT * FROM sahalar');
    return NextResponse.json(sahalar);
  } catch (error) {
    console.error("Veritabanı hatası:", error);
    return NextResponse.json(
      { error: 'Sahalar getirilirken bir hata oluştu.' }, 
      { status: 500 }
    );
  }
}