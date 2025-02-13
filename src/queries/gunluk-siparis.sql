SELECT
    SUBSTRING(cari_unvan1, 0, 30) AS [CARI],
    cari_per_adi AS [TEMSILCI],
    SUM(sip_miktar) AS [MIKTAR],
    ROUND(SUM(sip_tutar -
        (sip_iskonto_1+sip_iskonto_2+sip_iskonto_3+sip_iskonto_4+sip_iskonto_5+sip_iskonto_6) +
        (sip_masraf_1+sip_masraf_2+sip_masraf_3+sip_masraf_4)), 1) AS [TUTAR],
    COUNT(sip_satirno) AS [SATIR],
    odp_adi AS [VADE]
FROM dbo.SIPARISLER WITH (NOLOCK)
INNER JOIN dbo.CARI_HESAPLAR ON sip_musteri_kod = cari_kod
INNER JOIN dbo.CARI_PERSONEL_TANIMLARI ON cari_temsilci_kodu = cari_per_kod
INNER JOIN dbo.ODEME_PLANLARI ON sip_opno = odp_no
WHERE sip_tip = 0 AND CAST(sip_create_date AS DATE) = CAST(GETDATE() AS DATE)
GROUP BY sip_tarih, sip_tip, sip_cins, sip_evrakno_seri, sip_evrakno_sira, sip_fileid, cari_unvan1, cari_per_adi, odp_adi, sip_projekodu