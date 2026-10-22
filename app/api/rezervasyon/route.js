import { NextResponse } from 'next/server';
import db from '../../lib/db';

export async function POST(request) {
  try {
    const body = await request.json();
    const { saha_id, musteri_ad, musteri_telefon, tarih, baslangic_saati, krampon_istiyor_mu, hakem_istiyor_mu, toplam_tutar } = body;

    // 1. ÇAKIŞMA KONTROLÜ: O saha, o tarihte, o saatte dolu mu?
    const [mevcut] = await db.query(
      'SELECT id FROM rezervasyonlar WHERE saha_id = ? AND tarih = ? AND baslangic_saati = ?',
      [saha_id, tarih, baslangic_saati]
    );

    if (mevcut.length > 0) {
      return NextResponse.json({ error: 'Üzgünüz, bu saha belirtilen saatte zaten dolu!' }, { status: 400 });
    }

    // 2. VERİTABANINA KAYIT: Boşsa yeni rezervasyonu ekle
    await db.query(
      `INSERT INTO rezervasyonlar 
      (saha_id, musteri_ad, musteri_telefon, tarih, baslangic_saati, krampon_istiyor_mu, hakem_istiyor_mu, toplam_tutar) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [saha_id, musteri_ad, musteri_telefon, tarih, baslangic_saati, krampon_istiyor_mu, hakem_istiyor_mu, toplam_tutar]
    );

    return NextResponse.json({ message: 'Rezervasyon başarıyla oluşturuldu!' }, { status: 201 });
  } catch (error) {
    console.error("Rezervasyon hatası:", error);
    return NextResponse.json({ error: 'Kayıt sırasında bir hata oluştu.' }, { status: 500 });
  }
}