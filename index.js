const fs = require('fs');
const PDFDocument = require('pdfkit');
const doc = new PDFDocument({ margin: 0, size: [620, 900] });

doc.pipe(fs.createWriteStream('PT00000000.pdf'));

doc.font('arial.ttf');

doc.fillColor('#696a6e').fontSize(12).text('Azərbaycan Respublikası /The Republic of Azerbaijan', 150, 35);

col('left', 1, 'DIPLOM /DIPLOMA', 'sənəd /document');
col('right', 1, 'PT00000000', 'SN /IN');

col('left', 2, 'BAKALAVR /BACHELOR', 'ixtisas dərəcəsi /degree');
col('right', 2, 'ALİ /HIGHER', 'təhsil pilləsi /education stage');

col('left', 3, 'ADİ /ORDINARY', 'sənədin növü /document type');
col('right', 3, '12.56', 'ÜOMG /GPA', '#99813e');

line(4);

col('left', 5, 'ŞƏXSİYYƏT VƏSİQƏSİ / ID CARD', 'şəxsi identifikasiya sənədi /ID type');
col('right', 5, '2FFBE6', 'FIN /PIN');

col('left', 6, 'SIRABJƏDDİN /SIRABJADDEEN', 'ad /name');

col('left', 7, 'BƏRBUNDANBƏYOVSKİY /BARBUNDANBEYOVSKIY', 'soyad /surname');

col('left', 8, '2001.07.13', 'doğum tarixi /date of birth');

col('left', 9, '2019', 'bitirmə ili /graduation');

line(10);

col2('left', 1, `İ.M.SEÇENOV ADINA BİRİNCİ MOSKVA DÖVLƏT TİBB UNİVERSİTETİNİN BAKİ FİLİALI
/FIRST MOSCOW STATE MEDICAL UNIVERSITY BAKU BRANCH`, 'ali təhsil müəssisəsi /higher education institution');
col2('right', 1, 'XAÇMAZ /KHACHMAZ ', 'şəhər /city');

col2('left', 2, `BEYNƏLXALQ MÜNASİBƏTLƏR VƏ İQTİSADİYYAT
/INTERNATIONAL RELATIONS AND ECONOMICS`, 'fakültə /faculty');
col2('right', 2, 'AZ /AZE', 'tədris dili /instruction language');

col2('left', 3, `GƏMİ ENERGETİK QURĞULARININ İSTİSMAR MÜHƏNDİSLİYİ
/OPERATION ENGINEERING FOR SHIP ENERGY FACILITIES`, 'ixtisas /specialty', '#99813e');
col2('right', 3, '240', 'AKTS /ECTS');

line(15.4);

subtitle(16, 'növbəti təhsil barədə /next education');

title('left', 17, `BU DİPLOM SAHİBİNƏ MAGİSTRATURAYA QƏBUL OLUNMAQ HÜQUQU VERİR /THIS DIPLOMA OWNER HAS THE RIGHT TO BE ADMITTED TO
THE MASTER LEVEL`);

doc.image('logo.png', 40, 85, { width: 87 });
doc.image('thumb.png', 40, 220, { width: 87 });
doc.image('barcode.png', 40, 790, { width: 100 });

line(23.3);

subtitle2(24, `DİQQƏT! |||Cari attestatın çap forması məlumat məqsədlidir və yalnız orijinal attestatın sürəti kimi istifadə oluna bilər. Orijinal attestatın yoxlanılması mobil cıhazlarda QR kodu oxuyan proqram təminatı və ya |||www.diplom.edu.az||| səhifəsinə daxil olaraq yuxarida qeyd olunan seriya nömrəsi vasitələriylə mümkündür.`, 4, 110);

subtitle2(26, `WARNING! |||Printed version of the certificate is considered as a copy of original and designed for information purposes only. The original certificate can be checked by mobile application using any visiting |||www.diplom.edu.az||| using serial number mentioned above.`, 4, 110);

doc.end();

function col(place = 'left', colIndex = 1, title, subTitle, tcolor = '#696a6e', stcolor = '#bababa'){
   const plus = 31*colIndex;
   if(place == 'left'){
      doc.fillColor(tcolor).fontSize(8).text(title, 150, 40+plus);
      doc.fillColor(stcolor).fontSize(8).text(subTitle, 150, 52+plus);
   } else if(place == 'right'){
      doc.fillColor(tcolor).fontSize(8).text(title, 450, 40+plus);
      doc.fillColor(stcolor).fontSize(8).text(subTitle, 450, 52+plus);
   }
}

function col2(place = 'left', colIndex = 1, title, subTitle, tcolor = '#696a6e', stcolor = '#bababa'){
   const plus = 50*colIndex;
   if(place == 'left'){
      doc.fillColor(tcolor).fontSize(8).text(title, 40, 327+plus, { lineGap: 1 });
      doc.fillColor(stcolor).fontSize(8).text(subTitle, 40, 349+plus);
   } else if(place == 'right'){
      doc.fillColor(tcolor).fontSize(8).text(title, 450, 327+plus);
      doc.fillColor(stcolor).fontSize(8).text(subTitle, 450, 340+plus);
   }
}

function subtitle(colIndex = 1, subTitle, stcolor = '#bababa', t = 0, l = 0){
   const plus = 30*colIndex;
   doc.fillColor(stcolor).fontSize(8).text(subTitle, 40+l, 65+plus+t);
}

function subtitle2(colIndex = 1, subTitle, t = 0, l = 0){
   const plus = 30*colIndex;
   const tt = subTitle.split('|||');
   doc.fontSize(8).fillColor('#696a6e')
      .text(tt[0], 50+l, 65+plus+t, {
       underline: false,
       link: 0,
       continued: true,
       width: 400
      }).fillColor('#bbbbbb')
      .text(tt[1]).fillColor('blue')
      .text(tt[2], {
       underline: true,
       link: 'www.diplom.edu.az',
       continued: true }).fillColor('#bbbbbb')
      .text(tt[3], {
       underline: false,
       link: 0,
       continued: false
      });
}

function title(place = 'left', colIndex = 1, title, tcolor = '#696a6e'){
   const plus = 30*colIndex;
   if(place == 'left'){
      doc.fillColor(tcolor).fontSize(8).text(title, 40, 60+plus, { lineGap: 1 });
   } else if(place == 'right'){
      doc.fillColor(tcolor).fontSize(8).text(title, 450, 60+plus, { lineGap: 1 });
   }
}

function line(colIndex, lcolor = '#E3E0E0'){
   const plus = 31*colIndex;
   doc.moveTo(40, 50+plus).lineTo(575, 50+plus).fill(lcolor).stroke();
}